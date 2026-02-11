'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BarChart3, FileText, Image, MessageSquare, FlaskConical, Database, Plus, RefreshCw } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface QuickStats {
  projects: number;
  stories: number;
  media: number;
  inquiries: number;
  labItems: number;
}

export default function SimpleAdminPage() {
  const [stats, setStats] = useState<QuickStats>({
    projects: 0,
    stories: 0,
    media: 0,
    inquiries: 0,
    labItems: 0
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const [projectsCount, storiesCount, mediaCount, inquiriesCount, labItemsCount] = await Promise.all([
          supabase.from('projects').select('count', { count: 'exact', head: true }),
          supabase.from('stories').select('count', { count: 'exact', head: true }),
          supabase.from('media').select('count', { count: 'exact', head: true }),
          supabase.from('inquiries').select('count', { count: 'exact', head: true }),
          supabase.from('lab-items').select('count', { count: 'exact', head: true })
        ]);

        setStats({
          projects: projectsCount.count || 0,
          stories: storiesCount.count || 0,
          media: mediaCount.count || 0,
          inquiries: inquiriesCount.count || 0,
          labItems: labItemsCount.count || 0
        });
        setLastUpdate(new Date());
      } catch (error) {
        console.error('통계 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const quickLinks = [
    {
      title: '프로젝트',
      count: stats.projects,
      icon: <BarChart3 className="w-6 h-6" />,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      href: '/work'
    },
    {
      title: '스토리',
      count: stats.stories,
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      href: '/story'
    },
    {
      title: '미디어',
      count: stats.media,
      icon: <Image className="w-6 h-6" />,
      color: 'bg-green-500/20 text-green-400 border-green-500/30',
      href: '/admin'
    },
    {
      title: '문의',
      count: stats.inquiries,
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      href: '/admin'
    },
    {
      title: '랩 아이템',
      count: stats.labItems,
      icon: <FlaskConical className="w-6 h-6" />,
      color: 'bg-pink-500/20 text-pink-400 border-pink-500/30',
      href: '/lab'
    }
  ];

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
            <div>
              <h1 className="text-4xl font-bold mb-2">VINUSPREAD 관리자</h1>
              <p className="text-gray-400">
                REST API 기반 간단 관리자 • 마지막 업데이트: {lastUpdate.toLocaleTimeString('ko-KR')}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 border border-gray-700 hover:border-gray-600 rounded-xl transition-colors flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                새로고침
              </button>
              <Link
                href="/admin"
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl transition-colors flex items-center gap-2"
              >
                <Database className="w-5 h-5" />
                CMS 관리자
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {quickLinks.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.href} className="block">
                <div className="p-6 rounded-2xl border border-gray-800 bg-gray-800/50 hover:border-gray-700 hover:bg-gray-800/70 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl border ${item.color}`}>
                      {item.icon}
                    </div>
                    <div className="text-2xl font-bold">
                      {loading ? '...' : item.count}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">{item.title}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 rounded-2xl border border-gray-800 bg-gradient-to-br from-green-500/5 to-blue-500/5"
        >
          <div className="flex items-center gap-4 mb-4">
            <Database className="w-6 h-6 text-green-400" />
            <h2 className="text-xl font-bold">시스템 상태</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-800/50">
              <span className="text-gray-400">REST API</span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">정상</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-800/50">
              <span className="text-gray-400">데이터베이스</span>
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-medium">연결 대기</span>
            </div>
          </div>
          
          <div className="mt-4 p-4 rounded-xl border border-yellow-500/30 bg-yellow-500/10">
            <p className="text-sm text-yellow-400">
              ⚠️ 데이터베이스 연결이 초기화되는 중입니다. 새로 만든 데이터베이스가 활성화되면 CMS 관리자가 정상 작동합니다.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}