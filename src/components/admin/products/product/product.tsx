import styles from './product.module.css';

import type { ProductType } from '@/typings';
import Link from 'next/link';
import Button from '@/components/button';
import { formatCurrency } from '@/utils';

export default function Product({ product }: { product: ProductType }) {
  return (
    <>
      <div className={`${styles.product} item`}>
        <div className="item-column column-status">
          <div className="item-label">Status:</div>
          <div className={`item-value status-${product.active ? 'active' : 'inactive' }`}>
            {product.active ? 'Active' : 'Inactive' }
          </div>
        </div>
        <div className="item-column">
          <div className="item-label">Title:</div>
          <div className="item-value">{product.title}</div>
        </div>
        <div className="item-column">
          <div className="item-label">Description:</div>
          <div className="item-value">{product.description}</div>

        </div>
        <div className="item-column">
          <div className="item-label">Price:</div>
          <div className="item-value">{formatCurrency(product.price)}</div>
        </div>
        <div className="item-column column-actions">
          <Link href={`/admin/edit-product/${product.id}`}>
            <Button>Edit</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
