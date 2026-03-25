'use client';

import styles from './page.module.css';

import type { ProductType } from '@/typings';
import { Plus } from 'lucide-react';
import { useProducts, useModal } from '@/hooks';
import Button from '@/components/button';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import Product from '@/components/admin/products/product';

export default function ProductOverviewPage() {
  const { openModal } = useModal();
  const { products } = useProducts();

  const createProductButton = () => (
    <Button href="/admin/products/new" Icon={Plus}>
      Create product
    </Button>
  );

  const handleDeleteButtonClick = (product: ProductType) => {
    openModal('deleteProduct', { product });
  };

  return (
    <Card className={styles.overview}>
      <PageTitle>Products</PageTitle>

      {products.length === 0 ? (
        <>
          <p>No products available.</p>
          {createProductButton()}
        </>
      ) : (
        <>
          <div className={styles.actions}>
            {createProductButton()}
          </div>
          <div className="products item-grid">
            <div className="item-grid-head">
              <div className="item">
                <div className={`item-column ${styles.status}`}>Status</div>
                <div className="item-column">Title</div>
                <div className="item-column">Description</div>
                <div className="item-column">Price</div>
                <div className={`item-column ${styles.actions}`}>{/* Actions */}</div>
              </div>
            </div>
            <div className="item-grid-body">
              {products.map((product) => (
                <Product 
                  product={product}
                  onDelete={handleDeleteButtonClick}
                  key={product.id} 
                />
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}
