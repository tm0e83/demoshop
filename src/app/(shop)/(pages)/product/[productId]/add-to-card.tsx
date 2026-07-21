'use client';

import { ProductType } from '@/typings';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/button';
import Alert from '@/components/alert';
import { useUser } from '@/hooks';
import { cartStore } from '@/store';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export default function AddToCart({ product }: { product: ProductType }) {
  const { user, status } = useUser();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartStore.addToCart({ ...product, quantity: 1 }));
    toast.success(<span><strong>{product.title}</strong> added to basket</span>);
  };

  if (status === 'loading') return null;

  return (
    <>
      {user?.id ? (
        <Button onClick={handleAddToCart} Icon={ShoppingCart}>
          Add to cart
      </Button>
      ) : (
        <Alert>
          <p>Please log in to add items to your cart.</p>
          <Link href="/login">
            <Button>
              Log in
            </Button>
          </Link>
        </Alert>
      )}
    </>
  );
}