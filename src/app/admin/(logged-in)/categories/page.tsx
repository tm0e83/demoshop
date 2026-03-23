'use client';

import type { CategoryType } from '@/typings';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useCategories } from '@/hooks';
import { modalStore } from '@/store';
import Alert from '@/components/alert';
import Button from '@/components/button';
import PageTitle from '@/components/page-title';
import Category from '@/components/admin/categories/category';
import ModalDeleteCategory from '@/components/modal-delete-category/modal-delete-category';

export default function CategoryOverviewPage() {
  const { categories } = useCategories();

  const createCategoryButton = () => (
    <Link href="/admin/create-category" >
      <Button>
        <Plus /> Create category
      </Button>
    </Link>
  );

  const handleDeleteButtonClick = (category: CategoryType) => {
    modalStore.openModal(<ModalDeleteCategory category={category} />)
  };

  return (
    <div className="category-overview-page">
      <PageTitle>Categories</PageTitle>

      {categories.length === 0 ? (
        <>
          <Alert>No categories available.</Alert>
          {createCategoryButton()}
        </>
      ) : (
        <>
          <div className="actions">
            {createCategoryButton()}
          </div>
          <div className="categories item-grid">
            <div className="item-grid-head">
              <div className="item">
                <div className="item-column column-status">Status</div>
                <div className="item-column">Title</div>
                <div className="item-column">Description</div>
                <div className="item-column column-actions">Actions</div>
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
