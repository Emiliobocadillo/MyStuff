// src/hooks/useItems.ts
import { useContext } from "react";
import { ItemsContext, ItemsContextType } from "../context/ItemsContext";

export const useItems = (): ItemsContextType => {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error("useItems must be used within an ItemsProvider");
  }
  return context;
};
