'use client';

import styles from './topbar.module.css';
import { Menu, X } from 'lucide-react';
import Button from '@/components/button';
import { useAdminSidebar } from '@/providers';

export default function Topbar() {
  const { isExpanded, toggleSidebar } = useAdminSidebar();

  return (
    <div className={styles.topbar}>
      <Button
        Icon={isExpanded ? X : Menu}
        size="small"
        variant="hollow"
        onClick={toggleSidebar}
      />
    </div>
  );
};
