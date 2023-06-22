import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { getUserInfo } from '../services/user.service';

const useUserInfo = async () => {
  const token = await AsyncStorage.getItem('token');

  if (!token) {
    return null;
  }
  console.log(token);
  const decoded: any = jwtDecode(token);
  const user = await getUserInfo(decoded.Id);

  return user ? user : null;
};

export default useUserInfo;
