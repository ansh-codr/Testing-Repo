import { NextRequest, NextResponse } from 'next/server';
import { GalleryService } from '@/lib/galleryService';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search');
    const tags = searchParams.get('tags')?.split(',') || undefined;

    let images;
    
    if (search) {
      images = await GalleryService.searchGalleryImages(search);
    } else {
      images = await GalleryService.getGalleryImages(category, tags);
    }

    return NextResponse.json({
      success: true,
      data: images,
      total: images.length
    });

  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string;
    const metadataJson = formData.get('metadata') as string;

    if (!files.length || !category || !metadataJson) {
      return NextResponse.json(
        { message: 'Missing required fields: files, category, or metadata' },
        { status: 400 }
      );
    }

    const metadata = JSON.parse(metadataJson);

    const result = await GalleryService.uploadImages(files, category, metadata);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        uploadedCount: result.uploadedCount
      });
    } else {
      return NextResponse.json(
        { message: result.message },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Gallery upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}