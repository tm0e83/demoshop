import { createSlice } from '@reduxjs/toolkit';
import type { CategoryType } from '@typings';

type CategoryTypeState = {
  items: CategoryType[];
  current: CategoryType | null;
};

const initialState: CategoryTypeState = {
  items: [],
  current: null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: { 
    addCategory: (state, action: { type: string, payload: CategoryType }) => {
      state.items.push(action.payload);
    },
    removeCategory: (state, action: { type: string, payload: CategoryType['id'] }) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    editCategory: (state, action: { type: string, payload: CategoryType }) => {
      const index = state.items.findIndex((category) => category.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },    
    setCategory: (state, action: { type: string, payload: CategoryType | null }) => {
      state.current = action.payload;
    },
    setCategories: (state, action: { type: string, payload: CategoryType[] }) => {
      state.items = action.payload;
    }
  },
});

export default categorySlice;