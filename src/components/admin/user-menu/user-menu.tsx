'use client';

import styles from './user-menu.module.css';

import { CircleUserRound, LogOut } from 'lucide-react';
import Button from '@/components/button';
import { useLogout, useUser } from '@/hooks';
import { useAdminSidebar } from '@/providers';

export default function UserMenu() {
  const { user } = useUser();
  const { isMinimized } = useAdminSidebar();
  const logout = useLogout({ redirectPath: '/admin/login' });

  return (
    <div className={styles.userMenu}>
      <ul>
        {isMinimized || (
          <li>
            <div className="d-flex align-items-center gap-1">
              <CircleUserRound />
              <span>{user?.email}</span>
            </div>
          </li>
        )}
        <li>
          {isMinimized ? (
            <Button onClick={logout} className="w-full" variant="text" title="Logout">
              <LogOut size={16} />
            </Button>
            ) : (
            <Button onClick={logout} className="w-full" title="Logout" Icon={LogOut}>
              Logout
            </Button>
            )
          }
        </li>  
      </ul> 
    </div>
  );
};
