import { NextRequest, NextResponse } from 'next/server';
import { GalleryService } from '@/lib/galleryService';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const imageId = params.id;

    if (!imageId) {
      return NextResponse.json(
        { message: 'Image ID is required' },
        { status: 400 }
      );
    }

    const result = await GalleryService.deleteImage(imageId);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message
      });
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: 404 }
      );
    }

  } catch (error) {
    console.error('Delete image error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}