import { createSlice } from '@reduxjs/toolkit';

interface IBottomTabSlice {
  messageState: boolean;
  orderState: boolean;
}

const initialState: IBottomTabSlice = {
  messageState: false,
  orderState: false,
};

const bottomTabSlice = createSlice({
  name: 'bottomTabs',
  initialState,
  reducers: {
    setMessageState: (state, action) => {
      state.messageState = action.payload;
    },
    setOrderState: (state, action) => {
      state.orderState = action.payload;
    },
  },
});

export const { setMessageState, setOrderState } = bottomTabSlice.actions;

export default bottomTabSlice.reducer;
