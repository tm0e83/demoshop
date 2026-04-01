'use client';

import type { CartItemType, DiscountType } from '@/typings';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useOrder, usePaymentMethods, useShippingMethods } from '@/hooks';
import { formatCurrency, formatDate } from '@/utils';

import Address from '@/components/address';
import Button from '@/components/button';
import Card from '@/components/card';
import CartItem from '@/components/cart-item';
import PageTitle from '@/components/page-title';

export default function OrderDetailsPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const { order } = useOrder(orderId || '');
  const shippingMethods = useShippingMethods();
  const paymentMethods = usePaymentMethods();
  const router = useRouter();
  const pathname = usePathname();

  if (!order) return <div>Order not found.</div>

  const selectedPaymentMethod = paymentMethods.find((method) => method.id === order.paymentMethodId) ?? paymentMethods[0];
  const selectedShippingMethod = shippingMethods.find((method) => method.id === order.shippingMethodId) ?? shippingMethods[0];
  const totalProductPrice = order.items.reduce((total: number, item: CartItemType) => total + item.price * item.quantity, 0);
  // const totalProductPriceWithoutTax = totalProductPrice / 1.19;
  const discountValue = order.discounts?.reduce((total: number, discount: DiscountType) => total + discount.value, 0) ?? 0;
  const totalPrice = totalProductPrice + (selectedShippingMethod?.price ?? 0) - discountValue;

  return (
    <div className="order-details-page">
      {pathname.startsWith('/admin') && <PageTitle>Order details</PageTitle>}
      <Card>
        <div className="mb-4">
          <strong>Order ID:</strong><br />
          {order.id}
        </div>
        <div className="mb-4">
          <strong>Status:</strong><br />
          {order.status}
        </div>
        <div className="mb-4">
          <strong>Order date:</strong><br />
          {formatDate(order.createdAt as number)}
        </div>
        <div className="mb-4">
          <strong>Payment method:</strong><br />
          {selectedPaymentMethod.name}
        </div>
        <div className="mb-4">
          <strong>Shipping costs:</strong><br />
          {formatCurrency(selectedShippingMethod.price)}
        </div>
        <div className="mb-4">
          <strong>Total price:</strong><br />
          {formatCurrency(totalPrice)}
        </div>
        <div className="mb-4">
          <strong>Shipping Address:</strong><br />
          <Address address={order.shippingAddress} />
        </div>
        <div className="mb-4">
          <strong>Billing Address:</strong><br />
          <Address address={order.billingAddress} />
        </div>
        <div className="mb-4">
          <strong>Products:</strong><br />
          {order.items.map((item: CartItemType) => <CartItem key={item.id} cartItem={item} />)}</div>
      </Card>

      <div className="d-flex justify-between mt-4">
        <Button color="secondary" onClick={() => router.back()}>Back</Button>
      </div>
    </div>
  );
};
