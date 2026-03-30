'use client';

import styles from './cart.module.css';
import type { CartItemType } from '@/typings';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCart, useUser } from '@/hooks';
import Button from '@/components/button';
import CartItem from '@/components/cart-item';
import CheckoutSummary from '@/components/checkout-summary';
import PageTitle from '@/components/page-title';
import Alert from '@/components/alert/alert';

export default function CartPage() {
  const cart = useCart();
  const { user } = useUser();

  return (
    <div className={styles.cardPage}>
      <PageTitle center={true}>Shopping Cart</PageTitle>

      <div className={styles.cartContent}>
        <div className={styles.cartItemList}>
          {user?.uid ? (
            cart.items.length === 0 ? (
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
            )
          ): (
          <Alert>
            <p>Please log in to add items to your cart.</p>
            <Link href="/login">
              <Button>
                Log in
              </Button>
            </Link>
          </Alert>
          )}
        </div>

        {cart.items.length > 0 && user?.uid && (
          <CheckoutSummary showVoucherInput={true} />
        )}
      </div>

      <div className="d-flex gap-4 justify-between">
        <Link href="/">
          <Button color="secondary" className="w-full" Icon={ArrowLeft}>
            Continue shopping
          </Button>
        </Link>

        {cart.items.length > 0 && user?.uid && (
          <Link href="/checkout/address">
            <Button className="w-full" Icon={ArrowRight} iconAlign="right">
              Proceed to Checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

