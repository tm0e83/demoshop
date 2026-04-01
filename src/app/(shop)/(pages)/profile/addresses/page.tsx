'use client';

import styles from './page.module.css';
import { useUser } from '@/hooks';
import Address from '@/components/address';
import Card from '@/components/card/card';
import Title from '@/components/title';

export default function AddressPage() {
  const { user } = useUser();

  const shippingAddress = user?.addresses[user?.defaultShippingAddress] ?? null;
  const billingAddress = user?.addresses[user?.defaultBillingAddress] ?? null;

  return (
    <>
      <div className={styles.addressPage}>
        <Card>
          <div className={styles.addresses}>
            {shippingAddress && (
              <div className="shipping">
                <Title level={2}>Delivery address</Title>
                <Address address={shippingAddress} />
              </div>
            )}

            {billingAddress && (
            <div className="billing">
              <Title level={2}>Billing address</Title>
              <Address address={billingAddress} />
            </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};
