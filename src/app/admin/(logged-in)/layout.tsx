'use client';

import styles from './layout.module.css'

import { AdminSidebarProvider } from "@/providers";
import Logo from '@/components/logo';
import Sidebar from '@/components/admin/sidebar';
import Topbar from '@/components/admin/topbar';
import MainMenu from '@/components/admin/main-menu';
import UserMenu from '@/components/admin/user-menu';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminSidebarProvider>
        <div className={styles.adminLayout}>
          <Sidebar>
            <Logo href="/admin/dashboard" />
            <MainMenu />
            <UserMenu />
          </Sidebar>
          <div className={styles.mainArea}>
            <Topbar />
            <main className={styles.mainContent}>
              {children}
            </main>
          </div>
        </div>
      </AdminSidebarProvider>
    </>
  );
}
