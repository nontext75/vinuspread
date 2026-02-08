'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Layers,
    Briefcase,
    Users,
    Settings,
    HelpCircle,
    LogOut,
    Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
    { title: 'Home', icon: LayoutDashboard, href: '/admin' },
    { title: 'Stories', icon: Layers, href: '/admin/stories', hasAdd: true },
    { title: 'Works', icon: Briefcase, href: '/admin/works', hasAdd: true },
    { title: 'Team', icon: Users, href: '/admin/team' },
    { title: 'Settings', icon: Settings, href: '/admin/settings' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 h-screen bg-white flex flex-col py-8 px-6 border-r border-gray-100 sticky top-0">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12 px-2">
                <div className="h-20">
                    <img
                        src="/assets/logo/logo_full_white.png"
                        alt="바이너스프레드"
                        className="h-full object-contain"
                        style={{ filter: 'brightness(0.133)' }}
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-4">
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.title}>
                                <div className="flex items-center group">
                                    <Link
                                        href={item.href}
                                        className={`flex-1 flex items-center gap-4 py-3 px-4 rounded-2xl transition-all duration-300 ${isActive
                                            ? 'bg-gray-50 text-black font-bold'
                                            : 'text-gray-400 hover:text-black hover:bg-gray-50'
                                            }`}
                                    >
                                        <item.icon size={20} className={isActive ? 'text-black' : 'text-gray-400'} />
                                        <span className="text-sm tracking-wide">{item.title}</span>
                                    </Link>

                                    {item.hasAdd && (
                                        <button className="ml-2 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-black hover:bg-gray-100 rounded-full transition-colors">
                                            <Plus size={16} />
                                        </button>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Menu */}
            <div className="mt-auto space-y-4 border-t border-gray-50 pt-8">
                <Link href="/admin/help" className="flex items-center gap-4 px-4 text-gray-400 hover:text-black transition-colors">
                    <HelpCircle size={20} />
                    <span className="text-sm">Help & information</span>
                </Link>
                <button className="flex items-center gap-4 px-4 text-gray-400 hover:text-red-500 transition-colors w-full">
                    <LogOut size={20} />
                    <span className="text-sm font-medium">Log out</span>
                </button>
            </div>
        </aside>
    );
}
