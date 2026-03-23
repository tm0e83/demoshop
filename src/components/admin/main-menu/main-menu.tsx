'use client';

import styles from './main-menu.module.css';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

type NavLinkType = {
  label: string;
  href: string;
}

export default function MainMenu() {
  const pathname = usePathname();

  const navLinks: NavLinkType[] = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Categories', href: '/admin/categories' },
    { label: 'Products', href: '/admin/products' },
    { label: 'Orders', href: '/admin/orders' },
    { label: 'Users', href: '/admin/users' },
  ];

  return (
    <div className={styles.mainMenu}>
      <ul>
        <li><Link href="/" target="_blank"><span>Storefront</span> <ExternalLink size={16} /></Link></li>
        {navLinks.map(link => (
          <li key={link.label}>
            <Link href={link.href} className={link.href === pathname ? styles.active : ''}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul> 
    </div>
  );
};
