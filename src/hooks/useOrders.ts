'use client';

import { getOrders } from '@/services/firebase.service';
import { orderStore, type RootState } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from '@/hooks';

const useOrders = () => {
  const dispatch = useDispatch();
  const { user } = useUser();     

  useEffect(() => {
    if (!user || user.role !== 'admin') return;  

    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        dispatch(orderStore.setOrders(ordersData));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [dispatch]);

  return {
    orders: useSelector((state: RootState) => state.order.items),
  };
};

export default useOrders;