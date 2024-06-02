// src/hooks/useItemsActions.ts
import { useCallback } from "react";
import { useItems } from "./useItems";
import { Item, NewItem } from "../types/item";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

export const useItemsActions = () => {
  const { dispatch } = useItems();

  const fetchItems = useCallback(async () => {
    dispatch({ type: "FETCH_ITEMS_REQUEST" });
    try {
      const response = await api.get<Item[]>("/items");
      dispatch({ type: "FETCH_ITEMS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({
        type: "FETCH_ITEMS_FAILURE",
        payload: "Failed to fetch items.",
      });
      toast.error("Failed to fetch items.");
    }
  }, [dispatch]);

  const handleAddItem = useCallback(
    async (newItem: NewItem, callback: () => void) => {
      try {
        const response = await api.post<Item>("/items", newItem);
        dispatch({ type: "ADD_ITEM", payload: response.data });
        callback();
        toast.success("Item added successfully!");
      } catch (error) {
        dispatch({
          type: "FETCH_ITEMS_FAILURE",
          payload: "Failed to add item.",
        });
        toast.error("Failed to add item.");
      }
    },
    [dispatch]
  );

  const handleUpdateItem = useCallback(
    async (updatedItem: Item, callback: () => void) => {
      try {
        const response = await api.patch<Item>(
          `/items/${updatedItem._id}`,
          updatedItem
        );
        dispatch({ type: "UPDATE_ITEM", payload: response.data });
        callback();
        toast.success("Item updated successfully!");
      } catch (error) {
        dispatch({
          type: "FETCH_ITEMS_FAILURE",
          payload: "Failed to update item.",
        });
        toast.error("Failed to update item.");
      }
    },
    [dispatch]
  );

  const handleDeleteItem = useCallback(
    async (itemId: string, callback: () => void) => {
      const confirmed = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (!confirmed) {
        return;
      }

      try {
        await api.delete(`/items/${itemId}`);
        dispatch({ type: "DELETE_ITEM", payload: itemId });
        callback();
        toast.success("Item deleted successfully!");
      } catch (error) {
        dispatch({
          type: "FETCH_ITEMS_FAILURE",
          payload: "Failed to delete item.",
        });
        toast.error("Failed to delete item.");
      }
    },
    [dispatch]
  );

  return { fetchItems, handleAddItem, handleUpdateItem, handleDeleteItem };
};
