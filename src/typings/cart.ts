import type { ProductType } from './product';
import type { ShippingMethodType } from './shipping';
import type { PaymentMethodType } from './payment';
import type { AddressType } from './user';
import type { DiscountType } from './discount';

export type CartItemType = ProductType & {
  quantity: number;
};

export type CartType = {
  items: CartItemType[];
  shippingMethodId: ShippingMethodType['id'];
  paymentMethodId: PaymentMethodType['id'];
  status: 'loading' | 'ready';
  shippingAddress: AddressType | null;
  billingAddress: AddressType | null;
  discounts: DiscountType[];
  orderPlaced: boolean;
};