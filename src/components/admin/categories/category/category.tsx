'use client';

import styles from './category.module.css';
import type { CategoryType } from '@/typings';
import Button from '@/components/button';
import { Pencil, Trash } from 'lucide-react';

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
          <Button
            size="small"
            title="Edit"
            href={`/admin/categories/edit/${category.id}`}
          >
            <Pencil size={16} />
          </Button>
          <Button 
            size="small"
            color="danger"
            onClick={() => onDelete(category)}
            title="Delete"
          >
            <Trash size={16} />
          </Button>          
        </div>        
      </div>
    </>
  );
}
