'use client';

import { useInitializeCart } from '@/hooks';
// import LoadingScreen from '@/components/loading-screen';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { isCartInitializing } = useInitializeCart();

  // if (isCartInitializing) return <LoadingScreen />;

  return <>{children}</>;
}
