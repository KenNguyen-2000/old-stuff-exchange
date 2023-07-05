import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../services/user.service';
import { FETCH_ITEM_LIST } from '../constants/itemList.constant';
import { getListItem } from '../../services/item.service';

export const fetchItemList = createAsyncThunk(FETCH_ITEM_LIST, async () => {
  try {
    const data = await getListItem();
    return data;
  } catch (error) {
    console.warn(error);
  }
});
