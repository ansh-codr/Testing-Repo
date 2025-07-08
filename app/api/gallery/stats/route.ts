import { NextResponse } from 'next/server';
import { GalleryService } from '@/lib/galleryService';

export async function GET() {
  try {
    const stats = await GalleryService.getGalleryStats();

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    console.error('Gallery stats error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}