import { NextRequest, NextResponse } from 'next/server';
import { StudentService } from '@/lib/studentService';

export async function POST(request: NextRequest) {
  try {
    const { studentId, passcode } = await request.json();

    if (!studentId || !passcode) {
      return NextResponse.json(
        { message: 'Student ID and passcode are required' },
        { status: 400 }
      );
    }

    const student = await StudentService.authenticateStudent(studentId, passcode);

    if (!student) {
      return NextResponse.json(
        { message: 'Invalid student ID or passcode' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      student
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}