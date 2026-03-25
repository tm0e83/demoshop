'use client';

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
        <div className={`item-column ${styles.status}`}>
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
        <div className={`item-column ${styles.actions}`}>
          <Link href={`/admin/categories/edit/${category.id}`}>
            <Button size="small">Edit</Button>
          </Link>
          <Button 
            color="danger"
            size="small"
            onClick={() => onDelete(category)}
          >Delete</Button>
        </div>
      </div>
    </>
  );
}
