'use client';

import type { SubmitHandler } from 'react-hook-form';

import { useForm } from "react-hook-form"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addNewCategory } from '@/services/firebase.service';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import { categoryStore } from '@/store';

type Inputs = {
  title: string;
  description: string;
  price: number;
  categories: string[];
}

export default function CreateCategoryPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      categories: [],
    }
  });

  const onSubmitForm: SubmitHandler<Inputs> = async (data) => {
    const newCategory = await addNewCategory({
      active: true,
      createdAt: 0,
      description: data.description,
      id: '',
      image: '',
      title: data.title,
    });
    
    if (newCategory) {
      dispatch(categoryStore.addCategory(newCategory));
      router.push('/admin/categories');
    }
  };

  return (
    <div className="create-category-page">
      <h1>Create Category</h1>

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
            <Button>Create Category</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
