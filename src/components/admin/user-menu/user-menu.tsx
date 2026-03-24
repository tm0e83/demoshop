'use client';

import styles from './user-menu.module.css';

import { CircleUserRound } from 'lucide-react';
import Button from '@/components/button';
import { useLogout, useUser } from '@/hooks';

export default function UserMenu() {
  const { user } = useUser();
  const logout = useLogout({ redirectPath: '/admin/login' });

  return (
    <div className={styles.userMenu}>
      <ul>
        <li>
          <div className="d-flex align-items-center gap-1">
            <CircleUserRound />
            <span>{user?.email}</span>
          </div>
        </li>
        <li><Button onClick={logout} className="w-full">Logout</Button></li>  
      </ul> 
    </div>
  );
};
