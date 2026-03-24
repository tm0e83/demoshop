
'use client';

import styles from './page.module.css';

import { useUser } from '@/hooks';
import PageTitle from '@/components/page-title';
import User from '@/components/admin/users/user';

export default function UserOverviewPage() {
  const { users } = useUser();

  return (
    <>
      <div className={styles.overview}>
        <PageTitle>Users</PageTitle>

        {users.length === 0 ? (
          <p>No user available.</p>
        ) : (
          <>
            <div className="users item-grid">
              <div className="item-grid-head">
                <div className="item">
                  <div className="item-column">Name</div>
                  <div className="item-column">Role</div>
                  <div className="item-column">ID</div>
                </div>
              </div>
              <div className="item-grid-body">
                {users.map(user => <User key={user.uid} user={user} />)}
              </div>
            </div>
          </>
        )}
      </div>      
    </>
  );
};
