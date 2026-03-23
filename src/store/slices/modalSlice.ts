import { createSlice } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean,
  content: React.ReactNode | null
}

const initialState: ModalState = {
  isOpen: false,
  content: null
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action) => {
      state.content = action.payload;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    }
  }
})

export default modalSlice;