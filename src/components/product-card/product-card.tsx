import styles from './product-card.module.css';
import type { ProductType } from '@/typings';
import { formatCurrency } from '@/utils';
import Card from '@/components/card/card';
import ImagePlaceholder from '@/components/image-placeholder'

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Card className={`${styles.productCard} mb-0`} href={`/product/${product.id}`}>
      <div className={styles.productName}>
        {product.title}
      </div>
      <div className={styles.productImage}>
        <ImagePlaceholder />
      </div>
      <div className={styles.productPrice}>{formatCurrency(product.price)}</div>
    </Card>
  );
};

