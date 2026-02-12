import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/stories:
 *   get:
 *     description: Retrieve all stories
 *     responses:
 *       200:
 *         description: List of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *   post:
 *     description: Create a new story
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewStory'
 *     responses:
 *       201:
 *         description: Story created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       required:
 *         - title
 *         - id
 *         - status
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Story unique identifier
 *         title:
 *           type: string
 *           description: Story title
 *         excerpt:
 *           type: string
 *           description: Story excerpt
 *         category:
 *           type: string
 *           description: Story category
 *         image:
 *           type: string
 *           description: Story image URL
 *         content:
 *           type: string
 *           description: Story content
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           description: Story status
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: Story publication date
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Story creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Story last update timestamp
 *     NewStory:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Story title
 *         excerpt:
 *           type: string
 *           description: Story excerpt
 *         category:
 *           type: string
 *           description: Story category
 *         content:
 *           type: string
 *           description: Story content
 *         status:
 *           type: string
 *           enum: [draft, published]
 *           description: Story status
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: Story publication date
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/stories - 모든 스토리 가져오기
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('published_date', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch stories', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/stories - 새 스토리 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('stories')
      .insert({
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create story', details: error.message },
        { status: 400 }
      );
    }

    // 텔레그램 알림 전송
    try {
      const { telegramNotifier } = await import('@/lib/telegram');
      await telegramNotifier.notifyNewStory(
        data.title,
        data.status
      );
    } catch (notificationError) {
      console.error('Telegram notification failed:', notificationError);
    }

    return NextResponse.json({
      success: true,
      data: data
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}