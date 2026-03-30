const { createClient } = require('next-sanity');

// Config - matching src/sanity/client.ts or similar
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'pyh5h812'; // Fallback or read from env
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-12-16';
const token = process.env.SANITY_API_TOKEN; // Needed for write access

// We might not have the token in env? 
// Actually, `migrate-reviews.js` didn't use the client, it just generated ndjson.
// The user ran `npx sanity dataset import` which uses the CLI's logged-in session.
// So I should use the CLI to run this script or rely on `npx sanity exec`.
// `npx sanity exec` runs a script with the client pre-configured! Perfect.

// cleanup-reviews.js
module.exports = async function (context) {
    const { client } = context;
    console.log('Fetching studentVoice documents...');
    const query = '*[_type == "studentVoice"]._id';
    const ids = await client.fetch(query);

    console.log(`Found ${ids.length} documents to delete.`);

    if (ids.length === 0) {
        console.log('No documents found.');
        return;
    }

    // Delete in batches
    const transaction = client.transaction();
    ids.forEach(id => {
        transaction.delete(id);
    });

    console.log('Committing delete transaction...');
    await transaction.commit();
    console.log('Done! All studentVoice documents deleted.');
}
