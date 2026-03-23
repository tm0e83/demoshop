'use client';
import styles from './header.module.css';
import type { CartItemType } from '@/typings';
import { LogIn, Settings, ShoppingBasket, User } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { useSyncExternalStore } from 'react';
import { useCart, useCategories, useUser } from '@/hooks';

export default function Header() {
  const { user } = useUser();
  const { categories } = useCategories();
  const cart = useCart();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Logo />
        <nav className={`nav ${styles.categoryNav}`}>
          {categories &&
            categories.map(category => (
              <Link key={category.id} href={`/category/${category.id}`}>{category.title}</Link>
            ))}
        </nav>
        <nav className="nav user-nav">
          {user?.role === 'admin' && <Link href={'/admin'} title="Administration"><Settings /></Link>}
          {user?.uid ? (
            <Link href={'/profile'} title="Profile"><User /></Link>
          ) : (
            <Link href={'/login'} title="Login"><LogIn /></Link>
          )}
          <Link href={'/cart'} title="Cart" className={styles.cartLink}>
            <ShoppingBasket />
            {mounted && cart.status === 'ready' && cart.items.length > 0 && (
              <span className={`${styles.cartCount} badge`}>
                {cart.items.reduce((acc: number, item: CartItemType) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

