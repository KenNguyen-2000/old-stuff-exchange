import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_ORDER_LIST } from '../constants/orders.constant';
import { getOrderList } from '../../services/order.service';

export const fetchOrderList = createAsyncThunk(FETCH_ORDER_LIST, async () => {
  const data = await getOrderList();
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return data;
});
