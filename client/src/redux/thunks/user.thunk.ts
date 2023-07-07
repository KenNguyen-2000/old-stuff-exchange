import { createAsyncThunk } from '@reduxjs/toolkit';
import { FETCH_USER_INFO } from '../constants/user.constant';
import { getUserInfo } from '../../services/user.service';
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

export const fetchUserInfo = createAsyncThunk(FETCH_USER_INFO, async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    if (token !== null) {
      const decoded: any = jwtDecode(token);

      const res = await getUserInfo(decoded.Id);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
});
