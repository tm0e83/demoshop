import styles from './category.module.css';
import ImagePlaceholder from '@/components/image-placeholder'
import type { CategoryType } from '@/typings';
import Link from 'next/link';

type CategoryProps = {
  category: CategoryType;
} 

export default function Category({ category }: CategoryProps) {
  return (
    <Link href={`/category/${category.id}`} className={styles.category}>
      <div>
        <ImagePlaceholder width={185} height={185} round={true} />
      </div>
      <div className={styles.categoryName}>{category.title}</div>
    </Link>
  );
}