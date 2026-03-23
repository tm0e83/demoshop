'use client';

import type { OrderType } from '@/typings';
import type { RootState } from '@/store';

import { useEffect, useState } from 'react';
import { getOrder } from '@/services/firebase.service';
import { useDispatch, useSelector } from 'react-redux';
import { orderStore } from '@/store';

const useOrder = (orderId: OrderType['id']) => {
  const [ loadingState, setLoadingState ] = useState(false);
  const [ errorState, setErrorState ] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderId) {
      getOrder(orderId)
        .then(order => dispatch(orderStore.setOrder(order)))
        .catch(error => {
          console.error('Error fetching order data:', error);
          setErrorState(error.message);
        })
        .finally(() => setLoadingState(false));
    }
  }, [orderId, dispatch]);

  return { 
    order: useSelector((state: RootState) => state.order.current),
    loading: loadingState,
    error: errorState,
  };
}

export default useOrder;