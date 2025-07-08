'use client';

import { motion } from 'framer-motion';
import { Target, Eye, Users, BookOpen, Award, Heart } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function About() {
  const values = [
    {
      icon: <Target className="h-8 w-8 text-yellow-400" />,
      title: "Excellence",
      description: "Striving for the highest standards in education and character development"
    },
    {
      icon: <Heart className="h-8 w-8 text-yellow-400" />,
      title: "Compassion",
      description: "Fostering empathy and understanding in our students"
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-400" />,
      title: "Community",
      description: "Building strong relationships between students, teachers, and parents"
    },
    {
      icon: <BookOpen className="h-8 w-8 text-yellow-400" />,
      title: "Innovation",
      description: "Embracing modern teaching methods and technology"
    }
  ];

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
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              About Our School
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Dhruv Public School Aring has been a beacon of educational excellence, 
              shaping young minds and building character for the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center mb-6">
                  <Target className="h-12 w-12 text-yellow-400 mr-4" />
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To provide quality education that develops critical thinking, creativity, and 
                  character in our students, preparing them to be responsible global citizens 
                  who contribute positively to society.
                </p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="h-full">
                <div className="flex items-center mb-6">
                  <Eye className="h-12 w-12 text-yellow-400 mr-4" />
                  <h2 className="text-3xl font-bold text-white">Our Vision</h2>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  To be a leading educational institution that nurtures innovative thinkers, 
                  ethical leaders, and compassionate individuals who will shape a better 
                  tomorrow for our world.
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Profile */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard>
              <div className="text-center mb-8">
                <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <Users className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Mahesh Chand Yadav</h2>
                <p className="text-xl text-yellow-400 mb-4">Principal</p>
                <p className="text-gray-300 mb-6">B.Sc, B.Ed, M.A, Dip.in.Comp, LL.B</p>
              </div>
              
              <div className="space-y-6 text-gray-300">
                <p className="text-lg leading-relaxed">
                  With over two decades of experience in education, Mr. Mahesh Chand Yadav 
                  brings a wealth of knowledge and passion to Dhruv Public School. His diverse 
                  academic background and commitment to excellence have been instrumental in 
                  shaping the school's educational philosophy.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Under his leadership, the school has achieved remarkable milestones in academic 
                  performance, co-curricular activities, and character development. His vision 
                  of holistic education continues to inspire both students and faculty.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at Dhruv Public School
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-300">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Numbers that reflect our commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">500+</div>
                <p className="text-white text-lg">Students</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50+</div>
                <p className="text-white text-lg">Faculty Members</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">95%</div>
                <p className="text-white text-lg">Success Rate</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}