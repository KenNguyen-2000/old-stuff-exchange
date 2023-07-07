import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { navigate } from '../helpers/navigation.service';

const interceptor = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl,
});

interceptor.interceptors.request.use(
  async (req: InternalAxiosRequestConfig<any>) => {
    const token = await SecureStore.getItemAsync('token');
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  }
);

interceptor.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      await SecureStore.deleteItemAsync('token');

      navigate('Login');
    }
    return Promise.reject(error.response);
  }
);

export default interceptor;
