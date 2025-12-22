import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './src/sanity/env'

const projectIdVal = projectId || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const datasetVal = dataset || process.env.NEXT_PUBLIC_SANITY_DATASET

export default defineCliConfig({
    api: {
        projectId: projectIdVal,
        dataset: datasetVal
    }
})
