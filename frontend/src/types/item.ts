export interface Item {
  _id: string;
  name: string;
  quantity: number;
  labels: string[];
  description?: string;
  brand?: string;
  size?: string;
  color?: string;
  price?: number;
}
