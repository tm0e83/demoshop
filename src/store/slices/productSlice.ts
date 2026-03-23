import { createSlice } from '@reduxjs/toolkit';
import type { ProductType } from '@/typings';

type ProductState = {
  items: ProductType[];
  current: ProductType | null;
};

const initialState: ProductState = {
  items: [],
  current: null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: { type: string, payload: ProductType[] }) => {
      state.items = action.payload;
    },
    addProduct: (state, action: { type: string, payload: ProductType }) => {
      state.items.push(action.payload);
    },
    editProduct: (state, action: { type: string, payload: ProductType }) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setProduct: (state, action: { type: string, payload: ProductType | null }) => {
      state.current = action.payload;
    }, 
  },
});

export default productSlice;