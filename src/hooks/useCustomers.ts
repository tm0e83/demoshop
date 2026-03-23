'use client';

import type { UserType } from '@/typings';

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks';
import { getCustomers } from '@/services/firebase.service';

const useCustomers = () => {
  const { user } = useUser();
  const [customers, setCustomers] = useState<UserType[]>([]);

  useEffect(() => {
    if (user?.role !== 'admin') {
      return;
    }

    getCustomers().then((userArr: UserType[]) => setCustomers(userArr));
  }, [user?.role])

  return {
    customers: customers
  }
};

export default useCustomers;