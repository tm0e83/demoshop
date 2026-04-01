'use client';

import Button from '@/components/button';
import Card from '@/components/card/card';
import { useLogout, useUser } from '@/hooks';

export default function ProfileOverviewPage() {
  const { user } = useUser();
  const logout = useLogout({ redirectPath: '/login' });

  return (
    <>
      <div className="profile-overview-page">
        <Card>
          <div>
            <strong>Account ID:</strong><br />
            {user?.uid}
          </div>
          <br />
          <div>
            <strong>Firstname / lastname:</strong><br />
            {user?.firstname} {user?.lastname}
          </div>
          <br />
          <div>
            <strong>Date of birth:</strong><br />
            {user?.birthdate}
          </div>
          <br />
          <div>
            <strong>Email</strong><br />
            {user?.email}
          </div>
          <br></br>
          <Button onClick={logout}>Logout</Button>
        </Card>
      </div>
    </>
  );
};
