'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, Image, Briefcase, MessageSquare, FlaskConical, Settings, Home, Book, ChevronRight, Database, Shield, Zap, Users, Mail, HelpCircle } from 'lucide-react';

interface PageItem {
  title: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: 'public' | 'admin' | 'system';
  status?: 'active' | 'beta' | 'wip';
}

const pages: PageItem[] = [
  // Public Pages
  {
    title: '메인 홈',
    description: 'VINUSPREAD 메인 랜딩 페이지',
    path: '/',
    icon: <Home className="w-5 h-5" />,
    category: 'public',
    status: 'active'
  },
  {
    title: '워크',
    description: '포트폴리오 및 프로젝트 목록',
    path: '/work',
    icon: <Briefcase className="w-5 h-5" />,
    category: 'public',
    status: 'active'
  },
  {
    title: '스토리',
    description: '블로그 및 스토리텔링 콘텐츠',
    path: '/story',
    icon: <Book className="w-5 h-5" />,
    category: 'public',
    status: 'active'
  },
  {
    title: '랩',
    description: '실험적 프로젝트 및 리소스',
    path: '/lab',
    icon: <FlaskConical className="w-5 h-5" />,
    category: 'public',
    status: 'beta'
  },
  {
    title: '에이전시',
    description: '회사 소개 및 서비스 안내',
    path: '/agency',
    icon: <Settings className="w-5 h-5" />,
    category: 'public',
    status: 'wip'
  },

  // Admin Pages
  {
    title: '관리자 패널',
    description: 'Payload CMS 관리자 대시보드',
    path: '/admin',
    icon: <Settings className="w-5 h-5" />,
    category: 'admin',
    status: 'active'
  },
  {
    title: '워크 에디터',
    description: '프로젝트 관리 전용 에디터',
    path: '/admin/WorkEditor',
    icon: <FileText className="w-5 h-5" />,
    category: 'admin',
    status: 'active'
  },
  {
    title: '링크 관리',
    description: '외부 링크 및 참조 자료 관리',
    path: '/admin/links',
    icon: <ChevronRight className="w-5 h-5" />,
    category: 'admin',
    status: 'wip'
  },
  {
    title: '데이터 마이그레이션',
    description: '데이터 이전 및 관리 도구',
    path: '/admin/migration',
    icon: <Database className="w-5 h-5" />,
    category: 'admin',
    status: 'beta'
  },
  {
    title: '디버그 패널',
    description: '시스템 상태 및 디버깅 도구',
    path: '/admin/debug',
    icon: <Zap className="w-5 h-5" />,
    category: 'admin',
    status: 'beta'
  },

  // System Pages
  {
    title: '미디어 라이브러리',
    description: '이미지 및 파일 업로드 관리',
    path: '/admin/collections/media',
    icon: <Image className="w-5 h-5" />,
    category: 'system',
    status: 'active'
  },
  {
    title: '문의 관리',
    description: '고객 문의 및 연락처 관리',
    path: '/admin/collections/inquiries',
    icon: <MessageSquare className="w-5 h-5" />,
    category: 'system',
    status: 'active'
  },
  {
    title: '사용자 관리',
    description: '관리자 계정 및 권한 관리',
    path: '/admin/collections/users',
    icon: <Users className="w-5 h-5" />,
    category: 'system',
    status: 'active'
  }
];

const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  beta: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  wip: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
};

const categoryColors = {
  public: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
  admin: 'bg-orange-500/10 border-orange-500/30 text-orange-300',
  system: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
};

export default function SiteMapPage() {
  const groupedPages = pages.reduce((acc, page) => {
    if (!acc[page.category]) {
      acc[page.category] = [];
    }
    acc[page.category].push(page);
    return acc;
  }, {} as Record<string, PageItem[]>);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            VINUSPREAD SITEMAP
          </h1>
          <p className="text-xl text-gray-400">
            전체 페이지 구조 및 관리자 도구 현황
          </p>
        </motion.div>

        <div className="space-y-12">
          {Object.entries(groupedPages).map(([category, categoryPages], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`px-4 py-2 rounded-full border text-sm font-medium ${categoryColors[category as keyof typeof categoryColors]}`}>
                  {category === 'public' ? '🌐 PUBLIC PAGES' : category === 'admin' ? '⚙️ ADMIN PAGES' : '🔧 SYSTEM PAGES'}
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryPages.map((page, pageIndex) => (
                  <motion.div
                    key={page.path}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: categoryIndex * 0.1 + pageIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Link href={page.path} className="block">
                      <div className="p-6 rounded-2xl border border-gray-800 hover:border-gray-700 bg-gray-900/50 hover:bg-gray-900/70 transition-all duration-300 group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 text-purple-300 group-hover:scale-110 transition-transform">
                            {page.icon}
                          </div>
                          {page.status && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusColors[page.status]}`}>
                              {page.status.toUpperCase()}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
                          {page.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                          {page.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <code className="text-xs bg-black/50 px-2 py-1 rounded text-gray-500">
                            {page.path}
                          </code>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-3xl border border-gray-800 bg-gradient-to-br from-purple-500/5 to-pink-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold">시스템 상태</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-green-400">✅</div>
              <div className="text-sm text-gray-400 mt-2">REST API</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-yellow-400">⚠️</div>
              <div className="text-sm text-gray-400 mt-2">Direct DB</div>
            </div>
            <div className="text-center p-4 rounded-xl border border-gray-800">
              <div className="text-3xl font-bold text-blue-400">🔄</div>
              <div className="text-sm text-gray-400 mt-2">CMS Sync</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}