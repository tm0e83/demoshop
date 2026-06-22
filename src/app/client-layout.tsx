'use client';

import Script from 'next/script';
import { useInitializeCart } from '@/hooks';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useInitializeCart();
  return <>
    {children}
    <Script
      src="https://chat-1e4a5.web.app/widget.iife.js"
      data-tenant-id="q9O2tyWZOkKJVdGzKcSz"
      strategy="lazyOnload"
    />
  </>;
}
