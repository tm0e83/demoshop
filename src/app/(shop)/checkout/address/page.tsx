'use client';

import styles from './page.module.css';

import type { AddressType } from '@/typings';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart, useUser } from '@/hooks';
import { cartStore } from '@/store';
import Address from '@/components/address';
import Button from '@/components/button';
import Card from '@/components/card';
import CheckoutSummary from '@/components/checkout-summary';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';

export default function CheckoutAddressPage() {
  const cart = useCart();
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      return;
    }

    const defaultAddressId = Object.keys(user.addresses)[0];

    if (!defaultAddressId) {
      return;
    }

    if (!cart.shippingAddress) {
      const shippingAddressId = user.defaultShippingAddress ?? defaultAddressId;
      dispatch(cartStore.setShippingAddress(user.addresses[shippingAddressId]));
    }

    if (!cart.billingAddress) {
      const billingAddressId = user.defaultBillingAddress ?? defaultAddressId;
      dispatch(cartStore.setBillingAddress(user.addresses[billingAddressId]));
    }
  }, [user, cart.shippingAddress, cart.billingAddress, dispatch]);

  const handleShippingAddressChange = (shippingAddress: AddressType | null) => {
    if (shippingAddress) {
      dispatch(cartStore.setShippingAddress(shippingAddress))
    }
  };

  const handleBillingAddressChange = (billingAddress: AddressType | null) => {
    if (billingAddress) {
      dispatch(cartStore.setBillingAddress(billingAddress))
    }
  };

  return (
    <div className={styles.address}>
      <PageTitle center={true}>Addresses</PageTitle>

      <div className={styles.addressContent}>
        <div className={`${styles.addresses}`}>
          <div className={styles.shippingAddresses}>
            <Title level={2}>Delivery address</Title>
            <div className={styles.addressContainer}>
              <div><input type="radio" checked onChange={() => handleShippingAddressChange(cart.shippingAddress)} /></div>
              {cart.shippingAddress && <Address address={cart.shippingAddress} />}
            </div>
          </div>
          <div className={styles.billingAddresses}>
            <Title level={2}>Billing address</Title>
            <div className={styles.addressContainer}>
              <div><input type="radio" checked onChange={() => handleBillingAddressChange(cart.billingAddress)} /></div>
              {cart.billingAddress && <Address address={cart.billingAddress} />}
            </div>
          </div>
        </div>

        <CheckoutSummary />
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/cart">
          <Button color="secondary" Icon={ArrowLeft}>Zurück</Button>
        </Link>
        <Link href="/checkout/shipping">
          <Button Icon={ArrowRight} iconAlign="right">Proceed</Button>
        </Link>
      </div>
    </div>
  );
};

