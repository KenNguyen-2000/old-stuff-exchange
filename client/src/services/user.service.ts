import { IUpdateAvatar, IUserUpdate } from '../interfaces/dtos';
import interceptor from './interceptor';

export const getUserInfo = async (userId: number) => {
  const res = await interceptor.get(`/users/${userId}`);
  console.log(res.data);
  return res.data;
};

export const updateUserInfo = async (updateUserDto: IUserUpdate) => {
  const res = await interceptor.put('/users/update-user', updateUserDto);

  return res.data;
};

export const updateAvatar = async (updateAvatarDtp: IUpdateAvatar) => {
  const res = await interceptor.patch('/users/update-avatar', updateAvatarDtp);

  return res.data;
};
