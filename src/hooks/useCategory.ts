'use client';

import type { CategoryType } from '@/typings';
import type { RootState } from '@/store';

import { useEffect, useState } from 'react';
import { getCategory } from '@/services/firebase.service';
import { useDispatch, useSelector } from 'react-redux';
import { categoryStore } from '@/store';

const useCategory = (categoryId: CategoryType['id']) => {
  const [ loadingState, setLoadingState ] = useState(false);
  const [ errorState, setErrorState ] = useState<string | null>(null);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId) {
      getCategory(categoryId)
        .then(category => dispatch(categoryStore.setCategory(category)))
        .catch(error => {
          console.error('Error fetching category data:', error);
          setErrorState(error.message);
        })
        .finally(() => setLoadingState(false));
    }
  }, [categoryId, dispatch]);

  return { 
    category: useSelector((state: RootState) => state.category.current),
    loading: loadingState,
    error: errorState,
  };
}

export default useCategory;