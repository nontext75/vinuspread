import type { CollectionConfig } from 'payload';

export const LabItems: CollectionConfig = {
    slug: 'lab-items',
    labels: {
        singular: 'LAB Item',
        plural: 'LAB Items',
    },
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'download_count', 'like_count'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            label: 'Item Name',
        },
        {
            name: 'category',
            type: 'select',
            required: true,
            options: [
                { label: 'Watch Face', value: 'watchface' },
                { label: 'Emoticon', value: 'emoticon' },
                { label: 'Icons', value: 'icons' },
                { label: 'Etc', value: 'etc' },
            ],
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'List Thumbnail',
        },
        {
            name: 'detail_image',
            type: 'upload',
            relationTo: 'media',
            required: false, // Optional, can use thumbnail if missing
            label: 'Detail Page Visual',
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Description',
        },
        {
            name: 'download_url',
            type: 'text',
            label: 'Download Link (External or File Path)',
        },
        {
            name: 'download_file',
            type: 'upload',
            relationTo: 'media',
            label: 'Direct File Upload (Optional)',
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'download_count',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'like_count',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        position: 'sidebar',
                    },
                },
                {
                    name: 'talk_count',
                    type: 'number',
                    defaultValue: 0,
                    admin: {
                        position: 'sidebar',
                    },
                },
            ],
        },
    ],
};
