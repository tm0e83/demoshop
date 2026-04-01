'use client';

import styles from './page.module.css';

import Alert from '@/components/alert';
import Order from '@/components/order';
import { useUser, useUserOrders } from '@/hooks';

export default function OrdersPage() {
  const { user } = useUser();
  const { orders } = useUserOrders(user?.uid);

  return (
    <>
      <div className={styles.ordersPage}>
        {orders.length === 0 ? (
          <Alert>You have no orders yet.</Alert>
        ) : (
          <>
            <div>
              <div className="orders item-grid">
                <div className="item-grid-head">
                  <div className="item">
                    <div className="item-column">Date</div>
                    <div className="item-column">Status</div>
                    <div className="item-column">Items</div>
                    <div className="item-column">Total</div>
                    <div className={`item-column ${styles.actions}`}>{/* Actions */}</div>
                  </div>
                </div>
                <div className="item-grid-body">
                  {orders.map(order => <Order key={order.id} order={order} />)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

