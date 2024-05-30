// src/context/itemsReducer.ts
import { Item } from "../types/item";

export type ItemsState = {
  items: Item[];
  loading: boolean;
  error: string | null;
};

export type ItemsAction =
  | { type: "FETCH_ITEMS_REQUEST" }
  | { type: "FETCH_ITEMS_SUCCESS"; payload: Item[] }
  | { type: "FETCH_ITEMS_FAILURE"; payload: string }
  | { type: "ADD_ITEM"; payload: Item }
  | { type: "UPDATE_ITEM"; payload: Item }
  | { type: "DELETE_ITEM"; payload: string };

export const initialItemsState: ItemsState = {
  items: [],
  loading: false,
  error: null,
};

export const itemsReducer = (
  state: ItemsState,
  action: ItemsAction
): ItemsState => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return { ...state, loading: true, error: null };
    case "FETCH_ITEMS_SUCCESS":
      return { ...state, loading: false, items: action.payload };
    case "FETCH_ITEMS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload),
      };
    default:
      return state;
  }
};
