import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/projects:
 *   get:
 *     description: Retrieve all projects
 *     responses:
 *       200:
 *         description: List of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *   post:
 *     description: Create a new project
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProject'
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     description: Get a specific project by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *   put:
 *     description: Update a project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProject'
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       404:
 *         description: Project not found
 *   delete:
 *     description: Delete a project
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - title
 *         - id
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Project unique identifier
 *         title:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Project description
 *         category:
 *           type: string
 *           description: Project category
 *         client:
 *           type: string
 *           description: Client name
 *         year:
 *           type: string
 *           description: Project year
 *         image:
 *           type: string
 *           description: Project image URL
 *         motion_type:
 *           type: string
 *           enum: [fade, slide-up, reveal, zoom, none]
 *           description: Animation type for project display
 *         sort_order:
 *           type: integer
 *           description: Sort order for display
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Project creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Project last update timestamp
 *     NewProject:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Project title
 *         description:
 *           type: string
 *           description: Project description
 *         category:
 *           type: string
 *           description: Project category
 *         client:
 *           type: string
 *           description: Client name
 *         year:
 *           type: string
 *           description: Project year
 *         motion_type:
 *           type: string
 *           enum: [fade, slide-up, reveal, zoom, none]
 *           description: Animation type for project display
 *         sort_order:
 *           type: integer
 *           description: Sort order for display
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/projects - 모든 프로젝트 가져오기
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: error.message },
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

// POST /api/projects - 새 프로젝트 생성
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
      .from('projects')
      .insert({
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create project', details: error.message },
        { status: 400 }
      );
    }

    // 텔레그램 알림 전송
    try {
      const { telegramNotifier } = await import('@/lib/telegram');
      await telegramNotifier.notifyNewProject(
        data.title,
        data.category || '미분류',
        '시스템'
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