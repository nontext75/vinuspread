'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Settings, Database, FileText, Image, MessageSquare, FlaskConical, BarChart3, Clock, CheckCircle, AlertCircle, Plus, Edit, Eye, Users } from 'lucide-react';

const quickActions = [
  {
    title: '새 프로젝트',
    description: '포트폴리오 항목 추가',
    icon: <Plus className="w-5 h-5" />,
    path: '/admin/collections/projects/create',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  },
  {
    title: '새 스토리',
    description: '블로그 포스트 작성',
    icon: <FileText className="w-5 h-5" />,
    path: '/admin/collections/stories/create',
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
  },
  {
    title: '미디어 업로드',
    description: '이미지 및 파일 추가',
    icon: <Image className="w-5 h-5" />,
    path: '/admin/collections/media/create',
    color: 'bg-green-500/20 text-green-400 border-green-500/30'
  }
];

const systemStatus = [
  { name: 'REST API', status: 'active' },
  { name: '데이터베이스', status: 'warning' },
  { name: 'CMS 동기화', status: 'progress' }
];

const statusConfig = {
  active: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: <CheckCircle className="w-4 h-4" />, label: '정상' },
  warning: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: <AlertCircle className="w-4 h-4" />, label: '주의' },
  progress: { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: <Clock className="w-4 h-4" />, label: '진행 중' }
};

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="p-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <Home className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-4xl font-bold mb-2">관리자 대시보드</h1>
                <p className="text-gray-400">VINUSPREAD 콘텐츠 관리 현황</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/admin"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Database className="w-5 h-5" />
                CMS 관리자
              </Link>
              <Link
                href="/admin/sitemap"
                className="px-6 py-3 border border-gray-700 hover:border-gray-600 rounded-xl transition-colors flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
                사이트맵
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={action.path} className="block">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gray-800/50 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${action.color}`}>
                      {action.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-400">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        >
          <div className="flex items-center gap-4 mb-6">
            <Database className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">시스템 상태</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {systemStatus.map((item, index) => {
              const config = statusConfig[item.status as keyof typeof statusConfig];
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-center p-6 rounded-xl border border-gray-800 bg-gray-800/50"
                >
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium border ${config.color} mb-3`}>
                    {config.icon}
                    {config.label}
                  </div>
                  <div className="text-lg font-medium">{item.name}</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { icon: <FileText className="w-4 h-4" />, label: '프로젝트', path: '/admin/collections/projects' },
            { icon: <FileText className="w-4 h-4" />, label: '스토리', path: '/admin/collections/stories' },
            { icon: <Image className="w-4 h-4" />, label: '미디어', path: '/admin/collections/media' },
            { icon: <MessageSquare className="w-4 h-4" />, label: '문의', path: '/admin/collections/inquiries' },
            { icon: <FlaskConical className="w-4 h-4" />, label: '랩', path: '/admin/collections/lab-items' },
            { icon: <Users className="w-4 h-4" />, label: '사용자', path: '/admin/collections/users' }
          ].map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + index * 0.05 }}
            >
              <Link href={item.path} className="block">
                <div className="p-4 rounded-xl border border-gray-800 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-center">
                  <div className="flex justify-center mb-2 text-purple-400">
                    {item.icon}
                  </div>
                  <div className="text-sm font-medium">{item.label}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}