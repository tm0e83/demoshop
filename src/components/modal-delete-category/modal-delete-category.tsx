'use client';

import type { CategoryType } from '@/typings';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteCategory } from '@/services/firebase.service'
import Button from '@/components/button';
import Title from '@/components/title';
import { useModal } from '@/hooks'
import { categoryStore } from '@/store'

type ModalDeleteCategoryProps = {
  category: CategoryType | null;
}

export default function ModalDeleteCategory({ category }: ModalDeleteCategoryProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  if (!category) return '';

  const handleDelete = () => {
    deleteCategory(category.id)
      .then(() => { 
        dispatch(categoryStore.removeCategory(category.id));
        toast.success(<span>Category successfully deleted</span>);
        closeModal();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <Title level={3}>Delete category?</Title>
      <div className="d-flex gap-4 justify-between">
        <Button onClick={closeModal} color="secondary">Cancel</Button>
        <Button onClick={handleDelete} color="danger">Delete</Button>
      </div>
    </>
  );
};

