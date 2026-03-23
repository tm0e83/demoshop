import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './slices/cartSlice';
import categorySlice from './slices/categorySlice';
import modalSlice from './slices/modalSlice';
import orderSlice from './slices/orderSlice';
import productSlice from './slices/productSlice';
import userSlice from './slices/userSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      cart: cartSlice.reducer,
      category: categorySlice.reducer,
      product: productSlice.reducer,
      modal: modalSlice.reducer,
      order: orderSlice.reducer,
      user: userSlice.reducer,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;

export const cartStore = cartSlice.actions;
export const categoryStore = categorySlice.actions;
export const productStore = productSlice.actions;
export const modalStore = modalSlice.actions;
export const orderStore = orderSlice.actions;
export const userStore = userSlice.actions;