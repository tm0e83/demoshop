'use client';

import { getUserOrders } from '@/services/firebase.service';
import { orderStore, type RootState } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useUserOrders = (userId: string | undefined) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(userId ?? '');
        dispatch(orderStore.setOrders(ordersData));
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [dispatch, userId]);

  return {
    orders: useSelector((state: RootState) => state.order.items),
  };
};

export default useUserOrders;