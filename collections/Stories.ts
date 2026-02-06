import type { CollectionConfig } from 'payload';

export const Stories: CollectionConfig = {
    slug: 'stories',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'excerpt',
            type: 'textarea',
        },
        {
            name: 'category',
            type: 'text',
        },
        {
            name: 'image',
            type: 'text',
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'status',
            type: 'select',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            defaultValue: 'draft',
        },
    ],
};
