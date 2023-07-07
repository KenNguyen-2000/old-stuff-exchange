import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import { IUserInfo } from '../../interfaces/dtos';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

export interface UserSlice {
  isLoading: boolean;
  user: IUserInfo | null;
}

const initialState: UserSlice = {
  isLoading: false,
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUserInfo.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
