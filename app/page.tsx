'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Award, Users, BookOpen, GraduationCap, Star, Heart, Lightbulb, Phone, Mail, Instagram, Facebook, MessageCircle, Zap, Sparkles, Atom, Cpu, Database, Globe } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import ContactPopup from '@/components/ContactPopup';
import BookWireframe from '@/components/BookWireframe';

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const achievements = [
    {
      icon: <Cpu className="h-8 w-8 text-cyan-400" />,
      title: "Academic Excellence",
      description: "Outstanding academic performance",
      gradient: "from-cyan-400 to-blue-500"
    },
    {
      icon: <Database className="h-8 w-8 text-yellow-400" />,
      title: "Quality Education",
      description: "Comprehensive learning approach",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: <Globe className="h-8 w-8 text-pink-400" />,
      title: "Student Development",
      description: "Holistic growth and development",
      gradient: "from-pink-400 to-purple-500"
    },
    {
      icon: <Zap className="h-8 w-8 text-blue-400" />,
      title: "Modern Facilities",
      description: "State-of-the-art infrastructure",
      gradient: "from-blue-400 to-indigo-500"
    }
  ];

  const facilities = [
    { name: "Computer Lab", icon: <Cpu className="h-6 w-6" /> },
    { name: "Science Laboratory", icon: <Database className="h-6 w-6" /> }, 
    { name: "Library", icon: <BookOpen className="h-6 w-6" /> },
    { name: "Sports Complex", icon: <Zap className="h-6 w-6" /> },
    { name: "Art Room", icon: <Sparkles className="h-6 w-6" /> },
    { name: "Music Room", icon: <Globe className="h-6 w-6" /> }
  ];

  const socialLinks = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Call Us",
      value: "Contact Number",
      href: "#",
      color: "text-green-400",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      label: "WhatsApp",
      value: "Message Us",
      href: "#",
      color: "text-green-400",
      gradient: "from-green-400 to-teal-500"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      label: "Instagram",
      value: "Follow Us",
      href: "#",
      color: "text-pink-400",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      label: "Facebook",
      value: "Like Us",
      href: "#",
      color: "text-blue-400",
      gradient: "from-blue-400 to-indigo-500"
    }
  ];

  return (
    <div className="min-h-screen pt-16 relative">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - School Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* School Logo */}
              <motion.div 
                className="flex items-center space-x-4"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
              >
                <div className="w-20 h-20 relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 glow-border"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap className="h-10 w-10 text-white drop-shadow-2xl" />
                  </div>
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-orbitron font-bold holographic-text">
                    Dhruv Public School
                  </h1>
                  <p className="text-xl text-cyan-300 font-space font-medium glow-text">
                    Aring, Mathura
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-transparent to-purple-400/20 blur-xl" />
                <h2 className="relative text-2xl md:text-3xl font-space font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-yellow-400 to-purple-400">
                  "Where Learning Meets Vision"
                </h2>
              </motion.div>
              
              <motion.p 
                className="text-lg text-gray-300 leading-relaxed font-exo"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                Nurturing young minds with quality education, innovative teaching methods, and character development for a brighter future.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsContactOpen(true)}
                  className="golden-glow text-black font-orbitron font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Apply for Admission</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Book Wireframe */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <BookWireframe />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Quick Links */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-orbitron font-bold text-cyan-300 glow-text mb-6">Connect With Us</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card rounded-xl p-6 text-center hover:glow-border transition-all duration-300 relative overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${link.gradient} opacity-10`} />
                  <div className={`flex justify-center mb-3 ${link.color} relative z-10`}>
                    {link.icon}
                  </div>
                  <p className="text-sm font-space font-medium text-gray-300 relative z-10">{link.label}</p>
                  <p className="text-xs text-gray-400 relative z-10">{link.value}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Principal Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl mx-auto"
          >
            <GlassCard className="text-center relative overflow-hidden" glow={true}>
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5" />
              <motion.div 
                className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg glow-border relative z-10"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.8 }}
              >
                <Users className="h-16 w-16 text-white" />
              </motion.div>
              <h2 className="text-4xl font-orbitron font-bold text-cyan-300 glow-text mb-4 relative z-10">Principal's Message</h2>
              <h3 className="text-2xl font-space font-semibold text-yellow-400 mb-2 relative z-10">[Principal Name]</h3>
              <p className="text-gray-400 mb-6 font-exo relative z-10">[Qualifications]</p>
              <blockquote className="text-lg text-gray-300 italic leading-relaxed font-exo relative z-10 max-w-4xl mx-auto">
                "Welcome message from the principal about the school's vision, mission, and commitment to student excellence."
              </blockquote>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-cyan-300 glow-text mb-4">Why Choose Our School?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-exo text-lg">
              Excellence in education and holistic development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center h-full relative overflow-hidden" hover={true}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${achievement.gradient} opacity-10`} />
                  <motion.div 
                    className="flex justify-center mb-4 relative z-10"
                    whileHover={{ scale: 1.3, rotate: 15, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.icon}
                  </motion.div>
                  <h3 className="text-xl font-orbitron font-semibold text-cyan-300 mb-3 relative z-10">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-400 font-exo relative z-10">
                    {achievement.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-cyan-300 glow-text mb-4">Our Facilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-exo text-lg">
              Modern infrastructure supporting comprehensive education
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5" />
                  <motion.div
                    className="flex justify-center mb-3 text-cyan-400 relative z-10"
                    whileHover={{ scale: 1.3, rotate: 15, y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {facility.icon}
                  </motion.div>
                  <p className="text-gray-300 font-space font-medium relative z-10">{facility.name}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-orbitron font-bold text-cyan-300 glow-text mb-4">School Statistics</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "[Number]", label: "Students", color: "text-blue-400", gradient: "from-blue-400 to-cyan-500" },
              { number: "[Number]", label: "Teachers", color: "text-green-400", gradient: "from-green-400 to-emerald-500" },
              { number: "[Number]", label: "Years", color: "text-purple-400", gradient: "from-purple-400 to-pink-500" },
              { number: "[Rate]", label: "Success Rate", color: "text-yellow-400", gradient: "from-yellow-400 to-orange-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GlassCard className="text-center relative overflow-hidden" glow={true}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`} />
                  <motion.div 
                    className={`text-5xl font-orbitron font-bold ${stat.color} mb-3 glow-text relative z-10`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-300 font-space font-medium relative z-10">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <GlassCard glow={true} className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10" />
              <h2 className="text-4xl font-orbitron font-bold text-cyan-300 glow-text mb-6 relative z-10">Join Our School</h2>
              <p className="text-gray-400 mb-8 leading-relaxed font-exo text-lg relative z-10 max-w-3xl mx-auto">
                Be part of an institution that values excellence, innovation, and character building. 
                Give your child the foundation for a bright future.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                <motion.button
                  onClick={() => setIsContactOpen(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="golden-glow text-black font-orbitron font-bold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Get Information</span>
                  <ChevronRight className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glow-border text-cyan-300 font-orbitron font-semibold py-4 px-8 rounded-xl hover:bg-cyan-400/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-5 w-5" />
                  <span>Contact Us</span>
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}