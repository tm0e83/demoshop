'use client';

import styles from './modal.module.css';
import { useModal } from "@/hooks";
import type { CategoryType } from '@/typings';
import ModalDeleteCategory from '@/components/modal-delete-category/modal-delete-category';

const modalRegistry: Record<string, (props: Record<string, unknown>) => React.ReactNode> = {
  deleteCategory: (props) => (
    <ModalDeleteCategory category={props.category as CategoryType} />
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
