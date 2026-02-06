'use client';

import { usePathname } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AtmosphericBackground from "@/components/ui/AtmosphericBackground";
import CursorParticleSystem from "@/components/ui/CursorParticleSystem";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/' || pathname === '';
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            {isHome && (
                <>
                    <AtmosphericBackground />
                    <CursorParticleSystem />
                </>
            )}
            <Header />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </>
    );
}
