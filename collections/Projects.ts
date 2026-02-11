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
            name: 'client',
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
            type: 'upload',
            relationTo: 'media',
            required: false,
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
            name: 'motion_type',
            type: 'select',
            defaultValue: 'slide-up',
            options: [
                { label: 'Fade In', value: 'fade' },
                { label: 'Slide Up', value: 'slide-up' },
                { label: 'Edge Reveal', value: 'reveal' },
                { label: 'Zoom In', value: 'zoom' },
                { label: 'None', value: 'none' },
            ],
            admin: {
                description: '요소들이 등장할 때의 애니메이션 스타일을 선택하세요.',
            }
        },
        {
            name: 'reference_version',
            type: 'select',
            options: [
                { label: 'Final v1: Editorial Narrative', value: 'final-1' },
                { label: 'Final v2: Technical Essence', value: 'final-2' },
                { label: 'Legacy v1: Cinematic Narrative', value: 'v1' },
                { label: 'Legacy v2: Modular Narrative', value: 'v2' },
                { label: 'Legacy v3: Dark Immersive', value: 'v3' },
                { label: 'Legacy v4: Grid Narrative', value: 'v4' },
                { label: 'Legacy v5: High-End Essence', value: 'v5' },
            ],
            defaultValue: 'final-1',
        }
    ],
};
