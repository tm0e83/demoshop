'use client';

import { useEffect, useState } from 'react';
import { getProducts } from '@/services/firebase.service';
import { useDispatch } from 'react-redux';
import { productStore } from '@/store';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const useProducts = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts()
      .then(products => dispatch(productStore.setProducts(products)))
      .catch(error => {
        console.error('Error fetching products:', error);
        setErrorState(error.message);
      })
      .finally(() => setLoadingState(false));
  }, [dispatch]);

  return {
    products: useSelector((state: RootState) => state.product.items),
    loading: loadingState,
    error: errorState,
  }
}

export default useProducts;