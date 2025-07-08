'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Building, Users, BookOpen, Trophy } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [images, setImages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = [
    { id: 'all', name: 'All Photos', icon: <Camera className="h-5 w-5" /> },
    { id: 'facilities', name: 'Facilities', icon: <Building className="h-5 w-5" /> },
    { id: 'student-life', name: 'Student Life', icon: <Users className="h-5 w-5" /> },
    { id: 'academics', name: 'Academics', icon: <BookOpen className="h-5 w-5" /> },
    { id: 'events', name: 'Events', icon: <Trophy className="h-5 w-5" /> },
  ];

  useEffect(() => {
    fetchImages();
  }, [activeFilter]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeFilter !== 'all') {
        params.append('category', activeFilter);
      }
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      const response = await fetch(`/api/gallery?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        setImages(data.data);
      } else {
        console.error('Failed to fetch images:', data.message);
        // Fallback to sample images if API fails
        setImages([
          {
            id: 1,
            category: 'facilities',
            title: 'Modern Computer Lab',
            description: 'State-of-the-art computer laboratory with latest technology',
            imageUrl: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            id: 2,
            category: 'student-life',
            title: 'Students in Action',
            description: 'Our students engaged in interactive learning',
            imageUrl: 'https://images.pexels.com/photos/8471937/pexels-photo-8471937.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            id: 3,
            category: 'events',
            title: 'Annual Sports Day',
            description: 'Celebrating athletic excellence and team spirit',
            imageUrl: 'https://images.pexels.com/photos/2068975/pexels-photo-2068975.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            id: 4,
            category: 'facilities',
            title: 'Science Laboratory',
            description: 'Well-equipped science lab for hands-on experiments',
            imageUrl: 'https://images.pexels.com/photos/2280547/pexels-photo-2280547.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            id: 5,
            category: 'academics',
            title: 'Classroom Learning',
            description: 'Interactive teaching methods in modern classrooms',
            imageUrl: 'https://images.pexels.com/photos/8471906/pexels-photo-8471906.jpeg?auto=compress&cs=tinysrgb&w=800'
          },
          {
            id: 6,
            category: 'student-life',
            title: 'Cultural Program',
            description: 'Students showcasing their talents in cultural events',
            imageUrl: 'https://images.pexels.com/photos/8471738/pexels-photo-8471738.jpeg?auto=compress&cs=tinysrgb&w=800'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    fetchImages();
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Camera className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our vibrant school life, modern facilities, and memorable moments
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Search photos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 ${
                    activeFilter === filter.id
                      ? 'bg-yellow-400 text-black shadow-lg shadow-yellow-400/30'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {filter.icon}
                  <span>{filter.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-gray-300">
              {isLoading ? 'Loading...' : `Showing ${images.length} photo${images.length !== 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="overflow-hidden p-0">
                  <div className="relative">
                    <img
                      src={photo.imageUrl}
                      alt={photo.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        photo.category === 'facilities' ? 'bg-blue-500 text-white' :
                        photo.category === 'student-life' ? 'bg-green-500 text-white' :
                        photo.category === 'academics' ? 'bg-purple-500 text-white' :
                        'bg-yellow-500 text-black'
                      }`}>
                        {photo.category.charAt(0).toUpperCase() + photo.category.slice(1).replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {photo.title}
                    </h3>
                    <p className="text-gray-300">
                      {photo.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* No Results */}
      {!isLoading && images.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <GlassCard>
            <div className="text-gray-400">
              <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No images found</h3>
              <p>Try adjusting your search or filter options</p>
            </div>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}