'use client';

import styles from './footer.module.css';
import Link from 'next/link';
import { useCategories } from '@/hooks';

export default function Footer() {
  const { categories } = useCategories();

  return (
    <footer className={styles.footer}>
      {categories && categories.length > 0 && (
        <div className="container d-flex gap-8 mb-4">
          <div className="footer-column">
            <div className={styles.footerColumnTitle}>Categories</div>
            <ul className={styles.footerColumnList}>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.id}`}>{category.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-column">
            <div className={styles.footerColumnTitle}>Info</div>
            <ul className={styles.footerColumnList}>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      )}
    </footer>
  );
};

