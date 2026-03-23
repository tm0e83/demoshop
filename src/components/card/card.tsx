import styles from './card.module.css';
import Link from 'next/link';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
};

export default function Card({ children, className = '', href }: CardProps) {
  if (href) {
    return (
      <Link href={href} className={`${styles.card} ${className}`}>
        {children}
      </Link>
    );
  }

  return <div className={`${styles.card} ${className}`}>{children}</div>;
};

