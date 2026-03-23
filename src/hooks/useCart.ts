'use client';

import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

const useCart = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  const status = useSelector((state: RootState) => state.cart.status);
  const shippingMethodId = useSelector((state: RootState) => state.cart.shippingMethodId);
  const paymentMethodId = useSelector((state: RootState) => state.cart.paymentMethodId);
  const billingAddress = useSelector((state: RootState) => state.cart.billingAddress);
  const shippingAddress = useSelector((state: RootState) => state.cart.shippingAddress);
  const discounts = useSelector((state: RootState) => state.cart.discounts);
  const orderPlaced = useSelector((state: RootState) => state.cart.orderPlaced);

  return {
    items,
    status,
    shippingMethodId,
    paymentMethodId,
    billingAddress,
    shippingAddress,
    discounts,
    orderPlaced
  };
};

export default useCart;