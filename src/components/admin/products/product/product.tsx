import styles from './product.module.css';

import type { ProductType } from '@/typings';
import { Pencil, Trash } from 'lucide-react';
import Button from '@/components/button';
import { formatCurrency } from '@/utils';

type ProductProps = {
  product: ProductType;
  onDelete: (product: ProductType) => void;
};

export default function Product({ product, onDelete }: ProductProps) {
  return (
    <>
      <div className={`${styles.product} item`}>
        <div className={`item-column ${styles.status}`}>
          <div className="item-label">Status:</div>
          <div className={`item-value ${product.active ? 'active' : 'inactive' }`}>
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
        <div className={`item-column ${styles.actions}`}>   
          <Button
            size="small"
            title="Edit"
            href={`/admin/products/edit/${product.id}`}
          >
            <Pencil size={16} />
          </Button>
          <Button 
            size="small"
            color="danger"
            onClick={() => onDelete(product)}
            title="Delete"
          >
            <Trash size={16} />
          </Button>          
        </div>
      </div>
    </>
  );
}
