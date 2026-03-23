'use client';

import type { RootState } from '@/store';

import { useEffect, useState } from 'react';
import { getProductsByCategory } from '@/services/firebase.service';
import { useDispatch, useSelector } from 'react-redux';
import { productStore } from '@/store';

const useCategoryProducts = (categoryId: string | undefined) => {
  const [loadingState, setLoadingState] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!categoryId) return;

    const fetchCategoryProducts = async () => {
      setLoadingState(true);
      setErrorState(null);

      try {
        const products = await getProductsByCategory(categoryId);
        dispatch(productStore.setProducts(products));
      } catch (error) {
        console.error('Error fetching category products:', error);
        setErrorState(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoadingState(false);
      }
    };

    fetchCategoryProducts();
  }, [categoryId, dispatch]);

  return { 
    products: useSelector((state: RootState) => state.product.items),
    loading: loadingState,
    error: errorState 
  };
}

export default useCategoryProducts;