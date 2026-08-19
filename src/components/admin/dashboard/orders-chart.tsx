'use client';

import styles from './orders-chart.module.css';
import Card from "@/components/card";
import Title from "@/components/title";
import type { OrderType } from "@/typings";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function aggregateOrders(orders: OrderType[]) {
  const grouped = orders.reduce((acc, order) => {
    // Datum auf Tag normalisieren (ohne Uhrzeit)
    const day = new Date(order.createdAt).toISOString().split('T')[0];

    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // In Array umwandeln und nach Datum sortieren
  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export default function OrdersChart({ orders }: { readonly orders: OrderType[] }) {
  const chartData = aggregateOrders(orders);

  return (
    <Card className={styles.ordersChart}>
      <Title level={3}>Orders last 7 days</Title>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 25, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e0e0e0" vertical={false} />
          <XAxis dataKey="date" axisLine={false} tickLine={false} />
          <YAxis allowDecimals={false} width={50} tickMargin={10} axisLine={false} tickLine={false} />
          <Tooltip cursor={false} />
          <Bar dataKey="count" fill="var(--palette-3)" activeBar={false} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}