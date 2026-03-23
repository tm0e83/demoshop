'use client';

import styles from './modal.module.css';
import { useModal } from "@/hooks";

export default function Modal() {
  const { isOpen, content, closeModal } = useModal();

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={() => closeModal()}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
};
