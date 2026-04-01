'use client';

import styles from './page.module.css';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Alert from '@/components/alert';
import Button from '@/components/button';
import ImagePlaceholder from '@/components/image-placeholder';
import { useProduct, useUser } from '@/hooks';
import { cartStore } from '@/store';
import { formatCurrency } from '@/utils';

export default function ProductDetailPage() {
  const { user } = useUser();
  const { productId } = useParams<{ productId: string }>();
  const { product } = useProduct(productId || '');
  const dispatch = useDispatch();

  if (!product) {
    return <Alert>Product not found</Alert>;
  }

  const handleAddToCart = () => {
    dispatch(cartStore.addToCart({ ...product, quantity: 1 }));
    toast.success(<span><strong>{product.title}</strong> added to basket</span>);
  };

  return (
    <div className={styles.productDetailPage}>
      <div className="product-image-column">
        <ImagePlaceholder
          width={600}
          height={450}
          label={product.title}
        />
      </div>
      <div className="product-details-column">
        <h1 className="product-title">{product?.title}</h1>
        <p className="product-description">{product?.description}</p>
        <div className={`${styles.productPrice} mb-4`}>{formatCurrency(product?.price)}</div>

        {user?.uid ? (
          <Button onClick={handleAddToCart} Icon={ShoppingCart}>
            Add to cart
        </Button>
        ) : (
          <Alert>
            <p>Please log in to add items to your cart.</p>
            <Link href="/login">
              <Button onClick={handleAddToCart}>
                Log in
              </Button>
            </Link>
          </Alert>
        )}
      </div>
    </div>
  );
};
