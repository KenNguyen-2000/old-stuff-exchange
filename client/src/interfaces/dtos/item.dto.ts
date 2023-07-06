import { IUserInfo } from './user.dto';

export interface IItemDto {
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  status: string;
  images: IItemImage[];
  created?: Date;
  updated?: Date;
  user: IUserInfo;
  category: ICategory;
}

export interface IItemImage {
  id: string;
  imageUri: string;
  itemId: string;
}

export interface ICategory {
  id: string;
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
  id: string;
  name?: string;
  description?: string;
  price?: number;
  location?: string;
  status?: string;
  images?: string[];
}

export interface IChangeItemStatus {
  id: string;
  status: string;
}
