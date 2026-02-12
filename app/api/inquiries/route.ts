import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/inquiries:
 *   get:
 *     description: Retrieve all inquiries
 *     responses:
 *       200:
 *         description: List of inquiries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inquiry'
 *   post:
 *     description: Create a new inquiry
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewInquiry'
 *     responses:
 *       201:
 *         description: Inquiry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inquiry'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Inquiry:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - email
 *         - createdAt
 *       properties:
 *         id:
 *           type: string
 *           description: Inquiry unique identifier
 *         name:
 *           type: string
 *           description: Contact person name
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email address
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         company:
 *           type: string
 *           description: Company name
 *         subject:
 *           type: string
 *           description: Inquiry subject
 *         message:
 *           type: string
 *           description: Inquiry message content
 *         status:
 *           type: string
 *           enum: [pending, in_progress, completed]
 *           description: Inquiry status
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Inquiry creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Inquiry last update timestamp
 *     NewInquiry:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - message
 *       properties:
 *         name:
 *           type: string
 *           description: Contact person name
 *         email:
 *           type: string
 *           format: email
 *           description: Contact email address
 *         phone:
 *           type: string
 *           description: Contact phone number
 *         company:
 *           type: string
 *           description: Company name
 *         subject:
 *           type: string
 *           description: Inquiry subject
 *         message:
 *           type: string
 *           description: Inquiry message content
 */

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET /api/inquiries - 모든 문의사항 가져오기
export async function GET(request: NextRequest) {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch inquiries', details: error.message },
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

// POST /api/inquiries - 새 문의사항 생성
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 필수 필드 검증
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        ...body,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: 'Failed to create inquiry', details: error.message },
        { status: 400 }
      );
    }

    // 텔레그램 알림 전송
    try {
      const { telegramNotifier } = await import('@/lib/telegram');
      await telegramNotifier.notifyNewInquiry(
        data.name,
        data.email,
        data.message
      );
    } catch (notificationError) {
      console.error('Telegram notification failed:', notificationError);
    }

    return NextResponse.json({
      success: true,
      data: data,
      message: '문의가 성공적으로 접수되었습니다.'
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}