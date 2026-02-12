import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/stats:
 *   get:
 *     description: Get system statistics
 *     responses:
 *       200:
 *         description: System statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     projects:
 *                       type: integer
 *                     stories:
 *                       type: integer
 *                     media:
 *                       type: integer
 *                     inquiries:
 *                       type: integer
 *                     labItems:
 *                       type: integer
 *                     lastUpdated:
 *                       type: string
 *                       format: date-time
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/stats - 시스템 통계 가져오기
export async function GET(request: NextRequest) {
  try {
    const [
      projectsCount,
      storiesCount,
      mediaCount,
      inquiriesCount,
      labItemsCount
    ] = await Promise.all([
      supabase.from('projects').select('count', { count: 'exact', head: true }),
      supabase.from('stories').select('count', { count: 'exact', head: true }),
      supabase.from('media').select('count', { count: 'exact', head: true }),
      supabase.from('inquiries').select('count', { count: 'exact', head: true }),
      supabase.from('lab-items').select('count', { count: 'exact', head: true })
    ]);

    const stats = {
      projects: projectsCount.count || 0,
      stories: storiesCount.count || 0,
      media: mediaCount.count || 0,
      inquiries: inquiriesCount.count || 0,
      labItems: labItemsCount.count || 0,
      lastUpdated: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch statistics', details: (err as Error).message },
      { status: 500 }
    );
  }
}