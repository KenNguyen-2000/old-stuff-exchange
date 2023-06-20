import Config from 'react-native-config';
import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const interceptor = axios.create({
  baseURL: Config.SERVER_URL,
});

interceptor.interceptors.request.use(
  async (req: InternalAxiosRequestConfig<any>) => {
    const token = await AsyncStorage.getItem('token');
    if (token && req.headers) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
);

interceptor.interceptors.response.use(
  res => res,
  async (error: AxiosError) => {
    // console.log(error);
    // if (error.response?.status === 401) {
    //   await AsyncStorage.removeItem('token');
    // }
    return Promise.reject(error.response);
  },
);

export default interceptor;
