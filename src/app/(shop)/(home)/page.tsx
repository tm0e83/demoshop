'use cache';

import { cacheLife } from 'next/cache';
import styles from './page.module.css';
import PageTitle from '@/components/page-title';
import ProductCard from '@/components/product-card';
import ProductList from '@/components/product-list';
import Title from '@/components/title'
import Category from '@/components/category';
import { getLatestProducts, getCategories } from '@/services/firebase-admin.service';
import AdminInfo from './admin-info';

export default async function Home() {
  cacheLife('hours');

  const products = await getLatestProducts(6);
  const categories = await getCategories();

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
          <AdminInfo />
        </div>
      </section>

      <div className="container">
        <section className="category-section">
          <PageTitle center={true}>Categories</PageTitle>
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
