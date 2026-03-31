import styles from './user-nav.module.css';
import Link from 'next/link';
import type { CartItemType } from '@/typings';
import { LogIn, Menu, Settings, ShoppingBasket, User } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { useCart, useUser } from '@/hooks';
import Button from '@/components/button';

type UserNavProps = {
  mainMenuOpen: boolean;
  setMainMenuOpen: (open: boolean) => void;
  isDesktop: boolean;
};
  
export default function UserNav({
  mainMenuOpen,
  setMainMenuOpen,
  isDesktop
}: UserNavProps) {
  const { user } = useUser();
  const cart = useCart();
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);  

  return (
    <nav className={styles.userNav}>
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
      {!isDesktop && (
        <Button
          title="Menu"
          variant="text"
          className={styles.openMenuButton}
          onClick={() => setMainMenuOpen(!mainMenuOpen)}
        >
          <Menu />
        </Button>      
      )}
    </nav>
  );
}