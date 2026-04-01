import '../../globals.css';
import styles from './layout.module.css';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className="container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
