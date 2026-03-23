'use client';

import type { RootState } from '@/store';

import { useEffect, useState } from 'react';
import { getProduct } from '@/services/firebase.service';
import { useDispatch } from 'react-redux';
import { productStore } from '@/store';
import { useSelector } from 'react-redux';

const useProduct = (productId: string) => {
  const [errorState, setErrorState] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!productId) {
      dispatch(productStore.setProduct(null));
      return;
    }

    dispatch(productStore.setProduct(null));

    getProduct(productId)
      .then(product => {
        dispatch(productStore.setProduct(product));
        setErrorState(null);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setErrorState(error.message);
      });
  }, [dispatch, productId]);

  const product = useSelector((state: RootState) => state.product.current);

  return {
    product,
    loading: false,
    error: errorState,
  }
}

export default useProduct;