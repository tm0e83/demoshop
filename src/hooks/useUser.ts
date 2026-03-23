'use client';

import type { RootState } from '@/store';
import type { UserType } from '@/typings';

import { auth } from '@/config/firebase';
import { getUser } from '@/services/firebase.service';
import { userStore } from '@/store';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/services/firebase.service';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

const useUser = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user?.uid && user?.email) {
        const userData = await getUser(user.uid);
        dispatch(userStore.setUser(userData));
        setStatus('authenticated');
      } else {
        dispatch(userStore.setUser(null));
        setStatus('unauthenticated');
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      dispatch(userStore.setUsers([]));
      return;
    }

    getUsers().then((users: UserType[]) => dispatch(userStore.setUsers(users)));
  }, [dispatch, user]);

  return {
    user: useSelector((state: RootState) => state.user.user),
    users: useSelector((state: RootState) => state.user.users),
    status
  };
};

export default useUser;