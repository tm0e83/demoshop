'use client';

import type { SubmitHandler } from 'react-hook-form';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from "react-hook-form"
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { updateProduct } from '@/services/firebase.service';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import MultiSelect from '@/components/multi-select';
import PageTitle from '@/components/page-title';
import { useCategories, useProduct } from '@/hooks';
import { productStore } from '@/store';

type Inputs = {
  title: string;
  description: string;
  price: number;
  categories: string[];
}

export default function EditProductPage() {
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const { productId } = useParams<{ productId: string }>();
  const { product } = useProduct(productId || '');
  const router = useRouter();
  
  const { control, register, handleSubmit, reset, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      categories: [],
    }
  });

  useEffect(() => {
    reset({
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || 0,
      categories: Object.keys(product?.categoryIds || {}),
    });
  }, [product, reset]);

  const onSubmitForm: SubmitHandler<Inputs> = async (data) => {
    const updatedProduct = await updateProduct(productId || '', {
      title: data.title,
      description: data.description,
      active: true,
      categoryIds: data.categories.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
      }, {} as Record<string, boolean>),
      image: '',
      price: Number(data.price),
    });
    
    if (updatedProduct) {
      dispatch(productStore.editProduct(updatedProduct));
      router.push('/admin/products');
    }
  };

  return (
    <div className="edit-product-page">
      <PageTitle>Edit Product</PageTitle>

      <Card>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div>
            <Input
              type="text"
              id="productName"
              label="Product Name"
              {...register('title', { required: "Product name is required" })}
              error={errors?.title?.message}
            />
          </div>
          <div>
            <Input
              type="text"
              id="productDescription"
              label="Product Description"
              {...register('description', { required: "Product description is required" })}
              error={errors?.description?.message}
            />
          </div>
          <div>
            <Input
              type="number"
              id="productPrice"
              label="Product Price"
              step={0.01}
              {...register('price', { required: "Product price is required" })}
              error={errors?.price?.message}
            />
          </div>
          <div>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => (          
                <MultiSelect 
                  optionData={categories.map((category) => ({ 
                    value: category.id,
                    label: category.title 
                  }))}
                  selectedOptions={field.value}
                  onChange={field.onChange}
                  label="Categories"
                ></MultiSelect>
              )}
            />    
          </div>

          <div className="d-flex justify-between mt-4">
            <Link href="/admin/products">
              <Button color="secondary">Cancel</Button>
            </Link>
            <Button>Save</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
