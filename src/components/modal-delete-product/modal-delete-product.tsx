'use client';

import type { ProductType } from '@/typings';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteProduct } from '@/services/firebase.service'
import Button from '@/components/button';
import Title from '@/components/title';
import { useModal } from '@/hooks'
import { productStore } from '@/store'

type ModalDeleteProductProps = {
  product: ProductType | null;
}

export default function ModalDeleteProduct({ product }: ModalDeleteProductProps) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  if (!product) return '';

  const handleDelete = () => {
    deleteProduct(product.id)
      .then(() => { 
        dispatch(productStore.removeProduct(product.id));
        toast.success(<span>Product successfully deleted</span>);
        closeModal();
      })
      .catch(error => console.error(error));
  };

  return (
    <>
      <Title level={3}>Delete product?</Title>
      <div className="d-flex gap-4 justify-between">
        <Button onClick={closeModal} color="secondary">Cancel</Button>
        <Button onClick={handleDelete} color="danger">Delete</Button>
      </div>
    </>
  );
};

