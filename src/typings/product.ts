export type ProductType  = {
  active: boolean;
  categoryIds: Record<string, boolean>;
  createdAt: number;
  description: string;
  id: string;
  image: string;
  title: string;
  price: number;
};