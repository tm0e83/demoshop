import styles from './category.module.css';

import type { CategoryType } from '@/typings';

import Link from 'next/link';
import Button from '@/components/button';

type CategoryProps = {
  category: CategoryType;
  onDelete: (category: CategoryType) => void;
};

export default function Category({ category, onDelete }: CategoryProps) {
  return (
    <>
      <div className={`${styles.category} item`}>
        <div className="item-column column-status">
          <div className="item-label">Status:</div>
          <div className={`item-value ${styles[category.active ? 'active' : 'inactive']}`}>
            {category.active ? 'Active' : 'Inactive' }
          </div>
        </div>
        <div className="item-column">
          <div className="item-label">Title:</div>
          <div className="item-value">{category.title}</div>
        </div>
        <div className="item-column">
          <div className="item-label">Description:</div>
          <div className="item-value">{category.description}</div>
        </div>
        <div className="item-column column-actions">
          <Link href={`/admin/edit-category/${category.id}`}>
            <Button>Edit</Button>
          </Link>
          <Button color="danger" onClick={() => onDelete(category)}>Delete</Button>
        </div>
      </div>
    </>
  );
}
