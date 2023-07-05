export interface ICreateItem {
  name: string;
  description: string;
  price: number;
  location: string;
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
