export type DiscountType = {
  id: string;
  code: string;
  type: 'coupon' | 'promotion';
  discountType: 'percentage' | 'fixed';
  value: number;
  validFrom: number;
  validUntil: number;
};