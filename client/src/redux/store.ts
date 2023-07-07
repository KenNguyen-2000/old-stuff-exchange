import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import itemListReducer from './slices/itemListSlice';
import ordersReducer from './slices/ordersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemListReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
