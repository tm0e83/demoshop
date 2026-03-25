
'use client';

import styles from './page.module.css';

import { useOrders } from '@/hooks';
import Order from '@/components/order';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';

export default function OrderOverviewPage() {
  const { orders } = useOrders();

  return (
    <>
      <Card className={styles.orderPverviewPage}>
        <PageTitle>Orders</PageTitle>

        {orders.length === 0 ? (
          <>
            <p>No orders available.</p>
          </>
        ) : (
          <>
            <div className="orders item-grid">
              <div className="item-grid-head">
                <div className="item">
                  <div className="item-column">Date</div>
                  <div className={`item-column ${styles.status}`}>Status</div>
                  <div className="item-column">Customer</div>
                  <div className="item-column">Items</div>
                  <div className="item-column">Total</div>
                  <div className={`item-column ${styles.actions}`}>{/* Actions */}</div>
                </div>
              </div>
              <div className="item-grid-body">
                {orders.map(order => <Order key={order.id} order={order} showCustomer={true} />)}
              </div>
            </div>
          </>
        )}
      </Card>      
    </>
  );
};
