'use client';

import styles from './page.module.css';
import { ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Alert from '@/components/alert';
import Button from '@/components/button';
import { useProduct } from '@/hooks';
import { cartStore } from '@/store';
import { formatCurrency } from '@/utils';

export default function ProductDetailPage() {
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image || 'https://placehold.co/600x450?text=No+Image'}
          alt={product.title}
        />
      </div>
      <div className="product-details-column">
        <h1 className="product-title">{product?.title}</h1>
        <p className="product-description">{product?.description}</p>
        <div className={`${styles.productPrice} mb-4`}>{formatCurrency(product?.price)}</div>
        <Button onClick={handleAddToCart}>
          <ShoppingCart size={16} />
          <span>In den Warenkorb</span>
        </Button>
      </div>
    </div>
  );
};
