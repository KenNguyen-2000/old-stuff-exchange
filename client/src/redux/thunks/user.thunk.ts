import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_USER_INFO } from '../constants/user.constant';
import { getUserInfo } from '../../services/user.service';

export const fetchUserInfo = createAsyncThunk(
  FETCH_USER_INFO,
  async (userId: string) => {
    try {
      const res = await getUserInfo(userId);
      return res.data;
    } catch (error) {
      console.warn(error);
    }
  }
);
