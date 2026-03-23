import styles from './logo.module.css';
import Link from 'next/link';
export default function Logo({ href = '/', ...linkProps }) {
  return (
    <Link href={href} {...linkProps} className={styles.logo}>
      <strong>DEMO</strong><span>SHOP</span>
    </Link>
  );
};

