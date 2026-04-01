import styles from './layout.module.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={styles.homeLayout}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
}
