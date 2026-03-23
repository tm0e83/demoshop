import { serverTimestamp } from "firebase/database";
import type { 
  AddressType, 
  CartItemType, 
  DiscountType, 
  PaymentMethodType, 
  ShippingMethodType, 
  UserType
} from '@/typings';

export type OrderType = {
  billingAddress: AddressType;
  createdAt: ReturnType<typeof serverTimestamp> | number;
  id: string;
  items: CartItemType[];
  paymentMethodId: PaymentMethodType['id'];
  shippingAddress: AddressType;
  shippingMethodId: ShippingMethodType['id'];
  status: string;
  uid: UserType['uid'];
  discounts: DiscountType[];
};