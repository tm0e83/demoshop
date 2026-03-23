'use client';

import { useEffect } from 'react';
import { getCategories } from '@/services/firebase.service';
import { useDispatch, useSelector } from 'react-redux';
import { categoryStore } from '@/store';
import type { RootState } from '@/store';
import type { CategoryType } from '@/typings';

const useCategories = (): {categories: CategoryType[] } => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        dispatch(categoryStore.setCategories(categoryData));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  return {
    categories: useSelector((state: RootState) => state.category.items),
  };
}

export default useCategories;