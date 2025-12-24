#!/usr/bin/env node
/**
 * Image Optimization Watch Script
 * 
 * This script watches for new images and automatically optimizes them.
 * Run alongside your dev server for automatic optimization.
 * 
 * Usage: npm run optimize:watch
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// ============================================
// CONFIGURATION - Modify these as needed
// ============================================

const TARGET_DIR = './public';
const MAX_WIDTH = 1920;
const QUALITY = 80;
const BACKUP_FOLDER_NAME = 'public_backup';
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Debounce delay (ms) - wait before processing to ensure file is fully written
const DEBOUNCE_DELAY = 500;

// ============================================
// SCRIPT LOGIC
// ============================================

const projectRoot = process.cwd();
const targetPath = path.resolve(projectRoot, TARGET_DIR);
const backupPath = path.resolve(projectRoot, BACKUP_FOLDER_NAME);

// Track files being processed to avoid duplicates
const processingQueue = new Map();

console.log('\n🖼️  Image Optimization Watch Mode');
console.log('═'.repeat(50));
console.log(`👁️  Watching: ${targetPath}`);
console.log(`📐 Max width: ${MAX_WIDTH}px`);
console.log(`🎨 Quality: ${QUALITY}%`);
console.log('═'.repeat(50));
console.log('\n⏳ Waiting for new images...\n');

// Ensure backup directory exists
if (!fs.existsSync(backupPath)) {
    fs.mkdirSync(backupPath, { recursive: true });
}

/**
 * Check if file is a supported image
 */
function isSupportedImage(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
}

/**
 * Format bytes to human-readable string
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Optimize a single image
 */
async function optimizeImage(imagePath) {
    try {
        // Wait for file to be fully written
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check if file still exists
        if (!fs.existsSync(imagePath)) return;

        const relativePath = path.relative(targetPath, imagePath);
        const backupFilePath = path.join(backupPath, relativePath);

        // Create backup subdirectory if needed
        const backupFileDir = path.dirname(backupFilePath);
        if (!fs.existsSync(backupFileDir)) {
            fs.mkdirSync(backupFileDir, { recursive: true });
        }

        // Get original file size
        const originalStats = fs.statSync(imagePath);
        const originalSize = originalStats.size;

        // Skip if file is too small (likely already optimized or is a tiny icon)
        if (originalSize < 1024) {
            console.log(`⏭️  Skipped (too small): ${path.basename(imagePath)}`);
            return;
        }

        // Create backup
        fs.copyFileSync(imagePath, backupFilePath);

        // Get image metadata
        const metadata = await sharp(imagePath).metadata();
        const extension = path.extname(imagePath).toLowerCase().slice(1);

        // Prepare sharp instance
        let sharpInstance = sharp(imagePath);

        // Resize if wider than MAX_WIDTH
        if (metadata.width && metadata.width > MAX_WIDTH) {
            sharpInstance = sharpInstance.resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
            });
        }

        // Apply compression based on format
        let outputBuffer;
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                outputBuffer = await sharpInstance
                    .jpeg({ quality: QUALITY, mozjpeg: true })
                    .toBuffer();
                break;
            case 'png':
                outputBuffer = await sharpInstance
                    .png({ quality: QUALITY, compressionLevel: 9 })
                    .toBuffer();
                break;
            case 'webp':
                outputBuffer = await sharpInstance
                    .webp({ quality: QUALITY })
                    .toBuffer();
                break;
            default:
                outputBuffer = await sharpInstance.toBuffer();
        }

        // Write optimized image
        fs.writeFileSync(imagePath, outputBuffer);

        // Get new file size
        const newStats = fs.statSync(imagePath);
        const newSize = newStats.size;

        const savedBytes = originalSize - newSize;
        const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

        const wasResized = metadata.width && metadata.width > MAX_WIDTH;
        const resizeInfo = wasResized ? ` (resized from ${metadata.width}px)` : '';

        console.log(
            `✅ ${path.basename(imagePath)}${resizeInfo}\n` +
            `   📦 ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${savedPercent}% saved)`
        );

    } catch (error) {
        console.error(`❌ Error: ${path.basename(imagePath)} - ${error.message}`);
    }
}

/**
 * Debounced file handler
 */
function handleFileChange(filePath) {
    if (!isSupportedImage(filePath)) return;

    // Clear existing timeout for this file
    if (processingQueue.has(filePath)) {
        clearTimeout(processingQueue.get(filePath));
    }

    // Set new timeout
    const timeout = setTimeout(() => {
        processingQueue.delete(filePath);
        optimizeImage(filePath);
    }, DEBOUNCE_DELAY);

    processingQueue.set(filePath, timeout);
}

/**
 * Watch directory recursively using fs.watch
 */
function watchDirectory(dir) {
    // Watch the directory itself
    fs.watch(dir, { recursive: true }, (eventType, filename) => {
        if (!filename) return;

        const fullPath = path.join(dir, filename);

        // Check if it's a file (not directory) and is a supported image
        try {
            const stats = fs.statSync(fullPath);
            if (stats.isFile() && isSupportedImage(fullPath)) {
                handleFileChange(fullPath);
            }
        } catch (e) {
            // File might have been deleted, ignore
        }
    });
}

// Start watching
watchDirectory(targetPath);

// Keep process running
process.on('SIGINT', () => {
    console.log('\n\n👋 Watch mode stopped.');
    process.exit(0);
});
