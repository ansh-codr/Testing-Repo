'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { GraduationCap, Menu, X, ChevronDown, Zap } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Achievements', href: '/achievements' },
    { name: 'Contact', href: '/contact' },
    { 
      name: 'Admin', 
      href: '/admin/login',
      submenu: [
        { name: 'Login', href: '/admin/login' },
        { name: 'Dashboard', href: '/admin/dashboard' },
        { name: 'Upload Students', href: '/admin/upload' },
        { name: 'Search Students', href: '/admin/search' },
        { name: 'Gallery Management', href: '/admin/gallery' }
      ]
    },
    { name: 'Portal', href: '/portal/login' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-cyan-400/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg glow-border"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GraduationCap className="h-6 w-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg font-orbitron font-bold text-cyan-300 glow-text">DPS Aring</span>
              <span className="text-xs text-gray-400 hidden sm:block font-exo">Excellence in Education</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative">
                  {item.submenu ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setAdminDropdown(true)}
                      onMouseLeave={() => setAdminDropdown(false)}
                    >
                      <button
                        className={`px-4 py-2 rounded-lg text-sm font-exo font-medium transition-all duration-300 flex items-center space-x-1 ${
                          pathname.startsWith('/admin')
                            ? 'bg-cyan-400/20 text-cyan-300 glow-border'
                            : 'text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300'
                        }`}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      
                      {adminDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-1 w-48 glass-card border border-cyan-400/20 rounded-lg shadow-lg py-2"
                        >
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm font-exo text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`px-4 py-2 rounded-lg text-sm font-exo font-medium transition-all duration-300 ${
                        pathname === item.href
                          ? 'bg-cyan-400/20 text-cyan-300 glow-border'
                          : 'text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-300 transition-colors p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass-card border-t border-cyan-400/20"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-exo font-medium transition-all duration-300 ${
                    pathname === item.href || (item.submenu && pathname.startsWith('/admin'))
                      ? 'bg-cyan-400/20 text-cyan-300'
                      : 'text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-300'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="ml-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 py-2 rounded-md text-sm font-exo text-gray-400 hover:bg-cyan-400/10 hover:text-cyan-300 transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
}