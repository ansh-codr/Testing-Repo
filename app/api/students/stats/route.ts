import { NextResponse } from 'next/server';
import { StudentService } from '@/lib/studentService';

export async function GET() {
  try {
    const stats = await StudentService.getStatistics();

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}