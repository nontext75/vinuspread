'use client';

import {
    Phone,
    Video,
    MoreHorizontal,
    Smile,
    Mic,
    Paperclip
} from 'lucide-react';

export default function AdminActivityPanel() {
    return (
        <aside className="w-80 h-screen bg-gray-50/50 flex flex-col py-8 px-6 border-l border-gray-100 sticky top-0 overflow-y-auto">
            {/* Profile Card */}
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 mb-8">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4">
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-md">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                                alt="Admin Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full"></div>
                    </div>
                    <h3 className="font-bold text-gray-900">Megan Norton</h3>
                    <p className="text-sm text-gray-400 mb-6">@msgnorton</p>

                    <div className="flex items-center gap-4">
                        <button className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
                            <Phone size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
                            <Video size={18} className="text-gray-600" />
                        </button>
                        <button className="p-2 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors">
                            <MoreHorizontal size={18} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Activity Feed */}
            <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="font-bold text-sm tracking-widest text-gray-400 uppercase">Activity</h4>
                </div>

                <div className="space-y-6">
                    {/* Activity Item 1 */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100" alt="User" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-sm">Floyd Miles</span>
                                <span className="text-[10px] text-gray-400 uppercase">10:15 AM</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">Commented on <span className="text-gray-900 border-b border-gray-200 cursor-pointer">Stark Project</span></p>
                            <div className="bg-white rounded-2xl p-3 text-xs text-gray-500 shadow-sm border border-gray-50">
                                Hi! Next week we'll start a new project. I'll tell you all the details later
                            </div>
                        </div>
                    </div>

                    {/* Activity Item 2 */}
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100" alt="User" />
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-sm">Guy Hawkins</span>
                                <span className="text-[10px] text-gray-400 uppercase">10:15 AM</span>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">Added a file to <span className="text-gray-900 border-b border-gray-200 cursor-pointer">7Heros Project</span></p>
                            <div className="bg-blue-50/30 rounded-2xl p-3 flex items-center gap-3 border border-blue-50">
                                <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
                                    <span className="text-[8px] text-white font-bold italic">f</span>
                                </div>
                                <div className="flex-1 overflow-hidden">
                                    <div className="font-bold text-[10px] truncate">Homepage.fig</div>
                                    <div className="text-[9px] text-gray-400">13.4 Mb</div>
                                </div>
                                <div className="w-5 h-5 rounded-full border border-blue-100 flex items-center justify-center text-blue-500">
                                    <span className="text-xs">↓</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Chat Input */}
            <div className="mt-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Write a message"
                        className="w-full bg-white rounded-2xl py-3 pl-10 pr-12 text-xs border border-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-200 shadow-sm"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Paperclip size={14} />
                    </div>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gray-400">
                        <Smile size={14} className="cursor-pointer hover:text-black transition-colors" />
                        <Mic size={14} className="cursor-pointer hover:text-black transition-colors" />
                    </div>
                </div>
            </div>
        </aside>
    );
}
