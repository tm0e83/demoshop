'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { cartStore } from '@/store';
import { useCart, usePaymentMethods } from '@/hooks';
import Button from '@/components/button';
import Card from '@/components/card';
import CheckoutSummary from '@/components/checkout-summary';
import Title from '@/components/title';

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
    <div className="checkout-payment-page">
      <Title>Select payment method</Title>

      <div className="d-flex gap-4 flex-wrap">
        <Card className="flex-1">
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
        </Card>
        <CheckoutSummary />
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/checkout/shipping">
          <Button color="secondary"><ArrowLeft /> Zurück</Button>
        </Link>
        <Link href="/checkout/overview">
          <Button>Proceed <ArrowRight /></Button>
        </Link>
      </div>
    </div>
  );
};
