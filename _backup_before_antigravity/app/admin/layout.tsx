import AdminSidebar from './components/AdminSidebar';
import AdminActivityPanel from './components/AdminActivityPanel';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-[#F8F9FB] text-gray-900 font-sans">
            {/* Left Sidebar */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 min-h-screen p-8 overflow-y-auto">
                {children}
            </main>

            {/* Right Panel */}
            <AdminActivityPanel />
        </div>
    );
}
