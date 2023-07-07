import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { getUserInfo } from '../services/user.service';
import { IUserInfo } from '../interfaces/dtos';
import * as SecureStore from 'expo-secure-store';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync('token');

      if (!token) {
        setUserInfo(null);
        return;
      }

      const decoded: any = jwtDecode(token);

      try {
        const res = await getUserInfo(decoded.Id);
        setUserInfo(res.data);
      } catch (error) {
        setUserInfo(null);
      }
    };

    fetchData();
  }, []);

  return userInfo;
};

export default useUserInfo;
