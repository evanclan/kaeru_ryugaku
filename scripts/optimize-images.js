#!/usr/bin/env node
/**
 * Image Optimization Script
 * 
 * This script batch compresses images to save space and improve performance.
 * It creates backups before modifying any files.
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const { glob } = require('glob');
const path = require('path');
const fs = require('fs');

// ============================================
// CONFIGURATION - Modify these as needed
// ============================================

// Target directory to scan for images (relative to project root)
const TARGET_DIR = './public';

// Maximum width for resizing (images wider than this will be resized)
const MAX_WIDTH = 1920;

// Compression quality (1-100)
const QUALITY = 80;

// Backup folder name (will be created at same level as TARGET_DIR)
const BACKUP_FOLDER_NAME = 'public_backup';

// Supported image extensions
const SUPPORTED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp'];

// ============================================
// SCRIPT LOGIC
// ============================================

async function main() {
    console.log('\n🖼️  Image Optimization Script');
    console.log('═'.repeat(50));

    const projectRoot = process.cwd();
    const targetPath = path.resolve(projectRoot, TARGET_DIR);
    const backupPath = path.resolve(projectRoot, BACKUP_FOLDER_NAME);

    console.log(`📁 Target directory: ${targetPath}`);
    console.log(`💾 Backup directory: ${backupPath}`);
    console.log(`📐 Max width: ${MAX_WIDTH}px`);
    console.log(`🎨 Quality: ${QUALITY}%`);
    console.log('═'.repeat(50));

    // Check if target directory exists
    if (!fs.existsSync(targetPath)) {
        console.error(`❌ Error: Target directory does not exist: ${targetPath}`);
        process.exit(1);
    }

    // Find all image files
    const pattern = `${targetPath}/**/*.{${SUPPORTED_EXTENSIONS.join(',')}}`;
    const imageFiles = await glob(pattern, { nocase: true });

    if (imageFiles.length === 0) {
        console.log('ℹ️  No images found to optimize.');
        process.exit(0);
    }

    console.log(`\n🔍 Found ${imageFiles.length} images to process\n`);

    // Create backup directory
    if (!fs.existsSync(backupPath)) {
        fs.mkdirSync(backupPath, { recursive: true });
        console.log(`✅ Created backup directory: ${backupPath}\n`);
    }

    // Stats tracking
    let totalOriginalSize = 0;
    let totalNewSize = 0;
    let processedCount = 0;
    let skippedCount = 0;
    let errorCount = 0;

    // Process each image
    for (const imagePath of imageFiles) {
        try {
            // Get relative path from target directory for backup structure
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
            totalOriginalSize += originalSize;

            // Create backup (copy original file)
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

            // Write optimized image back to original path
            fs.writeFileSync(imagePath, outputBuffer);

            // Get new file size
            const newStats = fs.statSync(imagePath);
            const newSize = newStats.size;
            totalNewSize += newSize;

            // Calculate savings
            const savedBytes = originalSize - newSize;
            const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

            // Determine if image was actually optimized or was already small
            const wasResized = metadata.width && metadata.width > MAX_WIDTH;
            const resizeInfo = wasResized ? ` (resized from ${metadata.width}px)` : '';

            // Log result with color coding
            const savingsColor = savedBytes > 0 ? '\x1b[32m' : '\x1b[33m'; // Green or Yellow
            const resetColor = '\x1b[0m';

            console.log(
                `✅ ${path.basename(imagePath)}${resizeInfo}\n` +
                `   📦 Original: ${formatBytes(originalSize)} → ` +
                `${savingsColor}New: ${formatBytes(newSize)} (${savedPercent}% saved)${resetColor}`
            );

            processedCount++;

        } catch (error) {
            console.error(`❌ Error processing ${path.basename(imagePath)}: ${error.message}`);
            errorCount++;
        }
    }

    // Summary
    console.log('\n' + '═'.repeat(50));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('═'.repeat(50));
    console.log(`✅ Processed: ${processedCount} images`);
    if (skippedCount > 0) console.log(`⏭️  Skipped: ${skippedCount} images`);
    if (errorCount > 0) console.log(`❌ Errors: ${errorCount} images`);
    console.log(`\n📦 Total original size: ${formatBytes(totalOriginalSize)}`);
    console.log(`💾 Total new size: ${formatBytes(totalNewSize)}`);

    const totalSaved = totalOriginalSize - totalNewSize;
    const totalSavedPercent = totalOriginalSize > 0
        ? ((totalSaved / totalOriginalSize) * 100).toFixed(1)
        : 0;

    console.log(`\n🎉 Total saved: ${formatBytes(totalSaved)} (${totalSavedPercent}%)`);
    console.log(`\n💡 Backups stored in: ${backupPath}`);
    console.log('═'.repeat(50) + '\n');
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

// Run the script
main().catch(error => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
});
