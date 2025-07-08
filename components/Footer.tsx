'use client';

import { GraduationCap, Phone, Mail, Instagram, Facebook, MessageCircle, MapPin, Clock, Zap } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://instagram.com/dps_aring",
      label: "Instagram",
      color: "hover:text-pink-400"
    },
    {
      icon: <Facebook className="h-5 w-5" />,
      href: "https://facebook.com/dpsaring",
      label: "Facebook", 
      color: "hover:text-blue-400"
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      href: "https://wa.me/918532850782",
      label: "WhatsApp",
      color: "hover:text-green-400"
    }
  ];

  return (
    <footer className="relative z-10 glass-card border-t border-cyan-400/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* School Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-full flex items-center justify-center glow-border">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-orbitron font-bold text-cyan-300 glow-text">DPS Aring</span>
                <p className="text-sm text-gray-400 font-exo">Excellence in Education</p>
              </div>
            </div>
            <p className="text-gray-400 font-exo">
              Where Learning Meets Vision
            </p>
            <p className="text-gray-500 text-sm font-exo">
              Dhruv Public School Aring, Mathura - Where every child's potential is transformed into excellence.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-orbitron font-semibold text-cyan-300 glow-text">Contact Us</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="font-exo font-medium">8532850782</p>
                  <p className="text-sm font-exo">9997783484</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <div>
                  <p className="text-sm font-exo">dhruv.public.school.adeeng@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-cyan-400 mt-1" />
                <div>
                  <p className="text-sm font-exo">Dhruv Public School Aring</p>
                  <p className="text-sm font-exo">Mathura, Uttar Pradesh</p>
                </div>
              </div>
            </div>
          </div>

          {/* Principal Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-orbitron font-semibold text-cyan-300 glow-text">Leadership</h3>
            <div className="text-gray-400">
              <p className="font-exo font-medium text-gray-300">Mahesh Chand Yadav</p>
              <p className="text-sm text-cyan-400 font-exo font-medium">Principal</p>
              <p className="text-sm font-exo">B.Sc, B.Ed, M.A, Dip.in.Comp, LL.B</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-exo font-medium text-gray-300">Office Hours</h4>
              <div className="text-sm text-gray-400 space-y-1 font-exo">
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>Mon - Fri: 8:00 AM - 4:00 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-3 w-3" />
                  <span>Sat: 9:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-orbitron font-semibold text-cyan-300 glow-text">Quick Links</h3>
            <div className="space-y-2 text-sm">
              <a href="/about" className="block text-gray-400 hover:text-cyan-400 transition-colors font-exo">About Us</a>
              <a href="/gallery" className="block text-gray-400 hover:text-cyan-400 transition-colors font-exo">Photo Gallery</a>
              <a href="/achievements" className="block text-gray-400 hover:text-cyan-400 transition-colors font-exo">Achievements</a>
              <a href="/contact" className="block text-gray-400 hover:text-cyan-400 transition-colors font-exo">Contact</a>
              <a href="/portal/login" className="block text-gray-400 hover:text-cyan-400 transition-colors font-exo">Student Portal</a>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-exo font-medium text-gray-300">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 glass-card rounded-lg shadow-sm text-gray-400 transition-all duration-300 ${link.color} hover:shadow-md glow-border`}
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-cyan-400/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm font-exo">
                © 2024 Dhruv Public School Aring, Mathura. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-500 text-sm font-exo">
                🪄 Crafted with care by <span className="font-medium text-cyan-400">Havoc_Erebus</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}