'use client';

import styles from './admin-info.module.css';
import Title from '@/components/title';
import { useUser } from '@/hooks';

export default function AdminInfo() {
  const { user } = useUser();

  if (user?.id) return null;

  return (
    <div className={styles.adminInfo}>
      <Title level={3}>Admin credentials for testing</Title>
      <p>
        User: test@demoshop.com<br />
        Password: demo2026
      </p>
    </div>
  )
}