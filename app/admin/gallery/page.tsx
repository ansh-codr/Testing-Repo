'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Trash2, Eye, Plus, Filter } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { toast } from 'react-toastify';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  fileName: string;
  uploadedAt: string;
  tags?: string[];
  photographer?: string;
  event?: string;
}

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadMetadata, setUploadMetadata] = useState<any[]>([]);

  const categories = [
    { id: 'all', name: 'All Images', color: 'gray' },
    { id: 'facilities', name: 'Facilities', color: 'blue' },
    { id: 'student-life', name: 'Student Life', color: 'green' },
    { id: 'academics', name: 'Academics', color: 'purple' },
    { id: 'events', name: 'Events', color: 'yellow' },
    { id: 'sports', name: 'Sports', color: 'red' },
    { id: 'cultural', name: 'Cultural', color: 'pink' }
  ];

  useEffect(() => {
    fetchImages();
  }, [selectedCategory]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }

      const response = await fetch(`/api/gallery?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setImages(data.data);
      } else {
        toast.error(data.message || 'Failed to fetch images');
      }
    } catch (error) {
      toast.error('An error occurred while fetching images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadFiles(files);
    
    // Initialize metadata for each file
    const metadata = files.map(file => ({
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      description: '',
      tags: [],
      photographer: '',
      event: ''
    }));
    setUploadMetadata(metadata);
  };

  const handleUpload = async () => {
    if (uploadFiles.length === 0 || selectedCategory === 'all') {
      toast.error('Please select files and a category');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    
    uploadFiles.forEach(file => {
      formData.append('files', file);
    });
    
    formData.append('category', selectedCategory);
    formData.append('metadata', JSON.stringify(uploadMetadata));

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsUploadModalOpen(false);
        setUploadFiles([]);
        setUploadMetadata([]);
        fetchImages();
      } else {
        toast.error(data.message || 'Failed to upload images');
      }
    } catch (error) {
      toast.error('An error occurred during upload');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/gallery/${imageId}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Image deleted successfully');
        fetchImages();
      } else {
        toast.error(data.message || 'Failed to delete image');
      }
    } catch (error) {
      toast.error('An error occurred while deleting image');
    }
  };

  const updateMetadata = (index: number, field: string, value: string) => {
    const newMetadata = [...uploadMetadata];
    newMetadata[index] = { ...newMetadata[index], [field]: value };
    setUploadMetadata(newMetadata);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6">
            <ImageIcon className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Gallery Management
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload, organize, and manage school gallery images
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Filter className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* Upload Button */}
              <button
                onClick={() => setIsUploadModalOpen(true)}
                className="bg-gradient-to-r from-green-400 to-green-500 text-black font-semibold py-3 px-6 rounded-lg hover:from-green-500 hover:to-green-600 transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-green-400/30"
              >
                <Plus className="h-5 w-5" />
                <span>Upload Images</span>
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-gray-300">
                {isLoading ? 'Loading...' : `Showing ${images.length} image${images.length !== 1 ? 's' : ''}`}
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Images Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden p-0">
                <div className="relative">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                      onClick={() => window.open(image.imageUrl, '_blank')}
                      className="bg-blue-500/80 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteImage(image.id)}
                      className="bg-red-500/80 text-white p-2 rounded-lg hover:bg-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      image.category === 'facilities' ? 'bg-blue-500 text-white' :
                      image.category === 'student-life' ? 'bg-green-500 text-white' :
                      image.category === 'academics' ? 'bg-purple-500 text-white' :
                      image.category === 'events' ? 'bg-yellow-500 text-black' :
                      image.category === 'sports' ? 'bg-red-500 text-white' :
                      'bg-pink-500 text-white'
                    }`}>
                      {image.category.charAt(0).toUpperCase() + image.category.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 truncate">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {image.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                    <span>{image.fileName}</span>
                  </div>
                  {image.tags && image.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {image.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setIsUploadModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Upload Images</h2>
                <button
                  onClick={() => setIsUploadModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* File Input */}
                <div>
                  <label className="block text-white mb-2">Select Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black"
                  />
                </div>

                {/* Category Selection */}
                <div>
                  <label className="block text-white mb-2">Category</label>
                  <select
                    value={selectedCategory === 'all' ? '' : selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Select Category</option>
                    {categories.slice(1).map((category) => (
                      <option key={category.id} value={category.id} className="bg-gray-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Metadata for each file */}
                {uploadFiles.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Image Details</h3>
                    {uploadFiles.map((file, index) => (
                      <div key={index} className="bg-white/5 rounded-lg p-4">
                        <h4 className="text-white font-medium mb-2">{file.name}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Title"
                            value={uploadMetadata[index]?.title || ''}
                            onChange={(e) => updateMetadata(index, 'title', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                          />
                          <input
                            type="text"
                            placeholder="Description"
                            value={uploadMetadata[index]?.description || ''}
                            onChange={(e) => updateMetadata(index, 'description', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                          />
                          <input
                            type="text"
                            placeholder="Tags (comma separated)"
                            value={uploadMetadata[index]?.tags?.join(', ') || ''}
                            onChange={(e) => updateMetadata(index, 'tags', e.target.value.split(',').map(t => t.trim()))}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                          />
                          <input
                            type="text"
                            placeholder="Photographer"
                            value={uploadMetadata[index]?.photographer || ''}
                            onChange={(e) => updateMetadata(index, 'photographer', e.target.value)}
                            className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <button
                  onClick={handleUpload}
                  disabled={isLoading || uploadFiles.length === 0 || selectedCategory === 'all'}
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="h-5 w-5" />
                      <span>Upload Images</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}