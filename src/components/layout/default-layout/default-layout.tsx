import styles from './default-layout.module.css';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
type DefaultLayoutProps = {
  children: React.ReactNode;
};
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className={styles.defaultLayout}>
        <Header />
        <main className="container">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

