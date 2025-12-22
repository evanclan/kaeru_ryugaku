import { type SchemaTypeDefinition } from 'sanity'
import { blockContent } from './blockContent'
import { categoryType } from './categoryType'
import { postType } from './postType'
import { authorType } from './authorType'
import { pageType } from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContent, categoryType, postType, authorType, pageType],
}
