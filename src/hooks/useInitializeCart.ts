'use client';

import type { RootState } from '@/store';
import type { CartType } from '@/typings';

import { cartStore } from '@/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_STORAGE_KEY } from '@/constants';

const useInitializeCart = () => {
  const dispatch = useDispatch();
  const status = useSelector((state: RootState) => state.cart.status);
  const items = useSelector((state: RootState) => state.cart.items);
  const shippingMethodId = useSelector((state: RootState) => state.cart.shippingMethodId);
  const paymentMethodId = useSelector((state: RootState) => state.cart.paymentMethodId);
  const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress);
  const billingAddress = useSelector((state: RootState) => state.cart.billingAddress);
  const discounts = useSelector((state: RootState) => state.cart.discounts);
  const orderPlaced = useSelector((state: RootState) => state.cart.orderPlaced);

  useEffect(() => {
    if (status !== 'loading') {
      return;
    }

    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart) as CartType;

        dispatch(
          cartStore.hydrateCart({
            items: parsedCart.items ?? [],
            shippingMethodId: parsedCart.shippingMethodId ?? '',
            paymentMethodId: parsedCart.paymentMethodId ?? '',
            shippingAddress: parsedCart.shippingAddress ?? null,
            billingAddress: parsedCart.billingAddress ?? null,
            status: parsedCart.status ?? 'loading',
            discounts: parsedCart.discounts ?? [],
            orderPlaced: parsedCart.orderPlaced
          })
        );
      }
    } catch {
      // leave cart empty if parsing fails
    } finally {
      dispatch(cartStore.setCartReady());
    }
  }, [dispatch, status]);

  useEffect(() => {
    if (status !== 'ready') {
      return;
    }

    if (items.length === 0) {
      localStorage.removeItem(CART_STORAGE_KEY);
      return;
    }

    const cartState: CartType = {
      items,
      shippingMethodId,
      paymentMethodId,
      shippingAddress,
      billingAddress,
      status: 'ready',
      discounts,
      orderPlaced
    };

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
  }, [
    billingAddress,
    items,
    orderPlaced,
    paymentMethodId,
    shippingAddress,
    shippingMethodId,
    status,
    discounts
  ]);

  return {
    isCartInitializing: status === 'loading',
  };
};

export default useInitializeCart;
