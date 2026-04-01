import styles from './product-card.module.css';
import Link from 'next/link';
import type { ProductType } from '@/typings';
import { formatCurrency } from '@/utils';
import ImagePlaceholder from '@/components/image-placeholder'

export default function ProductCard({ product }: { product: ProductType }) {
  return (
    <Link className={`${styles.productCard} mb-0`} href={`/product/${product.id}`}>
      <div className={styles.productImage}>
        <ImagePlaceholder />
      </div>
      <div className={styles.productName}>
        {product.title}
      </div>
      <div className={styles.productPrice}>{formatCurrency(product.price)}</div>
    </Link>
  );
};

