'use client';

import styles from './page.module.css';

import type { CategoryType } from '@/typings';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCategories, useModal } from '@/hooks';
import Alert from '@/components/alert';
import Button from '@/components/button';
import PageTitle from '@/components/page-title';
import Category from '@/components/admin/categories/category';
export default function CategoryOverviewPage() {
  const { openModal } = useModal();
  const { categories } = useCategories();

  const createCategoryButton = () => (
    <Link href="/admin/new" >
      <Button>
        <Plus size={16} /> Create category
      </Button>
    </Link>
  );

  const handleDeleteButtonClick = (category: CategoryType) => {
    openModal('deleteCategory', { category });
  };

  return (
    <div className={styles.categories}>
      <PageTitle>Categories</PageTitle>

      {categories.length === 0 ? (
        <>
          <Alert>No categories available.</Alert>
          {createCategoryButton()}
        </>
      ) : (
        <>
          <div className={styles.actions}>
            {createCategoryButton()}
          </div>
          <div className="item-grid">
            <div className="item-grid-head">
              <div className="item">
                <div className={`item-column ${styles.columnStatus}`}>Status</div>
                <div className="item-column">Title</div>
                <div className="item-column">Description</div>
                <div className={`item-column ${styles.columnActions}`}>Actions</div>
              </div>
            </div>
            <div className="item-grid-body">
              {categories.map((category) => (
                <Category category={category} key={category.id} onDelete={handleDeleteButtonClick} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
