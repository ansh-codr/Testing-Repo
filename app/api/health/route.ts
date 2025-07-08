import { NextResponse } from 'next/server';
import { StudentService } from '@/lib/studentService';

export async function GET() {
  try {
    const status = await StudentService.healthCheck();

    return NextResponse.json({
      success: true,
      status,
      message: 'Backend is healthy'
    });
  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Backend health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}