'use client';

import styles from './page.module.css';
import Image from 'next/image';
import { useCategories, useProducts } from '@/hooks';
import PageTitle from '@/components/page-title';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';
import Title from '@/components/title'
import Category from '@/components/category';
import Button from '@/components/button';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const { products } = useProducts();
  const { categories } = useCategories();

  return (
    <div className={styles.startPage}>     

      <section className={styles.heroSection}>
        <div className="flex-1 container">
          <div className={styles.introText}>
              <Title>A NextJS demo shop with Firebase</Title>
              <p>This is a demo shop for testing purposes only. 
              No real orders can be placed and no goods will be delivered.</p>
          </div>
          <div className={styles.modelImage}></div>
          <div className={styles.adminInfo}>
            <Title level={3}>Admin credentials for testing</Title>
            <p>
              User: test@demoshop.com<br />
              Password: demo2026
            </p>
            <Button
              href="/login"
              className="mt-4"
              Icon={ArrowRight}
              iconAlign="right"
            >Login</Button>
          </div>
        </div>
      </section>

      <div className="container">
        <section className="category-section">
          <PageTitle center={true}>Kategorien</PageTitle>
          <div className={styles.categoriesGrid}>
            {categories.slice(0, 6).map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </div>
        </section>

        <section className="product-section">
          <PageTitle center={true}>Featured Products</PageTitle>
          <ProductList>
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductList>
        </section>
      </div>
    </div>
  );
}
