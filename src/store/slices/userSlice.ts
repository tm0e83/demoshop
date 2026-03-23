import { createSlice } from '@reduxjs/toolkit';
import type { UserType } from '@typings';

type UserState = {
  user: UserType | null;
  users: UserType[];
};

const initialState: UserState = {
  user: null,
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: { type: string, payload: UserType | null }) => {
      state.user = action.payload;
    },
    
    setUsers: (state, action: { type: string, payload: UserType[] }) => {
      state.users = action.payload;
    },
  },
});

export default userSlice;
