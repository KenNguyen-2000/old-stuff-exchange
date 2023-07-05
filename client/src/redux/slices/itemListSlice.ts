import { createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import { fetchItemList } from '../thunks/itemList.thunk';

export interface ItemListSlice {
  isLoading: boolean;
  oldStuffs: any[];
}

const initialState: ItemListSlice = {
  isLoading: false,
  oldStuffs: [],
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
      state.oldStuffs = state.oldStuffs.filter((stuff) =>
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
