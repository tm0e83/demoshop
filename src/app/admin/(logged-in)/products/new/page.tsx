import type { SubmitHandler } from 'react-hook-form';

import { Controller, useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addNewProduct } from '@/services/firebase.service';
import Button from '@/components/button';
import Card from '@/components/card';
import Input from '@/components/input';
import MultiSelect from '@/components/multi-select';
import { useCategories } from '@/hooks';
import { productStore } from '@/store';

type Inputs = {
  title: string;
  description: string;
  price: number;
  categories: string[];
}

export default function CreateProductPage() {
  const { categories } = useCategories();
  const dispatch = useDispatch();
  const router = useRouter();

  const { control, register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      categories: [],
    }
  });

  const onSubmitForm: SubmitHandler<Inputs> = async (data) => {
    const newProduct = await addNewProduct({
      title: data.title,
      description: data.description,
      active: true,
      categoryIds: data.categories.reduce((acc, categoryId) => {
        acc[categoryId] = true;
        return acc;
      }, {} as Record<string, boolean>),
      createdAt: 0,
      id: '',
      image: '',
      price: Number(data.price),
    });
    
    if (newProduct) {
      dispatch(productStore.addProduct(newProduct));
      router.push('/admin/products');
    }
  };

  return (
    <div className="create-product-page">
      <h1>Create Product</h1>

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
              {...register('price', { 
                required: "Product price is required",
                valueAsNumber: true,
                validate: (value) => value > 0 || "Price must be greater than zero"
              })}
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
                  label="Categories"
                  onChange={field.onChange}
                ></MultiSelect>
              )}
            />
          </div>

          <div className="d-flex justify-between mt-4">
            <Link href="/admin/products">
              <Button color="secondary">Cancel</Button>
            </Link>
            <Button>Create Product</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
