import { NextRequest, NextResponse } from 'next/server';
import { StudentService } from '@/lib/studentService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('search') || '';
    const filter = searchParams.get('filter') || 'all';

    const students = await StudentService.searchStudents(query, filter);

    return NextResponse.json({
      success: true,
      data: students,
      total: students.length
    });

  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}