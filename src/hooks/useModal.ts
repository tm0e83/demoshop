'use client';

import { useDispatch, useSelector } from 'react-redux';
import { modalStore } from '@/store';
import type { RootState } from '@/store';

const useModal = () => {
  const dispatch = useDispatch();

  return {
    isOpen: useSelector((state: RootState) => state.modal.isOpen),
    content: useSelector((state: RootState) => state.modal.content),
    openModal: (content: React.ReactNode) => dispatch(modalStore.openModal(content)),
    closeModal: () => dispatch(modalStore.closeModal())
  }
};

export default useModal;