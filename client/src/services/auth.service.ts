import {ILoginDto, IRegisterDto} from '../interfaces/dtos';
import interceptor from './interceptor';

export const loginRequest = async (data: ILoginDto) => {
  const res = await interceptor.post('/login', data);
  return res;
};

export const registerRequest = async (data: IRegisterDto) => {
  const res = await interceptor.post('/register', data);
  return res;
};
