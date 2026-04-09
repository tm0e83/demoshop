import './globals.css';

import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local'
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/scroll-to-top';
import Modal from '@/components/modal';
import StoreProvider from '@/providers'
import ClientLayout from './client-layout'

const monaSans = localFont({
  src: [
    {
      path: '../assets/fonts/mona-sans-v4-latin-200.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-200italic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-300italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-500italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-600italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-700italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-800italic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-900.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../assets/fonts/mona-sans-v4-latin-900italic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-mona-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DemoShop',
  description: 'NextJS demo shop based on nextjs and firebase',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },  
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.variable} antialiased`}>
        <ScrollToTop />

        <ToastContainer
          position="bottom-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />

        <StoreProvider>
          <ClientLayout>
            {children}
            <Modal />
          </ClientLayout>
        </StoreProvider>     
      </body>
    </html>
  );
}
