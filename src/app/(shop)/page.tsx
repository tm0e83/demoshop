'use client';

import styles from './page.module.css';
import { useProducts } from '@/hooks';
import PageTitle from '@/components/page-title';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';

export default function Home() {
  const { products } = useProducts();

  return (
    <div className={styles.startPage}>      
      <div className="hero-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://placehold.co/1920x650?text=NextJS demo shop" alt="Hero Banner" />
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
