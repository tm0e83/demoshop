
'use client';

import styles from './sidebar.module.css';
import { useEffect } from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMediaQuery } from '@/hooks';
import { useAdminSidebar } from '@/providers';
import Button from '@/components/button';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { isExpanded, isMinimized, setIsExpanded, toggleMinimized } = useAdminSidebar();

  useEffect(() => {
    setIsExpanded(isDesktop);
  }, [isDesktop]);  

  return (
    <aside className={clsx(styles.sidebar, isExpanded && styles.expanded, isMinimized && styles.minimized)}>
      {children}
      <Button 
        variant="hollow" 
        className={styles.toggleExpand} 
        onClick={toggleMinimized}
      >
        {isMinimized ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </Button>
    </aside>
  );
};
