import styles from './main-nav.module.css';
import { X } from 'lucide-react';
import { useCategories } from '@/hooks';
import Link from 'next/link';
import clsx from 'clsx';
import Button from '@/components/button';

type MainNavProps = {
  mainMenuOpen: boolean;
  setMainMenuOpen: (open: boolean) => void;
  isDesktop: boolean;
};

export default function MainNav({ 
  mainMenuOpen,
  setMainMenuOpen,
  isDesktop 
}: MainNavProps) {
  const { categories } = useCategories();

  return (
    <nav className={
      clsx(styles.mainNav, {
        [styles.open]: mainMenuOpen && !isDesktop,
        [styles.mobile]: !isDesktop,
        [styles.desktop]: isDesktop,
      })}>
      {categories &&
        categories.map(category => (
          <Link key={category.id} href={`/category/${category.id}`}>{category.title}</Link>
        ))
      }

      <Button 
        variant="text"
        className={styles.closeMenuButton}
        onClick={() => setMainMenuOpen(false)}
      >
        <X />
      </Button>
    </nav>
  );
}