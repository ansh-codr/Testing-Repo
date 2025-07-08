'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Book, Calendar, Award, Phone, Mail, MapPin, Zap, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

interface StudentData {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  dob: string;
  fatherName: string;
  motherName: string;
  phone: string;
  email: string;
  address: string;
  subjects: string[];
  attendance: string;
  fees: string;
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('studentData');
    if (storedData) {
      setStudentData(JSON.parse(storedData));
    } else {
      router.push('/portal/login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('studentData');
    router.push('/portal/login');
  };

  if (!studentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div 
          className="w-32 h-32 border-4 border-cyan-400 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  const personalInfo = [
    { label: 'Student ID', value: studentData.id },
    { label: 'Name', value: studentData.name },
    { label: 'Class', value: `${studentData.class} - ${studentData.section}` },
    { label: 'Roll Number', value: studentData.rollNo },
    { label: 'Date of Birth', value: studentData.dob },
    { label: 'Father\'s Name', value: studentData.fatherName },
    { label: 'Mother\'s Name', value: studentData.motherName },
  ];

  const contactInfo = [
    { icon: <Phone className="h-5 w-5 text-cyan-400" />, label: 'Phone', value: studentData.phone },
    { icon: <Mail className="h-5 w-5 text-cyan-400" />, label: 'Email', value: studentData.email },
    { icon: <MapPin className="h-5 w-5 text-cyan-400" />, label: 'Address', value: studentData.address },
  ];

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center glow-border"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <User className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-orbitron font-bold holographic-text">Welcome, {studentData.name}</h1>
              <p className="text-gray-400 font-exo">Class {studentData.class} - Section {studentData.section}</p>
            </div>
          </div>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors glow-border font-exo"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </motion.button>
        </motion.div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard glow={true}>
              <div className="flex items-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="h-8 w-8 text-cyan-400 mr-3" />
                </motion.div>
                <h2 className="text-2xl font-orbitron font-bold text-cyan-300 glow-text">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {personalInfo.map((info, index) => (
                  <motion.div 
                    key={index} 
                    className="border-b border-cyan-400/20 pb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <p className="text-sm font-exo font-medium text-gray-500 mb-1">{info.label}</p>
                    <p className="text-gray-300 font-exo">{info.value}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <GlassCard glow={true}>
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Calendar className="h-6 w-6 text-cyan-400 mr-2" />
                </motion.div>
                <h3 className="text-lg font-orbitron font-semibold text-cyan-300">Attendance</h3>
              </div>
              <div className="text-3xl font-orbitron font-bold text-yellow-400 glow-text">{studentData.attendance}</div>
              <p className="text-sm text-gray-400 font-exo">This Month</p>
            </GlassCard>

            <GlassCard glow={true}>
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Award className="h-6 w-6 text-cyan-400 mr-2" />
                </motion.div>
                <h3 className="text-lg font-orbitron font-semibold text-cyan-300">Fee Status</h3>
              </div>
              <div className="text-lg font-orbitron font-semibold text-green-400">{studentData.fees}</div>
              <p className="text-sm text-gray-400 font-exo">Current Status</p>
            </GlassCard>
          </motion.div>

          {/* Subjects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <GlassCard glow={true}>
              <div className="flex items-center mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Book className="h-6 w-6 text-cyan-400 mr-2" />
                </motion.div>
                <h3 className="text-lg font-orbitron font-semibold text-cyan-300">Subjects</h3>
              </div>
              <div className="space-y-2">
                {studentData.subjects.map((subject, index) => (
                  <motion.div 
                    key={index} 
                    className="glass-card rounded-lg p-3 glow-border"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <p className="text-gray-300 font-exo font-medium">{subject}</p>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <GlassCard glow={true}>
              <h3 className="text-lg font-orbitron font-semibold text-cyan-300 glow-text mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {info.icon}
                    </motion.div>
                    <div>
                      <p className="text-sm font-exo font-medium text-gray-500">{info.label}</p>
                      <p className="text-gray-300 font-exo">{info.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}