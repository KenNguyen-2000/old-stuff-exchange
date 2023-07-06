import interceptor from './interceptor';

export const makeAnOrder = async (itemId: string) => {
  const res = await interceptor.post('/order', {
    itemId: itemId,
  });

  return res.data;
};
