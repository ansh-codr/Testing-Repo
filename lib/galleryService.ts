import { db, storage } from './firebase';
import { collection, doc, setDoc, getDocs, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: 'facilities' | 'student-life' | 'academics' | 'events' | 'sports' | 'cultural';
  imageUrl: string;
  thumbnailUrl?: string;
  fileName: string;
  uploadedAt: Date;
  isActive: boolean;
  tags?: string[];
  photographer?: string;
  event?: string;
}

const GALLERY_COLLECTION = 'gallery_images';
const GALLERY_STORAGE_PATH = 'gallery-images';

export class GalleryService {
  // Upload multiple images to gallery
  static async uploadImages(
    files: File[], 
    category: string, 
    metadata: { title: string; description: string; tags?: string[]; photographer?: string; event?: string }[]
  ): Promise<{ success: boolean; message: string; uploadedCount?: number }> {
    try {
      if (files.length !== metadata.length) {
        return { success: false, message: 'Files and metadata count mismatch' };
      }

      const uploadPromises = files.map(async (file, index) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image`);
        }

        // Generate unique filename
        const timestamp = Date.now();
        const fileName = `${category}_${timestamp}_${index}_${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const storageRef = ref(storage, `${GALLERY_STORAGE_PATH}/${category}/${fileName}`);

        // Upload file
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Create gallery image document
        const imageId = `${category}_${timestamp}_${index}`;
        const galleryImage: GalleryImage = {
          id: imageId,
          title: metadata[index].title,
          description: metadata[index].description,
          category: category as any,
          imageUrl: downloadURL,
          fileName,
          uploadedAt: new Date(),
          isActive: true,
          tags: metadata[index].tags || [],
          photographer: metadata[index].photographer,
          event: metadata[index].event
        };

        // Save to Firestore
        await setDoc(doc(db, GALLERY_COLLECTION, imageId), galleryImage);
        return galleryImage;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      return {
        success: true,
        message: `Successfully uploaded ${uploadedImages.length} images`,
        uploadedCount: uploadedImages.length
      };

    } catch (error) {
      console.error('Gallery upload error:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to upload images' 
      };
    }
  }

  // Get all gallery images with optional filtering
  static async getGalleryImages(category?: string, tags?: string[]): Promise<GalleryImage[]> {
    try {
      const galleryRef = collection(db, GALLERY_COLLECTION);
      let q = query(galleryRef, orderBy('uploadedAt', 'desc'));

      if (category && category !== 'all') {
        q = query(galleryRef, where('category', '==', category), orderBy('uploadedAt', 'desc'));
      }

      const snapshot = await getDocs(q);
      let images = snapshot.docs.map(doc => ({ ...doc.data() } as GalleryImage));

      // Filter by tags if provided
      if (tags && tags.length > 0) {
        images = images.filter(image => 
          image.tags?.some(tag => tags.includes(tag))
        );
      }

      // Only return active images
      return images.filter(image => image.isActive);

    } catch (error) {
      console.error('Get gallery images error:', error);
      throw new Error('Failed to fetch gallery images');
    }
  }

  // Search gallery images
  static async searchGalleryImages(searchQuery: string): Promise<GalleryImage[]> {
    try {
      const allImages = await this.getGalleryImages();
      const query = searchQuery.toLowerCase();

      return allImages.filter(image => {
        const searchableFields = [
          image.title?.toLowerCase() || '',
          image.description?.toLowerCase() || '',
          image.category?.toLowerCase() || '',
          image.photographer?.toLowerCase() || '',
          image.event?.toLowerCase() || '',
          ...(image.tags?.map(tag => tag.toLowerCase()) || [])
        ];

        return searchableFields.some(field => field.includes(query));
      });

    } catch (error) {
      console.error('Search gallery images error:', error);
      throw new Error('Failed to search gallery images');
    }
  }

  // Delete gallery image
  static async deleteImage(imageId: string): Promise<{ success: boolean; message: string }> {
    try {
      // Get image document
      const imageDoc = await getDocs(query(collection(db, GALLERY_COLLECTION), where('id', '==', imageId)));
      
      if (imageDoc.empty) {
        return { success: false, message: 'Image not found' };
      }

      const imageData = imageDoc.docs[0].data() as GalleryImage;

      // Delete from Storage
      const storageRef = ref(storage, `${GALLERY_STORAGE_PATH}/${imageData.category}/${imageData.fileName}`);
      await deleteObject(storageRef);

      // Delete from Firestore
      await deleteDoc(imageDoc.docs[0].ref);

      return { success: true, message: 'Image deleted successfully' };

    } catch (error) {
      console.error('Delete image error:', error);
      return { success: false, message: 'Failed to delete image' };
    }
  }

  // Get gallery statistics
  static async getGalleryStats() {
    try {
      const images = await this.getGalleryImages();

      const categoryStats = images.reduce((acc: any, image) => {
        acc[image.category] = (acc[image.category] || 0) + 1;
        return acc;
      }, {});

      const totalImages = images.length;
      const recentImages = images.filter(image => {
        const uploadDate = new Date(image.uploadedAt);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        return uploadDate > thirtyDaysAgo;
      }).length;

      return {
        totalImages,
        categoryStats,
        recentImages,
        lastUpdated: new Date().toISOString()
      };

    } catch (error) {
      console.error('Gallery stats error:', error);
      throw new Error('Failed to get gallery statistics');
    }
  }

  // Bulk upload with Excel metadata
  static async bulkUploadWithMetadata(
    files: File[], 
    metadataFile: File
  ): Promise<{ success: boolean; message: string; uploadedCount?: number }> {
    try {
      // This would parse an Excel file with image metadata
      // Implementation would be similar to student data upload
      // For now, return a placeholder
      return {
        success: true,
        message: 'Bulk upload feature coming soon',
        uploadedCount: 0
      };
    } catch (error) {
      return { success: false, message: 'Bulk upload failed' };
    }
  }
}