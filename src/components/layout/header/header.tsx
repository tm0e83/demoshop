'use client';

import { useState } from 'react';
import styles from './header.module.css';
import Logo from '@/components/logo';
import MainNav from './main-nav';
import UserNav from './user-nav';
import { useMediaQuery } from '@/hooks';

export default function Header() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 1100px)'); 

  return (
    <header className={styles.header}>
      <div className="container">
        <Logo />
        <MainNav
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          isDesktop={isDesktop} 
        />
        <UserNav
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
          isDesktop={isDesktop} 
        />
      </div>
    </header>
  );
};
