const fs = require('fs');
const xlsx = require('xlsx');

// Configuration
const INPUT_FILE = 'data.xlsx';
const OUTPUT_FILE = 'reviews.ndjson';

// Helper to parse dates (YYYY.MM -> YYYY-MM-01)
const parseDate = (dateStr) => {
    if (!dateStr) return null;
    // Handle various formats if needed, but assuming YYYY.MM based on prompt
    const match = dateStr.toString().match(/(\d{4})\.(\d{1,2})/);
    if (match) {
        const year = match[1];
        const month = match[2].padStart(2, '0');
        return `${year}-${month}-01`;
    }
    return null; // or original string if not matching
};

// Helper to parse comma/newline separated lists or numbered lists
const parseList = (str) => {
    if (!str) return [];
    // Regex to split by "1.", "2.", etc. or newlines
    // The prompt says "1. Item A, 2. Item B".
    // Let's try splitting by number counters first.
    const items = str.split(/\d+\.\s+/).filter(item => item.trim().length > 0);
    if (items.length > 0) {
        // Clean up punctuation like commas at end if present
        return items.map(i => i.replace(/[,，、]+$/, '').trim());
    }
    // Fallback to simple split if no numbers
    return str.split(/[,、\n]+/).map(s => s.trim()).filter(Boolean);
};

// Helper to generate slug
const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars (NOTE: this removes Japanese chars!)
    // If titles are in Japanese, simple slugify removes everything. 
    // Better to use a timestamp or loose slug for now if English isn't guaranteed.
    // Let's just use a random ID appended to a basic "review" prefix if title is non-ascii,
    // OR just kep it simple.
    // Actuallly, for Japanese sites, it's often better to just use a UUID or simple "review-{index}" if English title isn't available.
    // Let's try to keep alphanumeric if possible, or just use a counter/ID.
    return `review-${Math.random().toString(36).substring(2, 9)}`;
};

async function migrate() {
    if (!fs.existsSync(INPUT_FILE)) {
        console.error(`Error: ${INPUT_FILE} not found.`);
        process.exit(1);
    }

    const workbook = xlsx.readFile(INPUT_FILE);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Read from 3rd row (index 2) as header
    const data = xlsx.utils.sheet_to_json(worksheet, { range: 2 });

    console.log(`Found ${data.length} records.`);

    const ndjsonLines = data.map((row, index) => {
        // Columns mapping from verified headers
        const title = row['タイトル（12～15文字）'];
        if (!title) return null; // Skip empty rows

        const doc = {
            _id: `imported-review-${index}`, // Deterministic ID
            _type: 'studentVoice',
            title: title,
            slug: { _type: 'slug', current: generateSlug(title + index) }, // Unique slug
            studentName: row['名前（表示名）'],
            familyName: row['姓（非表示）'],
            firstName: row['名（非表示）'],
            programType: row['ステータス①'],
            studentStatus: row['ステータス②'],
            destination: {
                country: row['行き先（国）'],
                city: row['行き先（都市）'],
            },
            studyPeriod: {
                departureDate: parseDate(row['出発日']),
                returnDate: parseDate(row['帰国日']),
            },
            agencyComment: row['かえる留学からのコメント'],
            motivation: row['なぜ留学をしようと思ったの？'],
            expectations: row['留学で楽しみにしていることは？'],
            goals: row['夢や目標などありますか？'],
            messageToStaff: row['担当者へメッセージ'],
            mustBringItems: parseList(row['これだけは持って行くもの（3つ）']),
            tags: [],
            // mainImage would need an upload, skipping for CSV migration
        };

        return JSON.stringify(doc);
    }).filter(Boolean); // Filter out nulls

    fs.writeFileSync(OUTPUT_FILE, ndjsonLines.join('\n'));
    console.log(`Successfully wrote ${ndjsonLines.length} documents to ${OUTPUT_FILE}`);
}

migrate();
