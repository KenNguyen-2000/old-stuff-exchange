import interceptor from './interceptor';

export const getUserInfo = async (userId: string) => {
  const res = await interceptor.get(`/user/${userId}`);

  return res.data;
};
