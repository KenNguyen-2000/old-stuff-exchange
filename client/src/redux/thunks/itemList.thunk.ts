import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserInfo } from '../../services/user.service';
import {
  DELETE_AN_ITEM,
  FETCH_ITEM_LIST,
} from '../constants/itemList.constant';
import { deleteItem, getListItem } from '../../services/item.service';

export const fetchItemList = createAsyncThunk(FETCH_ITEM_LIST, async () => {
  try {
    const data = await getListItem();
    return data;
  } catch (error) {
    console.warn(error);
  }
});

export const deleteAnItem = createAsyncThunk(
  DELETE_AN_ITEM,
  async (itemId: string) => {
    try {
      const data = await deleteItem(itemId);
      return data;
    } catch (error) {
      console.warn(error);
    }
  }
);
