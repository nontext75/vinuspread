import type { CollectionConfig } from 'payload';

export const Projects: CollectionConfig = {
    slug: 'projects',
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
            name: 'category',
            type: 'text',
        },
        {
            name: 'year',
            type: 'text',
        },
        {
            name: 'description',
            type: 'textarea',
        },
        {
            name: 'image',
            type: 'text',
            admin: {
                description: 'Legacy image URL from vinus.co.kr or relative path',
            },
        },
        {
            name: 'content',
            type: 'richText',
        },
        {
            name: 'sort_order',
            type: 'number',
        },
        {
            name: 'reference_version',
            type: 'select',
            options: [
                { label: 'v1: Ideal Structure', value: 'v1' },
                { label: 'v2: Modular Narrative', value: 'v2' },
                { label: 'v3: Dark Immersive', value: 'v3' },
                { label: 'v4: Grid Narrative', value: 'v4' },
                { label: 'v5: High-End Essence', value: 'v5' },
            ],
            defaultValue: 'v5',
        }
    ],
};
