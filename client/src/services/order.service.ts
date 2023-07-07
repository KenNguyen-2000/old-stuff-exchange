import { IChangeOrderStatus } from '../interfaces/dtos/order.dto';
import interceptor from './interceptor';

export const makeAnOrder = async (itemId: number) => {
  const res = await interceptor.post('/order', {
    itemId: itemId,
  });

  return res.data;
};

export const changeOrderStatus = async ({ id, status }: IChangeOrderStatus) => {
  const res = await interceptor.patch(`/order/${id}`, {
    status: status,
  });

  return res.data;
};

export const getOrderList = async () => {
  const res = await interceptor.get('/order');
  return res.data;
};
