import { defineField, defineType } from 'sanity'

export const studentVoice = defineType({
    name: 'studentVoice',
    title: 'Student Voice',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'studentName',
            title: 'Display name',
            type: 'string',
        }),
        defineField({
            name: 'familyName',
            title: 'Family name', // 姓（非表示）
            type: 'string',
        }),
        defineField({
            name: 'firstName',
            title: 'Name', // 名（非表示）
            type: 'string',
        }),
        defineField({
            name: 'programType',
            title: 'Program Type',
            type: 'string',
            description: 'Type of the program',
            options: {
                list: [
                    { title: '語学留学', value: '語学留学' },
                    { title: 'ワーキングホリデー', value: 'ワーキングホリデー' },
                    { title: 'フィリピン留学', value: 'フィリピン留学' },
                    { title: 'サマーキャンプ', value: 'サマーキャンプ' },
                    { title: '高校留学', value: '高校留学' },
                ],
                layout: 'dropdown'
            }
        }),
        defineField({
            name: 'school',
            title: 'School',
            type: 'string',
            description: 'Name of the school',
        }),
        defineField({
            name: 'studentStatus',
            title: 'Student Status',
            type: 'string',
            description: 'Status of the student',
            options: {
                list: [
                    { title: '社会人', value: '社会人' },
                    { title: '高校生', value: '高校生' },
                    { title: '小・中学生', value: '小・中学生' },
                    { title: '短大・専門・大学', value: '短大・専門・大学' },
                ],
                layout: 'dropdown'
            }
        }),
        defineField({
            name: 'reviewStatus',
            title: 'Review Status',
            type: 'string',
            description: 'Departure status of the student',
            options: {
                list: [
                    { title: '出発前', value: '出発前' },
                    { title: '留学中', value: '留学中' },
                    { title: '帰国後', value: '帰国後' },
                ],
                layout: 'dropdown'
            }
        }),
        defineField({
            name: 'destination',
            title: 'Destination',
            type: 'object',
            fields: [
                defineField({ name: 'country', type: 'string', title: 'Country' }),
                defineField({ name: 'city', type: 'string', title: 'City' }),
            ],
        }),
        defineField({
            name: 'studyPeriod',
            title: 'Study Period',
            type: 'object',
            fields: [
                defineField({ name: 'departureDate', type: 'date', title: 'Departure Date' }),
                defineField({ name: 'returnDate', type: 'date', title: 'Return Date' }),
            ],
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'agencyComment',
            title: 'Agency Comment',
            type: 'text',
            description: 'Staff feedback/comment',
        }),
        defineField({
            name: 'motivation',
            title: 'Motivation',
            type: 'text',
            description: 'Why did you decide to study abroad?',
        }),
        defineField({
            name: 'expectations',
            title: 'Expectations',
            type: 'text',
            description: 'What are you looking forward to?',
        }),
        defineField({
            name: 'goals',
            title: 'Goals',
            type: 'text',
            description: 'Do you have any dreams or goals?',
        }),
        defineField({
            name: 'messageToStaff',
            title: 'Message to Staff',
            type: 'text',
        }),
        defineField({
            name: 'mustBringItems',
            title: 'Must Bring Items',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'gallery',
            title: 'Gallery',
            description: 'Photo gallery of experiences',
            type: 'array',
            of: [
                {
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        {
                            name: 'description',
                            type: 'string',
                            title: 'Description',
                        },
                    ],
                },
            ],
            options: {
                layout: 'grid',
            },
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'studentName',
            media: 'mainImage',
        },
    },
})
