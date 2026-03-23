'use client';

import styles from './order.module.css';
import type { OrderType, UserType } from '@/typings';
import { useState, useEffect } from 'react';
import { formatCurrency, formatDate } from '@/utils';
import Link from 'next/link';
import Button from '@/components/button';
import { getUser } from '@/services/firebase.service';
import { useShippingMethods } from '@/hooks';

type OrderProps = {
  order: OrderType;
  showCustomer?: boolean;
};

export default function Order({ order, showCustomer = false }: OrderProps) {
  const [customer, setCustomer] = useState<UserType | null>(null);
  const shippingMethods = useShippingMethods();

  const selectedShippingMethod = shippingMethods.find((method) => method.id === order.shippingMethodId) ?? shippingMethods[0];
  const totalProductPrice = order.items.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountValue = order.discounts?.reduce((total, discount) => total + discount.value, 0) ?? 0;
  const totalPrice = totalProductPrice + (selectedShippingMethod?.price ?? 0) - discountValue;

  useEffect(() => {
    if (showCustomer) {
      getUser(order.uid)
        .then(user => {
          setCustomer(user);
        });
    }
  }, [showCustomer, order.uid]);

  return (
    <div className="item">
      <div className="item-column">
        <div className="item-label">Date</div>
        <div className="item-value">{formatDate(order.createdAt as number)}</div>
      </div>
      <div className="item-column">
        <div className="item-label">Status</div>
        <div className="item-value">{order.status}</div>
      </div>
      {showCustomer && customer && (
        <div className="item-column">
          <div className="item-label">Customer</div>
          <div className="item-value">{customer.firstname} {customer.lastname}</div>
        </div>
      )}
      <div className="item-column">
        <div className="item-label">Items</div>
        <div className="item-value">{order.items.reduce((total, item) => total + item.quantity, 0)}</div>
      </div>
      <div className="item-column">
        <div className="item-label">Total</div>
        <div className="item-value">{formatCurrency(totalPrice)}</div>
      </div>
      <div className={`item-column ${styles.columnActions}`}>
        <Link href={`orders/${order.id}`} title="View order details" className="w-100">
          <Button className="w-100">Details</Button>
        </Link>
      </div>
    </div>
  );
};

