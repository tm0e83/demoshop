'use client';

import type { SubmitHandler } from 'react-hook-form';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form"
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { updateCategory } from '@/services/firebase.service';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import PageTitle from '@/components/page-title';
import { useCategory } from '@/hooks';
import { categoryStore } from '@/store';

type Inputs = {
  title: string;
  description: string;
}

export default function EditCategoryPage() {
  const dispatch = useDispatch();
  const { categoryId } = useParams<{ categoryId: string }>();
  const { category } = useCategory(categoryId || '');
  const router = useRouter();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    }
  });

  useEffect(() => {
    reset({
      title: category?.title || '',
      description: category?.description || '',
    });
  }, [category, reset]);

  const onSubmitForm: SubmitHandler<Inputs> = async (data) => {
    const updatedCategory = await updateCategory(categoryId || '', {
      title: data.title,
      description: data.description,
      active: true,
      image: '',
    });
    
    if (updatedCategory) {
      dispatch(categoryStore.editCategory(updatedCategory));
      router.push('/admin/categories');
    }
  };

  return (
    <div className="edit-category-page">
      <PageTitle>Edit Category</PageTitle>

      <Card>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <Input
              type="text"
              id="categoryName"
              label="Category Name"
              {...register('title', { required: "Category name is required" })}
              error={errors?.title?.message}
            />
          </div>
          <div>
            <Input
              type="text"
              id="categoryDescription"
              label="Category Description"
              {...register('description', { required: "Category description is required" })}
              error={errors?.description?.message}
            />
          </div>
          <div className="d-flex justify-between mt-4">
            <Link href="/admin/categories">
              <Button color="secondary">Cancel</Button>
            </Link>
            <Button>Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
