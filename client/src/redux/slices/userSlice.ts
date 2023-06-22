import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';

export interface UserSlice {
  isLoading: boolean;
  user: any;
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
