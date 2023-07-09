import { IAuditable } from './auditable.dto';
import { IUserInfo } from './user.dto';

export enum ItemStatus {
  Default = 'Default',
  Active = 'Active',
  Inactive = 'Inactive',
  Deleted = 'Deleted',
}

export interface IItemDto extends IAuditable {
  name: string;
  description: string;
  price: number;
  location: string;
  status: ItemStatus;
  images: IItemImage[];
  user: IUserInfo;
  category: ICategory;
}

export interface IItemImage {
  id: number;
  imageUri: string;
  itemId: number;
}

export interface ICategory {
  id: number;
  name: string;
  imageUri: string;
}

export interface ICreateItem {
  name: string;
  description: string;
  price: number;
  location: string;
  categoryId: string;
  images?: string[];
}

export interface IUpdateItem {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  status: ItemStatus;
  images: string[];
  categoryId: number;
}

export interface IChangeItemStatus {
  id: number;
  status: ItemStatus;
}
