'use client';

import styles from './page.module.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { cartStore } from '@/store';
import { useCart, usePaymentMethods } from '@/hooks';
import Button from '@/components/button';
import CheckoutSummary from '@/components/checkout-summary';
import PageTitle from '@/components/page-title';

export default function CheckoutPaymentPage() {
  const dispatch = useDispatch();
  const cart = useCart();
  const paymentMethods = usePaymentMethods();

  useEffect(() => {
    if (paymentMethods.length === 0) {
      return;
    }

    if (!cart.paymentMethodId) {
      dispatch(cartStore.setPaymentMethodId(paymentMethods[0].id));
    }
  }, [paymentMethods, cart.paymentMethodId, dispatch]);

  return (
    <div className={styles.paymentPage}>
      <PageTitle center={true}>Select payment method</PageTitle>

      <div className={styles.paymentContent}>
        <div className={styles.methods}>
          {paymentMethods.map((method, index) => (
            <div key={method.id} className="d-flex align-items-center gap-2 mb-2">
              <div>
                <input
                  type="radio"
                  name="paymentMethod"
                  id={method.id}
                  value={method.id}
                  checked={cart.paymentMethodId === method.id || (cart.paymentMethodId === '' && index === 0)}
                  onChange={() => dispatch(cartStore.setPaymentMethodId(method.id))}
                />
              </div>
              <label htmlFor={method.id}>
                <span>{method.name}</span>
              </label>
            </div>
          ))}
        </div>
        <CheckoutSummary />
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/checkout/shipping">
          <Button color="secondary" Icon={ArrowLeft}> Zurück</Button>
        </Link>
        <Link href="/checkout/overview">
          <Button Icon={ArrowRight} iconAlign="right">Proceed</Button>
        </Link>
      </div>
    </div>
  );
};
