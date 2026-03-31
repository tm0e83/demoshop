'use client';

import styles from './page.module.css';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';
import {useCategories, useProducts} from '@/hooks';
import { useCustomers, useOrders } from '@/hooks';

export default function DashboardPage() {
  const { categories } = useCategories();
  const { products } = useProducts();
  const { customers } = useCustomers();
  const { orders } = useOrders();

  return (
    <div className={styles.dashboard}>
      <PageTitle>Dashboard</PageTitle>
      <div className={styles.statistics}>
        <Card className={`flex-1 ${styles.red}`} href="/admin/categories"> 
          <Title level={3} className="text-center">Categories</Title>
          <p className="text-center">{categories.length}</p>
        </Card>
        <Card className={`flex-1 ${styles.green}`} href="/admin/products"> 
          <Title level={3} className="text-center">Products</Title>
          <p className="text-center">{products.length}</p>
        </Card>
        <Card className={`flex-1 ${styles.blue}`} href="/admin/orders"> 
          <Title level={3} className="text-center">Orders</Title>
          <p className="text-center">{orders.length}</p>
        </Card>
        <Card className={`flex-1 ${styles.yellow}`} href="/admin/customers"> 
          <Title level={3} className="text-center">Customers</Title>
          <p className="text-center">{customers.length}</p>
        </Card>
      </div>
    </div>
  );
}
