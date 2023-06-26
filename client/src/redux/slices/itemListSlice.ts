import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import data from '../../components/screens/HomeScreen/old_stuffs.json';

export interface ItemListSlice {
  isLoading: boolean;
  oldStuffs: any[];
}

const initialState: ItemListSlice = {
  isLoading: false,
  oldStuffs: data,
};

const itemListSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setOldStuffs: (state, action) => {
      state.oldStuffs = action.payload;
    },
    filterOldStuffs: (state, action) => {
      //   if (action.payload === '') state.oldStuffs = data;
      //   else
      state.oldStuffs = data.filter((stuff) =>
        stuff.name.includes(action.payload)
      );
    },
  },
  extraReducers(builder) {},
});

export const { setOldStuffs, filterOldStuffs } = itemListSlice.actions;

export default itemListSlice.reducer;
