'use client';

import styles from './cart.module.css';
import type { CartItemType } from '@/typings';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/hooks';
import Button from '@/components/button';
import Card from '@/components/card';
import CartItem from '@/components/cart-item';
import CheckoutSummary from '@/components/checkout-summary';
import PageTitle from '@/components/page-title';

export default function CartPage() {
  const cart = useCart();

  return (
    <div className={styles.cardPage}>
      <PageTitle center={true}>Shopping Cart</PageTitle>

      <div className={styles.cartContent}>
        <Card className={styles.cartItemList}>
          {cart.items.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            cart.items.map((cartItem: CartItemType) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                quantityChangeable={true}
                removable={true}
              />
            ))
          )}
        </Card>

        {cart.items.length > 0 && (
          <CheckoutSummary showVoucherInput={true} />
        )}
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/">
          <Button color="secondary" className="w-100">
            <ArrowLeft /> <span>Continue shopping</span>
          </Button>
        </Link>

        {cart.items.length > 0 && (
          <Link href="/checkout/address">
            <Button className="w-100">
              <span>Proceed to Checkout</span> <ArrowRight />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

