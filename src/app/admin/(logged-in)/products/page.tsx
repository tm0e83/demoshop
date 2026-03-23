import styles from './page.module.css';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useProducts } from '@/hooks';
import Button from '@/components/button';
import PageTitle from '@/components/page-title';
import Product from '@/components/admin/products/product';

export default function ProductOverviewPage() {
  const { products } = useProducts();

  const createProductButton = () => (
    <Link href="/admin/create-product" >
      <Button>
        <Plus /> Create product
      </Button>
    </Link>
  );

  return (
    <div className={styles.overview}>
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
                <div className={`item-column ${styles.actions}`}>Actions</div>
              </div>
            </div>
            <div className="item-grid-body">
              {products.map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
