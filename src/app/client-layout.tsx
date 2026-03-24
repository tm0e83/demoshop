'use client';

import { useInitializeCart } from '@/hooks';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useInitializeCart();
  return <>{children}</>;
}
