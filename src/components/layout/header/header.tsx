'use client';

import { useState } from 'react';
import styles from './header.module.css';
import Logo from '@/components/logo';
import MainNav from './main-nav';
import UserNav from './user-nav';

export default function Header() {
  const [mainMenuOpen, setMainMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className="container">
        <Logo />
        <MainNav
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
        />
        <UserNav
          mainMenuOpen={mainMenuOpen}
          setMainMenuOpen={setMainMenuOpen}
        />
      </div>
    </header>
  );
};
