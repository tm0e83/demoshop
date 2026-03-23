import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import ScrollToTop from '@/components/scroll-to-top';
import Modal from '@/components/modal';
import { Providers } from '@/providers'
import ClientLayout from './client-layout'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DemoShop",
  description: "NextJS demo shop based on nextjs and firebase",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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

        <Providers>
          <ClientLayout>
            {children}
            <Modal />
          </ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
