import { NextRequest, NextResponse } from 'next/server';
import { StudentService } from '@/lib/studentService';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    const result = await StudentService.uploadExcelFile(file);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        recordsCount: result.recordsCount
      });
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}