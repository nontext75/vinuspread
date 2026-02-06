import config from '@/payload.config';
import { RootPage } from '@payloadcms/next/views';
import { generatePageMetadata } from '@payloadcms/next/views';
import { importMap } from '../importMap';
import { Metadata } from 'next';

type Args = {
    params: Promise<{
        segments: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
};

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
    generatePageMetadata({ config, params, searchParams });

const Page = async ({ params, searchParams }: Args) => {
    return (
        <RootPage
            config={config}
            importMap={importMap}
            params={params}
            searchParams={searchParams}
        />
    );
};

export default Page;
