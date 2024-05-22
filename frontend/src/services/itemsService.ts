import axios from "axios";
import { Item } from "../types/item";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
});

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>("/items");
  return response.data;
};

export const createItem = async (item: Item): Promise<Item> => {
  const response = await api.post<Item>("/items", item);
  return response.data;
};

// export const updateItem = async (id: string, item: Item): Promise<Item> => {
//   const response = await api.patch<Item>(`/items/${id}`, item);
//   return response.data;
// };

// export const deleteItem = async (id: string): Promise<void> => {
//   await api.delete(`/items/${id}`);
// };
