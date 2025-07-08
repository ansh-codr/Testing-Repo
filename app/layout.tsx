import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dhruv Public School Aring - Where Learning Meets Vision',
  description: 'Excellence in education at Dhruv Public School Aring, Mathura. Nurturing young minds with quality education and character development.',
  keywords: 'school, education, Mathura, DPS Aring, quality education, CBSE',
  openGraph: {
    title: 'Dhruv Public School Aring - Where Learning Meets Vision',
    description: 'Excellence in education at Dhruv Public School Aring, Mathura',
    url: 'https://dpsaring.com',
    siteName: 'Dhruv Public School Aring',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </body>
    </html>
  );
}