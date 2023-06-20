import axios from 'axios';
import {ILoginDto, IRegisterDto} from '../interfaces/dtos';
import interceptor from './interceptor';

export const loginRequest = async (data: ILoginDto) => {
  const res = await interceptor.post('/auth/login', data);
  return res;
};

export const registerRequest = async (data: IRegisterDto) => {
  const res = await axios.post(
    'http://10.0.2.2:5099/api/v1/auth/register',
    data,
  );
  console.log('rq finish');
  return res;
};
