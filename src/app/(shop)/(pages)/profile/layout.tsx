'use client';

import styles from './layout.module.css';
import { usePathname } from 'next/navigation';
import SidebarMenu from './SidebarMenu';
import PageTitle from '@/components/page-title';

type PageTitleMapping = {
  [key: string]: string;
}

const profileTitleMap: PageTitleMapping = {
  '/profile/overview': 'Profile Overview',
  '/profile/orders': 'Your Orders',
  '/profile/addresses': 'Your Addresses',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const getTitle = (): string => {
    if (profileTitleMap[pathname]) {
      return profileTitleMap[pathname];
    } else if (pathname.match(/^\/profile\/orders\/.*$/)) {
      return 'Order details';
    }
    return '';
  }

  return (
    <>
      <div className={styles.layout}>
        {getTitle() && <PageTitle>{getTitle()}</PageTitle>}
        <div className={styles.columns}>
          <div className={styles.columnLeft}>{children}</div>
          <div className={styles.columnRight}>{<SidebarMenu />}</div>
        </div>
      </div>
    </>
  );
}
