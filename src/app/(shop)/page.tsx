'use client';

import styles from './page.module.css';
import { useProducts } from '@/hooks';
import PageTitle from '@/components/page-title';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';
import Alert from '@/components/alert';
import ImagePlaceholder from '@/components/image-placeholder'
import Title from '@/components/title'

export default function Home() {
  const { products } = useProducts();

  return (
    <div className={styles.startPage}>     

      <Alert type="warning">
        <Title level={3}>Notice</Title>
        <p className="mb-0">This is a demo shop for testing purposes only. 
          No real orders can be placed and no goods will be delivered.</p>
      </Alert>
      <Alert type="info">
        <Title level={3}>Admin credentials for testing purposes</Title>
        <p>
          User: test@demoshop.com<br />
          Password: demo2026
        </p>
        <p className="mb-0">Don&apos;t worry! You can&apos;t really mess things up - the database is reset every 24 hours.</p>
      </Alert>

      <div className="hero-banner">
        <ImagePlaceholder 
          width={1920}
          height={650}
          label="NextJS demo shop" 
        />
      </div>
      <section className="product-section">
        <PageTitle center={true}>Featured Products</PageTitle>
        <ProductList>
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductList>
      </section>
    </div>
  );
}
