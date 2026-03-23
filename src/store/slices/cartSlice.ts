import { createSlice } from '@reduxjs/toolkit';
import type { AddressType, CartItemType, CartType, DiscountType } from '@/typings';

const initialState: CartType = {
  billingAddress: null,
  items: [],
  paymentMethodId: '',
  shippingAddress: null,
  shippingMethodId: '',
  status: 'loading',
  discounts: [],
  orderPlaced: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setOrderPlaced: (state, action: { type: string, payload: boolean }) => {
      console.log(action);
      state.orderPlaced = action.payload;
    },

    addToCart: (state, action: { type: string, payload: CartItemType }) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeFromCart: (state, action: { type: string, payload: string }) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    
    updateQuantity: (state, action: { type: string, payload: { id: string, quantity: number } }) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
    
    setBillingAddress: (state, action: { type: string, payload: AddressType }) => {
      state.billingAddress = action.payload;
    },
    
    setShippingAddress: (state, action: { type: string, payload: AddressType }) => {
      state.shippingAddress = action.payload;
    },

    setPaymentMethodId: (state, action: { type: string, payload: string }) => {
      state.paymentMethodId = action.payload;
    },

    setShippingMethodId: (state, action: { type: string, payload: string }) => {
      state.shippingMethodId = action.payload;
    },

    addDiscount: (state, action: { type: string, payload: DiscountType }) => {
      state.discounts = [action.payload]; // allow only 1 for now
      // state.discounts = [...state.discounts, action.payload];
    },

    clearCart: (state) => {
      state.items = [];
      state.shippingMethodId = '';
      state.paymentMethodId = '';
      state.shippingAddress = null;
      state.billingAddress = null;
      state.discounts = [];
    },

    hydrateCart: (state, action: {
      type: string,
      payload: CartType
    }) => {
      state.items = action.payload.items;
      state.shippingMethodId = action.payload.shippingMethodId ?? '';
      state.paymentMethodId = action.payload.paymentMethodId ?? '';
      state.shippingAddress = action.payload.shippingAddress ?? null;
      state.billingAddress = action.payload.billingAddress ?? null;
      state.status = action.payload.status ?? 'loading';
      state.discounts = action.payload.discounts ?? [];
    },

    setCartReady: (state) => {
      state.status = 'ready';
    },
  },
});

export default cartSlice;