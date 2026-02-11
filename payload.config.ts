import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

import { Projects } from './collections/Projects';
import { Stories } from './collections/Stories';
import { Media } from './collections/Media';
import { Inquiries } from './collections/Inquiries';
import { LabItems } from './collections/LabItems';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: 'users',
    },
    collections: [
        {
            slug: 'users',
            auth: true,
            access: {
                delete: () => false,
                update: () => false,
            },
            fields: [],
        },
        Projects,
        Stories,
        Media,
        Inquiries,
        LabItems,
    ],
    editor: lexicalEditor({}),
    secret: process.env.PAYLOAD_SECRET || 'fallback-secret-for-build',
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
});
