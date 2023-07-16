import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import itemListReducer from './slices/itemListSlice';
import ordersReducer from './slices/ordersSlice';
import bottomTabReducer from './slices/bottomTabSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    items: itemListReducer,
    orders: ordersReducer,
    bottomTab: bottomTabReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
