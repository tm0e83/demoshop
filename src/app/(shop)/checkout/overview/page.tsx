'use client';

import styles from './page.module.css';

import type { CartItemType, OrderType } from '@/typings';
import { push, ref, serverTimestamp } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { saveOrder } from '@/services/firebase.service';
import { ArrowLeft, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { database } from '@/config/firebase';
import { useCart, useUser, usePaymentMethods, useShippingMethods } from '@/hooks';
import Address from '@/components/address';
import Button from '@/components/button';
import CartItem from '@/components/cart-item';
import CheckoutSummary from '@/components/checkout-summary';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';
import { cartStore } from '@/store';

export default function CheckoutOrderOverviewPage() {
  const cart = useCart();
  const dispatch = useDispatch();
  const user = useUser().user;
  const paymentMethods = usePaymentMethods();
  const shippingMethods = useShippingMethods();
  const router = useRouter();

  const handleSubmitOrder = async () => {
    const orderId = push(ref(database, 'temp')).key;
    dispatch(cartStore.setOrderPlaced(true));

    await saveOrder({   
      items: cart.items,
      shippingMethodId: cart.shippingMethodId,
      paymentMethodId: cart.paymentMethodId,
      billingAddress: cart.billingAddress,
      shippingAddress: cart.shippingAddress,
      discounts: cart.discounts,
      orderPlaced: cart.orderPlaced,
      createdAt: serverTimestamp(),
      id: orderId,
      status: cart.paymentMethodId === 'paypal' ? 'paid' : 'pending',
      uid: user?.uid ?? ''
    } as OrderType);

    router.push('/checkout/thank-you');

    toast.success(<span>Your order has been sent</span>);
  };

  return (
    <div className={styles.overview}>
      <PageTitle center={true}>Order Overview</PageTitle>

      <div className={styles.overviewContent}>
        <div className={styles.summary}>
          <div className={styles.addresses}>
            <div className={styles.shippingAddress}>
              <Title level={2}>Delivery address</Title>
              {cart.shippingAddress && <Address address={cart.shippingAddress} />}
            </div>
            <div className={styles.billingAddress}>
              <Title level={2}>Billing address</Title>
              {cart.billingAddress && <Address address={cart.billingAddress} />}
            </div>
          </div>

          <div className={styles.shipping}>
            <Title level={2}>Shipping</Title>
            <div>{shippingMethods.find(method => method.id === cart.shippingMethodId)?.name}</div>
          </div>

          <div className={styles.payment}>
            <Title level={2}>Payment</Title>
            <div>{paymentMethods.find(method => method.id === cart.paymentMethodId)?.name}</div>
          </div>

          <div className={styles.items}>
            <Title level={2}>Products</Title>
            <div className={styles.itemList}>
              {cart.items.map((cartItem: CartItemType) => <CartItem key={cartItem.id} cartItem={cartItem} />)}
            </div>
          </div>
        </div>
        <CheckoutSummary />
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/checkout/payment">
          <Button color="secondary" Icon={ArrowLeft}> Zurück</Button>
        </Link>
        <Button onClick={handleSubmitOrder} Icon={Check} iconAlign="right">Buy now</Button>
      </div>
    </div>
  );
};
