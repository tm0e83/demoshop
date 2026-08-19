'use client';

import dynamic from 'next/dynamic';
import type { OrderType } from '@/typings';

const OrdersChart = dynamic(
  () => import('./orders-chart'),
  { ssr: false }
);

export default function OrdersChartLoader({ orders }: { readonly orders: OrderType[] }) {
  return <OrdersChart orders={orders} />;
}