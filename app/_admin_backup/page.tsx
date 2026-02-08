'use client';

import { motion } from 'framer-motion';
import {
    ThumbsUp,
    Clock,
    BarChart3,
    Calendar,
    ChevronDown,
    MoreHorizontal,
    CheckCircle2,
    Clock3,
    AlertCircle
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const CHART_DATA = [
    { name: '01', thisMonth: 4, lastMonth: 3 },
    { name: '02', thisMonth: 3, lastMonth: 5 },
    { name: '03', thisMonth: 7, lastMonth: 4 },
    { name: '04', thisMonth: 5, lastMonth: 6 },
    { name: '05', thisMonth: 6, lastMonth: 4 },
    { name: '06', thisMonth: 4, lastMonth: 7 },
    { name: '07', thisMonth: 5, lastMonth: 5 },
];

const STATS = [
    { title: 'Finished', value: '18', change: '+8 tasks', icon: ThumbsUp, color: 'text-gray-900', bg: 'bg-gray-50' },
    { title: 'Tracked', value: '31h', change: '-6 hours', icon: Clock, color: 'text-gray-900', bg: 'bg-gray-50' },
    { title: 'Efficiency', value: '93%', change: '+12%', icon: BarChart3, color: 'text-gray-900', bg: 'bg-gray-50' },
];

const TASKS = [
    { id: 1, title: 'Product Review for UI8 Market', status: 'In progress', time: '4h', icon: CheckCircle2, statusColor: 'bg-orange-400' },
    { id: 2, title: 'UX Research for Product', status: 'On hold', time: '8h', icon: Clock3, statusColor: 'bg-blue-400' },
    { id: 3, title: 'App design and development', status: 'Done', time: '32h', icon: AlertCircle, statusColor: 'bg-emerald-400' },
];

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            <header className="flex justify-between items-start">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Hello, Margaret</h1>
                    <p className="text-gray-400 text-sm">Track team progress here. You almost reach a goal!</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-50">
                    <span className="text-sm font-bold">16 May, 2023</span>
                    <Calendar size={18} className="text-gray-400" />
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STATS.map((stat, idx) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-6"
                    >
                        <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center`}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium mb-1">{stat.title}</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold">{stat.value}</span>
                                <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Performance Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50"
            >
                <div className="flex justify-between items-center mb-10">
                    <h2 className="text-xl font-bold">Performance</h2>
                    <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600">
                        01-07 May
                        <ChevronDown size={14} />
                    </button>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA}>
                            <defs>
                                <linearGradient id="colorThis" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorLast" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                dy={10}
                            />
                            <YAxis
                                hide
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="thisMonth"
                                stroke="#3B82F6"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorThis)"
                            />
                            <Area
                                type="monotone"
                                dataKey="lastMonth"
                                stroke="#F97316"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorLast)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Current Tasks */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-baseline gap-4">
                        <h2 className="text-xl font-bold">Current Tasks</h2>
                        <span className="text-xs font-bold text-gray-400">Done 30%</span>
                    </div>
                    <button className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl text-xs font-bold text-gray-600">
                        Week
                        <ChevronDown size={14} />
                    </button>
                </div>

                <div className="space-y-2">
                    {TASKS.map((task) => (
                        <div key={task.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-white transition-colors">
                                    <task.icon size={18} className="text-gray-400" />
                                </div>
                                <span className="font-bold text-sm">{task.title}</span>
                            </div>
                            <div className="flex items-center gap-12">
                                <div className="flex items-center gap-2 min-w-[120px]">
                                    <div className={`w-2 h-2 rounded-full ${task.statusColor}`} />
                                    <span className="text-xs font-bold text-gray-400">{task.status}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 min-w-[60px]">
                                    <Clock size={14} />
                                    <span className="text-xs font-bold">{task.time}</span>
                                </div>
                                <button className="text-gray-300 hover:text-black transition-colors">
                                    <MoreHorizontal size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
