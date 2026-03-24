'use client';

import { useDispatch, useSelector } from 'react-redux';
import { modalStore } from '@/store';
import type { RootState } from '@/store';

const useModal = () => {
  const dispatch = useDispatch();

  return {
    isOpen: useSelector((state: RootState) => state.modal.isOpen),
    type: useSelector((state: RootState) => state.modal.type),
    props: useSelector((state: RootState) => state.modal.props),
    openModal: (type: string, props: Record<string, unknown> = {}) =>
      dispatch(modalStore.openModal({ type, props })),
    closeModal: () => dispatch(modalStore.closeModal())
  }
};

export default useModal;
