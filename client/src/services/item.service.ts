import {
  IChangeItemStatus,
  ICreateItem,
  IUpdateItem,
} from '../interfaces/dtos';
import interceptor from './interceptor';

export const getListItem = async () => {
  const res = await interceptor.get('/items');

  return res.data;
};

export const getListItemCategory = async () => {
  const res = await interceptor.get('/items/categories');

  return res.data;
};

export const getItemById = async (itemId: string) => {
  const res = await interceptor.get(`/items/${itemId}`);

  return res.data;
};

export const createNewItem = async (createItemDto: ICreateItem) => {
  const res = await interceptor.post('/items', createItemDto);

  return res.data;
};

export const updateItem = async (updateItemDto: IUpdateItem) => {
  const res = await interceptor.put(`/items`, updateItemDto);

  return res.data;
};

export const deleteItem = async (itemId: string) => {
  const res = await interceptor.delete(`/items/${itemId}`);

  return res.data;
};

export const changeItemStatus = async (
  changeItemStatusDto: IChangeItemStatus
) => {
  const res = await interceptor.patch('/items', changeItemStatusDto);

  return res.data;
};
