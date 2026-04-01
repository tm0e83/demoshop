'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@/components/card';
import Title from '@/components/title';
import { cartStore } from '@/store';
import { useUser, useCart } from '@/hooks';

export default function CheckoutThankYouPage() {
  const { user } = useUser();
  const { orderPlaced } = useCart();
  const dispatch = useDispatch();

  useEffect(() => {
    if (orderPlaced === true) {
      dispatch(cartStore.clearCart());
    }
  }, [dispatch, orderPlaced]);

  return (
    <div className="checkout-thank-you-page">
      <Title>Thank You</Title>

      <Card>
        <p>Thank you for your order, {user?.firstname}! Your order has been received and is being processed.</p>
        <p>We will send you an email confirmation shortly with the details of your order. If you have any questions, feel free to contact our support team.</p>
      </Card>
    </div>
  );
};
