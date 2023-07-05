import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import data from '../../components/screens/HomeScreen/old_stuffs.json';
import { fetchItemList } from '../thunks/itemList.thunk';

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
  extraReducers(builder) {
    builder
      .addCase(fetchItemList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItemList.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.oldStuffs = action.payload.datas;
      })
      .addCase(fetchItemList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setOldStuffs, filterOldStuffs } = itemListSlice.actions;

export default itemListSlice.reducer;
