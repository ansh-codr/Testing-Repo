import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function POST() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    const backupDir = path.join(dataDir, 'backup');
    const sourceFile = path.join(dataDir, 'students.xlsx');
    
    if (!fs.existsSync(sourceFile)) {
      return NextResponse.json(
        { message: 'No student data file to backup' },
        { status: 404 }
      );
    }

    // Create backup directory if it doesn't exist
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Create backup filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFile = path.join(backupDir, `students_backup_${timestamp}.xlsx`);

    // Copy file
    fs.copyFileSync(sourceFile, backupFile);

    return NextResponse.json({
      success: true,
      message: 'Backup created successfully',
      backupFile: `students_backup_${timestamp}.xlsx`
    });

  } catch (error) {
    console.error('Backup error:', error);
    return NextResponse.json(
      { message: 'Failed to create backup' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const backupDir = path.join(process.cwd(), 'data', 'backup');
    
    if (!fs.existsSync(backupDir)) {
      return NextResponse.json({
        success: true,
        backups: []
      });
    }

    const files = fs.readdirSync(backupDir)
      .filter(file => file.endsWith('.xlsx'))
      .map(file => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        return {
          name: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
      .sort((a, b) => b.created.getTime() - a.created.getTime());

    return NextResponse.json({
      success: true,
      backups: files
    });

  } catch (error) {
    console.error('Backup list error:', error);
    return NextResponse.json(
      { message: 'Failed to list backups' },
      { status: 500 }
    );
  }
}