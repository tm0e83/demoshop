'use client';

import type { CategoryType, ProductType } from '@/typings';
import styles from './modal.module.css';
import { useModal } from "@/hooks";
import ModalDeleteCategory from '@/components/modal-delete-category';
import ModalDeleteProduct from '@/components/modal-delete-product';

const modalRegistry: Record<string, (props: Record<string, unknown>) => React.ReactNode> = {
  deleteCategory: (props) => (
    <ModalDeleteCategory category={props.category as CategoryType} />
  ),
  deleteProduct: (props) => (
    <ModalDeleteProduct product={props.product as ProductType} />
  ),
};

export default function Modal() {
  const { isOpen, type, props, closeModal } = useModal();

  if (!isOpen || !type) return null;

  const renderContent = modalRegistry[type];

  return (
    <div className={styles.modal} onClick={() => closeModal()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {renderContent?.(props)}
      </div>
    </div>
  );
};
