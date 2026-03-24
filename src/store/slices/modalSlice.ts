import { createSlice } from '@reduxjs/toolkit';

type ModalPayload = {
  type: string;
  props: Record<string, unknown>;
}

type ModalState = {
  isOpen: boolean;
  type: string | null;
  props: Record<string, unknown>;
}

const initialState: ModalState = {
  isOpen: false,
  type: null,
  props: {}
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: initialState,
  reducers: {
    openModal: (state, action: { payload: ModalPayload }) => {
      state.type = action.payload.type;
      state.props = action.payload.props;
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.props = {};
    }
  }
})

export default modalSlice;
