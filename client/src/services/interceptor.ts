import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const interceptor = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
});

interceptor.interceptors.request.use(
  async (req: InternalAxiosRequestConfig<any>) => {
    const token = await AsyncStorage.getItem('token');
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

interceptor.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    console.warn(error);
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error.response);
  }
);

export default interceptor;
