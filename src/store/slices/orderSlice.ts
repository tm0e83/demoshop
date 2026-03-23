import { createSlice } from '@reduxjs/toolkit';
import type { OrderType } from '@/typings';

type OrderState = {
  items: OrderType[];
  current: OrderType | null;
};

const initialState: OrderState = {
  items: [],
  current: null,
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.current = action.payload;
    },    
    setOrders: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default orderSlice;