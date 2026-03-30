import styles from '@/components/page-title/page-title.module.css';
import Title from '@/components/title';

export default function PageTitle({ center, children }: { center?: boolean; children: React.ReactNode }) {
  return <Title className={`${styles.pageTitle} font-light uppercase ${center ? 'text-center' : ''}`}>{children}</Title>;
};

