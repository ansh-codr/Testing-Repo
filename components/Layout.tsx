'use client';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
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