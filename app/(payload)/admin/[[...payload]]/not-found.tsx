import config from '@/payload.config';
import { NotFoundPage } from '@payloadcms/next/views';
import { importMap } from '../importMap';

type Args = {
    params: Promise<{
        segments: string[];
    }>;
    searchParams: Promise<{
        [key: string]: string | string[];
    }>;
};

const Page = async ({ params, searchParams }: Args) => {
    return (
        <NotFoundPage
            config={config}
            importMap={importMap}
            params={params}
            searchParams={searchParams}
        />
    );
};

export default Page;
