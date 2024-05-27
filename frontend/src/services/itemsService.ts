import axios from "axios";
import { Item, NewItem } from "../types/item";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust the base URL as needed
});

// Add a request interceptor to include the JWT token in the headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getItems = async (): Promise<Item[]> => {
  const response = await api.get<Item[]>("/items");
  return response.data;
};

export const createItem = async (item: NewItem): Promise<Item> => {
  const response = await api.post<Item>("/items", item);
  return response.data;
};

export const updateItem = async (id: string, item: Item): Promise<Item> => {
  const response = await api.patch<Item>(`/items/${id}`, item);
  return response.data;
};

export const deleteItem = async (id: string): Promise<void> => {
  await api.delete(`/items/${id}`);
};
