import styles from './product-list.module.css';
export default function ProductList({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.productList}>
      {children}
    </div>
  );
};

