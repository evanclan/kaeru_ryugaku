const xlsx = require('xlsx');
const workbook = xlsx.readFile('data.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
// Get raw data arrays effectively by disabling header parsing initially
const data = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
console.log('First 5 rows:');
data.slice(0, 5).forEach((row, i) => {
    console.log(`Row ${i}:`, row);
});
