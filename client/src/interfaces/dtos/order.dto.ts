import { IAuditable } from './auditable.dto';
import { OrderStatus } from '../enums/order.enum';
import { IItemDto } from './item.dto';

interface IUserOrderDto {
  id: number;
  fullName: string;
  email?: string;
  phoneNumber?: string;
  gender: boolean;
  dob: Date;
  address: string;
}

export interface IOrderDto extends IAuditable {
  item: IItemDto;
  user: IUserOrderDto;
  status: OrderStatus;
}

export interface ICreateOrder {
  itemId: number;
}

export interface IChangeOrderStatus {
  id: number;
  status: OrderStatus;
}
