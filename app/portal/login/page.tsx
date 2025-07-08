'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Zap, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default function StudentLogin() {
  const [formData, setFormData] = useState({
    studentId: '',
    passcode: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/student-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store student data in localStorage
        localStorage.setItem('studentData', JSON.stringify(data.student));
        
        toast.success('Login successful! Welcome back.', {
          position: 'top-right',
          autoClose: 3000,
        });
        
        // Redirect to dashboard
        router.push('/portal/dashboard');
      } else {
        toast.error(data.message || 'Invalid credentials. Please try again.', {
          position: 'top-right',
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div 
            className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 glow-border pulse-glow"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Sparkles className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold holographic-text mb-2">Student Portal</h1>
          <p className="text-gray-400 font-exo">Login to access your student information</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard glow={true}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="studentId" className="block text-sm font-exo font-medium text-gray-400 mb-2">
                  Student ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-cyan-400" />
                  </div>
                  <input
                    type="text"
                    name="studentId"
                    id="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 futuristic-input rounded-lg font-exo"
                    placeholder="Enter your student ID"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="passcode" className="block text-sm font-exo font-medium text-gray-400 mb-2">
                  Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-cyan-400" />
                  </div>
                  <input
                    type="password"
                    name="passcode"
                    id="passcode"
                    value={formData.passcode}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 futuristic-input rounded-lg font-exo"
                    placeholder="Enter your passcode"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full golden-glow text-black font-orbitron font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Login</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 font-exo">
                Forgot your passcode?{' '}
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Contact School Office
                </a>
              </p>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 font-exo">
            Back to{' '}
            <a href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
              School Website
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}