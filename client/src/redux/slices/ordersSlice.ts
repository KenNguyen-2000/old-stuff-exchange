import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchUserInfo } from '../thunks/user.thunk';
import { deleteAnItem, fetchItemList } from '../thunks/itemList.thunk';
import { fetchOrderList } from '../thunks/orders.thunk';
import { IChangeOrderStatus, IOrderDto } from '../../interfaces/dtos/order.dto';

export interface OrderListSlice {
  isLoading: boolean;
  orders: IOrderDto[];
}

const initialState: OrderListSlice = {
  isLoading: false,
  orders: [],
};

const ordersSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    filterOrders: (state, action) => {
      //   if (action.payload === '') state.oldStuffs = data;
      //   else
      state.orders = state.orders;
    },
    setOrderStatus: (state, action: PayloadAction<IChangeOrderStatus>) => {
      state.orders = state.orders.map((order) =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status }
          : order
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrderList.fulfilled, (state, action) => {
        if (action.payload.succeeded) state.orders = action.payload.datas;
        state.isLoading = false;
      })
      .addCase(fetchOrderList.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setOrders, filterOrders, setOrderStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
