const { createClient } = require('next-sanity')

const client = createClient({
    projectId: "44445555", // I need to check the actual project ID
    dataset: "production",
    apiVersion: "2024-01-01",
    useCdn: false,
})
// Wait, I need to get the config from environment variables or the client file.
// I'll read src/sanity/client.ts first to see how it's configured.
