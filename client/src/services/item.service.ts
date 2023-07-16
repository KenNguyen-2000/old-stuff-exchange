import axios from 'axios';
import {
  IChangeItemStatus,
  ICreateItem,
  IUpdateItem,
} from '../interfaces/dtos';
import interceptor from './interceptor';
import Constants from 'expo-constants';

export const getListItem = async () => {
  const res = await interceptor.get('/items');

  return res.data;
};

export const getListItemCategory = async () => {
  const res = await interceptor.get('/items/categories');
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return res.data;
};

export const getItemById = async (itemId: number) => {
  const res = await interceptor.get(`/items/${itemId}`);

  return res.data;
};

export const createNewItem = async (createItemDto: ICreateItem) => {
  try {
    const res = await interceptor.post('/items', createItemDto);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateItem = async (updateItemDto: IUpdateItem) => {
  const res = await interceptor.put(`/items`, updateItemDto);

  return res.data;
};

export const deleteItem = async (itemId: number) => {
  const res = await interceptor.delete(`/items/${itemId}`);

  return res.data;
};

export const changeItemStatus = async (
  changeItemStatusDto: IChangeItemStatus
) => {
  const res = await interceptor.patch('/items', changeItemStatusDto);

  return res.data;
};
