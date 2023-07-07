import interceptor from './interceptor';

export const getUserInfo = async (userId: number) => {
  const res = await interceptor.get(`/users/${userId}`);
  return res.data;
};
