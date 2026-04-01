import styles from './SidebarMenu.module.css';

import Link from 'next/link';

export default function SidebarMenu() {
  return (
    <nav className={styles.sidebarMenu}>
      <ul>
        <li><Link href="/profile/overview">Profile</Link></li>
        <li><Link href="/profile/orders">Orders</Link></li>
        <li><Link href="/profile/addresses">Addresses</Link></li>
      </ul>
    </nav>
  );
};
