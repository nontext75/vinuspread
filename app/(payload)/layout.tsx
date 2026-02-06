import config from '@/payload.config';
import { RootLayout } from '@payloadcms/next/layouts';
import { handleServerFunctions } from '@payloadcms/next/layouts';
import React from 'react';
import { importMap } from './admin/importMap';

import './custom.css';

type Args = {
    children: React.ReactNode;
};

const Layout = ({ children }: Args) => (
    <RootLayout
        config={config}
        importMap={importMap}
        serverFunction={handleServerFunctions({ config, importMap })}
    >
        {children}
    </RootLayout>
);

export default Layout;
