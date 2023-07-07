import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import { deleteAnItem, fetchItemList } from '../thunks/itemList.thunk';
import { IItemDto } from '../../interfaces/dtos';

export interface ItemListSlice {
  isLoading: boolean;
  oldStuffs: IItemDto[];
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
        stuff.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    deleteOldStuff: (state, action: PayloadAction<number>) => {
      state.oldStuffs = state.oldStuffs.filter(
        (item) => item.id !== action.payload
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
        state.oldStuffs = action.payload.datas;
      })
      .addCase(fetchItemList.rejected, (state) => {
        state.isLoading = false;
      });

    builder
      .addCase(deleteAnItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAnItem.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { setOldStuffs, filterOldStuffs, deleteOldStuff } =
  itemListSlice.actions;

export default itemListSlice.reducer;
