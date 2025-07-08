'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Shield, Eye, EyeOff, Zap } from 'lucide-react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import GlassCard from '@/components/GlassCard';

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Authorized admin emails
  const authorizedEmails = [
    'admin@dpsaring.com',
    'principal@dpsaring.com',
    'dhruv.public.school.adeeng@gmail.com',
    'maheshyadav@dpsaring.com'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if email is authorized
      if (!authorizedEmails.includes(formData.email.toLowerCase())) {
        toast.error('Unauthorized email address. Please contact the school administration.', {
          position: 'top-right',
          autoClose: 5000,
        });
        setIsLoading(false);
        return;
      }

      // Simulate authentication (replace with actual authentication)
      if (formData.password === 'dpsaring2024' || formData.password === 'admin123') {
        // Store admin session
        localStorage.setItem('adminAuth', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString(),
          role: 'admin'
        }));
        
        toast.success('Login successful! Welcome to Admin Dashboard.', {
          position: 'top-right',
          autoClose: 3000,
        });
        
        // Redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        toast.error('Invalid password. Please try again.', {
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
            className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center mb-6 shadow-lg glow-border pulse-glow"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Shield className="h-12 w-12 text-white" />
          </motion.div>
          <h1 className="text-3xl font-orbitron font-bold holographic-text mb-2">Admin Portal</h1>
          <p className="text-gray-400 font-exo">Secure access for authorized personnel only</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <GlassCard glow={true}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-exo font-medium text-gray-400 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-cyan-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 futuristic-input rounded-lg font-exo"
                    placeholder="Enter your authorized email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-exo font-medium text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-cyan-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-12 py-3 futuristic-input rounded-lg font-exo"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-400"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full golden-glow text-black font-orbitron font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <motion.div 
                      className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Authenticating...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    <span>Login to Dashboard</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <div className="glass-card border border-blue-400/30 rounded-lg p-4">
                <h4 className="text-sm font-exo font-medium text-blue-400 mb-2">Authorized Personnel Only</h4>
                <p className="text-xs text-gray-500 font-exo">
                  Access is restricted to authorized school administrators and staff members only.
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 font-exo">
                Need access?{' '}
                <a href="mailto:dhruv.public.school.adeeng@gmail.com" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Contact Administration
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