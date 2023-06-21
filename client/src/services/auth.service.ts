import axios from 'axios';
import { ILoginDto, IRegisterDto } from '../interfaces/dtos';
import interceptor from './interceptor';

export const loginRequest = async (data: ILoginDto) => {
  console.log('Login start', data, interceptor.getUri());
  const res = await interceptor.post('/auth/login', data);
  return res.data;
};

export const registerRequest = async (data: IRegisterDto) => {
  const res = await interceptor.post('/auth/register', data);
  console.log('rq finish');
  return res.data;
};
