'use client';
import styles from './checkout-summary.module.css';
import { CartItemType, DiscountType } from '@/typings';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/utils';
import { useCart, useShippingMethods } from '@/hooks';
import VoucherCodeInput from '@/components/voucher-code-input';
import Card from '@/components/card/card';
import LoadingScreen from '@/components/loading-screen';

type CheckoutSummaryProps = {
  showVoucherInput?: boolean;
};

export default function CheckoutSummary({ showVoucherInput = false }: CheckoutSummaryProps) {
  const router = useRouter();
  const cart = useCart();
  const shippingMethods = useShippingMethods();

  if (cart.status === 'loading') {
    return <LoadingScreen />;
  }

  if (cart.items.length === 0) {
    router.push('/cart');
  }

  const selectedShippingMethod = shippingMethods.find((method) => method.id === cart.shippingMethodId) ?? shippingMethods[0];
  const totalProductPrice = cart.items.reduce((total: number, item: CartItemType) => total + item.price * item.quantity, 0);
  const totalProductPriceWithoutTax = totalProductPrice / 1.19;
  const discountValue = cart.discounts.reduce((total: number, discount: DiscountType) => total + discount.value, 0);
  const totalPrice = totalProductPrice + (selectedShippingMethod?.price ?? 0) - discountValue;

  return (
    <div className={styles.checkoutSummary}>
      <div className={styles.inner}>
        <div>
          <h2>Order Summary</h2>
          <div className={styles.cartSummaryRow}>
            <div>Value of goods w/o VAT</div>
            <div>{formatCurrency(totalProductPriceWithoutTax)}</div>
          </div>
          <div className={styles.cartSummaryRow}>
            <div>VAT (19%)</div>
            <div>+ {formatCurrency(totalProductPrice - totalProductPriceWithoutTax)}</div>
          </div>
          {selectedShippingMethod && (
            <div className={styles.cartSummaryRow}>
              <div>Shipping</div>
              <div>+ {formatCurrency(selectedShippingMethod.price)}</div>
            </div>
          )}
          {cart.discounts.map((discount: DiscountType) => (
            <div className={styles.cartSummaryRow} key={discount.id}>
              <div>Voucher ({discount.code})</div>
              <div>- {formatCurrency(discount.value)}</div>
            </div>
          ))}
          {showVoucherInput && (
            <div className={styles.cartSummaryRow}>
              <VoucherCodeInput />
            </div>
          )}
        </div>
        <div className="cart-summary-footer">
          <div className={`cart-total ${styles.cartSummaryRow} mb-0`}>
            <div className="font-bold">Total</div>
            <div>
              <div className="font-bold">{formatCurrency(totalPrice)}</div>
              {!selectedShippingMethod && (<div className="text-muted font-small">plus VAT</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

