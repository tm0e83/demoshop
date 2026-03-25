'use client';

import styles from './main-menu.module.css';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink, House, Grid2x2, Tags, ShoppingBasket, Users } from 'lucide-react';
import { useAdminSidebar } from '@/providers';

type NavLinkType = {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export default function MainMenu() {
  const pathname = usePathname();
  const { isMinimized } = useAdminSidebar();

  const navLinks: NavLinkType[] = [
    { label: 'Storefront', href: '/', icon: <ExternalLink size={16} /> },
    { label: 'Dashboard', href: '/admin/dashboard', icon: <House size={16} /> },
    { label: 'Categories', href: '/admin/categories', icon: <Grid2x2 size={16} /> },
    { label: 'Products', href: '/admin/products', icon: <Tags size={16} /> },
    { label: 'Orders', href: '/admin/orders', icon: <ShoppingBasket size={16} /> },
    { label: 'Users', href: '/admin/users', icon: <Users size={16} /> },
  ];

  return (
    <div className={styles.mainMenu}>
      <ul>
        {navLinks.map(link => (
          <li key={link.label}>
            <Link href={link.href} className={clsx(link.href === pathname && styles.active)}>
              {isMinimized || <span>{link.label}</span>}
              {link.icon}
            </Link>
          </li>
        ))}
      </ul> 
    </div>
  );
};
