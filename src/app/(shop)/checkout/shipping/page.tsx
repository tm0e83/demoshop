'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/utils';
import { cartStore } from '@/store';
import { useCart, useShippingMethods } from '@/hooks';
import Button from '@/components/button'
import Card from '@/components/card'
import CheckoutSummary from '@/components/checkout-summary'
import Title from '@/components/title'

export default function CheckoutShippingPage() {
  const cart = useCart();
  const shippingMethods = useShippingMethods();
  const dispatch = useDispatch();

  useEffect(() => {
    if (shippingMethods.length === 0) {
      return;
    }
    if (!cart.shippingMethodId) {
      dispatch(cartStore.setShippingMethodId(shippingMethods[0].id));
    }
  }, [shippingMethods, cart.shippingMethodId, dispatch]);

  return (
    <div className="checkout-shipping-page">
      <Title>Select shipping method</Title>

      <div className="d-flex gap-4 flex-wrap">
        <Card className="flex-1">
          {shippingMethods.map((method, index) => (
            <div key={method.id} className="d-flex align-items-center gap-2 mb-2">
              <div>
                <input
                  type="radio"
                  name="shippingMethod"
                  id={method.id}
                  value={method.id}
                  checked={cart.shippingMethodId === method.id || (cart.shippingMethodId === '' && index === 0)}
                  onChange={() => dispatch(cartStore.setShippingMethodId(method.id))}
                />
              </div>
              <label htmlFor={method.id}>
                <span>{method.name}</span> <span className="text-muted">({formatCurrency(method.price)})</span>
              </label>
            </div>
          ))}
        </Card>
        <CheckoutSummary />
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/checkout/address">
          <Button color="secondary"><ArrowLeft /> Zurück</Button>
        </Link>
        <Link href="/checkout/payment">
          <Button>Proceed <ArrowRight /></Button>
        </Link>
      </div>
    </div>
  );
};
