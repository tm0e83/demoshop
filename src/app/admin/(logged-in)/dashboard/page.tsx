import { connection } from 'next/server';
import styles from './page.module.css';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import Title from '@/components/title';
import OrdersChartLoader from '@/components/admin/dashboard/orders-chart-loader';
import { getCategories, getProducts, getCustomers, getOrders } from '@/services/firebase-admin.service';

export default async function DashboardPage() {
  await connection();

  const [categories, products, customers, orders] = await Promise.all([
    getCategories(),
    getProducts(),
    getCustomers(),
    getOrders()
  ]);

  return (
    <div className={styles.dashboard}>
      <PageTitle>Dashboard</PageTitle>
      <div className={styles.statistics}>
        <Card className="flex-1" href="/admin/categories">
          <Title level={3} className="text-center mb-0">Categories</Title>
          <p className={`text-center mb-0 ${styles.amount}`}>{categories.length}</p>
        </Card>
        <Card className="flex-1" href="/admin/products">
          <Title level={3} className="text-center mb-0">Products</Title>
          <p className={`text-center mb-0 ${styles.amount}`}>{products.length}</p>
        </Card>
        <Card className="flex-1" href="/admin/orders">
          <Title level={3} className="text-center mb-0">Orders</Title>
          <p className={`text-center mb-0 ${styles.amount}`}>{orders.length}</p>
        </Card>
        <Card className="flex-1" href="/admin/customers">
          <Title level={3} className="text-center mb-0">Customers</Title>
          <p className={`text-center mb-0 ${styles.amount}`}>{customers.length}</p>
        </Card>
      </div>

      <OrdersChartLoader orders={orders} />
    </div>
  );
}
