import styles from './layout.module.css'

import Logo from '@/components/logo';
import Sidebar from '@/components/sidebar';
import MainMenu from '@/components/admin/main-menu';
import UserMenu from '@/components/admin/user-menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={styles.adminLayout}>
        <Sidebar>
          <Logo href="/admin/dashboard" />
          <MainMenu />
          <UserMenu />
        </Sidebar>
        <main className={styles.mainContent}>
          {children}
        </main>
      </div>
    </>
  );
}
