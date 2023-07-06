import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { getUserInfo } from '../services/user.service';
import { IUserInfo } from '../interfaces/dtos';

const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem('token');

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
