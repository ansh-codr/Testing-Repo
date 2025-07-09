'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import StarField from './StarField';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();
  const isPortalPage = pathname?.startsWith('/portal');

  useEffect(() => {
    // Check if Firebase environment variables are loaded
    const requiredEnvVars = [
      'NEXT_PUBLIC_FIREBASE_API_KEY',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_APP_ID'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    if (missingEnvVars.length > 0 && process.env.NODE_ENV === 'development') {
      console.warn('⚠️ Missing Firebase environment variables:', missingEnvVars);
      console.warn('Please check your .env file in the root directory');
    }
  }, []);

  return (
    <div className={`${inter.className} relative min-h-screen overflow-x-hidden`}>
      <StarField />
      <div className="relative z-10">
        {!isPortalPage && <Navbar />}
        <main className="relative">
          {children}
        </main>
        {!isPortalPage && <Footer />}
      </div>
    </div>
  );
}