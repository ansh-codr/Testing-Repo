'use client';

import { motion } from 'framer-motion';
import { Trophy, Star, Award, Medal, Calendar, Users } from 'lucide-react';
import GlassCard from '@/components/GlassCard';

export default function Achievements() {
  const achievements = [
    {
      id: 1,
      title: "Best Academic Performance",
      category: "Academic Excellence",
      year: "2024",
      description: "Recognized for outstanding academic results and innovative teaching methods",
      icon: <Star className="h-12 w-12 text-yellow-400" />,
      color: "from-yellow-400 to-yellow-600"
    },
    {
      id: 2,
      title: "Inter-School Sports Championship",
      category: "Sports",
      year: "2023",
      description: "Won the district level inter-school sports competition",
      icon: <Trophy className="h-12 w-12 text-blue-400" />,
      color: "from-blue-400 to-blue-600"
    },
    {
      id: 3,
      title: "Science Fair Excellence",
      category: "Science & Technology",
      year: "2024",
      description: "First place in regional science fair for innovative projects",
      icon: <Award className="h-12 w-12 text-green-400" />,
      color: "from-green-400 to-green-600"
    },
    {
      id: 4,
      title: "Cultural Program Winner",
      category: "Arts & Culture",
      year: "2023",
      description: "Outstanding performance in state level cultural competition",
      icon: <Medal className="h-12 w-12 text-purple-400" />,
      color: "from-purple-400 to-purple-600"
    },
    {
      id: 5,
      title: "Community Service Award",
      category: "Social Impact",
      year: "2024",
      description: "Recognized for exceptional community service and social initiatives",
      icon: <Users className="h-12 w-12 text-pink-400" />,
      color: "from-pink-400 to-pink-600"
    },
    {
      id: 6,
      title: "Digital Innovation Prize",
      category: "Technology",
      year: "2024",
      description: "Awarded for implementing cutting-edge digital learning solutions",
      icon: <Star className="h-12 w-12 text-cyan-400" />,
      color: "from-cyan-400 to-cyan-600"
    }
  ];

  const events = [
    {
      date: "March 15, 2024",
      title: "Annual Sports Day",
      description: "Celebrating athletic excellence and team spirit"
    },
    {
      date: "April 22, 2024",
      title: "Science Exhibition",
      description: "Showcasing innovative student projects and experiments"
    },
    {
      date: "May 10, 2024",
      title: "Cultural Fest",
      description: "Multi-cultural celebration with music, dance, and art"
    },
    {
      date: "June 5, 2024",
      title: "Academic Achievement Ceremony",
      description: "Honoring top performers and outstanding students"
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
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              Our Achievements
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Celebrating excellence in academics, sports, arts, and community service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${achievement.color}`} />
                  
                  <div className="flex justify-center mb-4">
                    {achievement.icon}
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-sm font-medium text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded-full">
                      {achievement.year}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {achievement.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-gray-300 mb-3">
                    {achievement.category}
                  </p>
                  
                  <p className="text-gray-400 text-sm">
                    {achievement.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay tuned for our exciting upcoming events and competitions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-yellow-400 mb-1">
                        {event.date}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Achievement Statistics</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our remarkable journey of success and recognition
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
                <p className="text-white">Awards Won</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                <p className="text-white">Sports Trophies</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
                <p className="text-white">Success Rate</p>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <GlassCard className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
                <p className="text-white">Competitions</p>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}