'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, FileSpreadsheet, Search, TrendingUp, CheckCircle, AlertCircle, Clock, LogOut, Shield, Image as ImageIcon } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface Stats {
  totalStudents: number;
  classCounts: Record<string, number>;
  feeStats: Record<string, number>;
  attendanceStats: {
    excellent: number;
    good: number;
    needsImprovement: number;
  };
  lastUpdated: string;
}

interface HealthStatus {
  server: string;
  database: boolean;
  studentData: boolean;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Check admin authentication
    const adminAuth = localStorage.getItem('adminAuth');
    if (!adminAuth) {
      router.push('/admin/login');
      return;
    }

    setAdminInfo(JSON.parse(adminAuth));
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      // Fetch statistics
      const statsResponse = await fetch('/api/students/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData.stats);
      }

      // Fetch health status
      const healthResponse = await fetch('/api/health');
      if (healthResponse.ok) {
        const healthData = await healthResponse.json();
        setHealth(healthData.status);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast.success('Logged out successfully');
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

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
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {adminInfo?.email}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">System Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${health?.server === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">Server Status</span>
                <span className={`text-sm font-medium ${health?.server === 'running' ? 'text-green-600' : 'text-red-600'}`}>
                  {health?.server || 'Unknown'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${health?.database ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">Database</span>
                <span className={`text-sm font-medium ${health?.database ? 'text-green-600' : 'text-red-600'}`}>
                  {health?.database ? 'Connected' : 'Disconnected'}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${health?.studentData ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="text-gray-700">Student Data</span>
                <span className={`text-sm font-medium ${health?.studentData ? 'text-green-600' : 'text-red-600'}`}>
                  {health?.studentData ? 'Available' : 'Missing'}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/admin/upload">
              <GlassCard className="text-center cursor-pointer hover:shadow-lg transition-all duration-300">
                <FileSpreadsheet className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Upload Data</h3>
                <p className="text-gray-600">Upload new Excel file with student data</p>
              </GlassCard>
            </Link>

            <Link href="/admin/search">
              <GlassCard className="text-center cursor-pointer hover:shadow-lg transition-all duration-300">
                <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Search Students</h3>
                <p className="text-gray-600">Search and filter student records</p>
              </GlassCard>
            </Link>

            <Link href="/admin/gallery">
              <GlassCard className="text-center cursor-pointer hover:shadow-lg transition-all duration-300">
                <ImageIcon className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Gallery</h3>
                <p className="text-gray-600">Manage school photo gallery</p>
              </GlassCard>
            </Link>

            <Link href="/portal/login">
              <GlassCard className="text-center cursor-pointer hover:shadow-lg transition-all duration-300">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Portal</h3>
                <p className="text-gray-600">Access student login portal</p>
              </GlassCard>
            </Link>
          </div>
        </motion.div>

        {/* Statistics */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Overview Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <GlassCard className="text-center">
                  <div className="text-4xl font-bold text-indigo-600 mb-2">{stats.totalStudents}</div>
                  <p className="text-gray-700">Total Students</p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{stats.feeStats.Paid || 0}</div>
                  <p className="text-gray-700">Fees Paid</p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="text-4xl font-bold text-red-600 mb-2">{stats.feeStats.Pending || 0}</div>
                  <p className="text-gray-700">Fees Pending</p>
                </GlassCard>

                <GlassCard className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{Object.keys(stats.classCounts).length}</div>
                  <p className="text-gray-700">Classes</p>
                </GlassCard>
              </div>
            </div>

            {/* Class Distribution */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Class Distribution</h2>
              <GlassCard>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {Object.entries(stats.classCounts).map(([className, count]) => (
                    <div key={className} className="text-center">
                      <div className="text-2xl font-bold text-indigo-600 mb-1">{count}</div>
                      <p className="text-gray-700">Class {className}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Attendance Stats */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Attendance Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="text-center">
                  <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-green-600 mb-2">{stats.attendanceStats.excellent}</div>
                  <p className="text-gray-700">Excellent (90%+)</p>
                </GlassCard>

                <GlassCard className="text-center">
                  <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.attendanceStats.good}</div>
                  <p className="text-gray-700">Good (75-89%)</p>
                </GlassCard>

                <GlassCard className="text-center">
                  <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
                  <div className="text-3xl font-bold text-red-600 mb-2">{stats.attendanceStats.needsImprovement}</div>
                  <p className="text-gray-700">Needs Improvement (&lt;75%)</p>
                </GlassCard>
              </div>
            </div>

            {/* Last Updated */}
            <GlassCard>
              <div className="text-center">
                <p className="text-gray-600">
                  Data last updated: {new Date(stats.lastUpdated).toLocaleString()}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* No Data Message */}
        {!stats && !isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <GlassCard className="text-center">
              <FileSpreadsheet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Student Data Found</h3>
              <p className="text-gray-600 mb-6">Upload an Excel file to get started</p>
              <Link href="/admin/upload">
                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">
                  Upload Excel File
                </button>
              </Link>
            </GlassCard>
          </motion.div>
        )}
      </div>
    </div>
  );
}