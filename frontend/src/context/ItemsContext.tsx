// src/context/ItemsContext.tsx
import React, { createContext, useReducer, ReactNode } from "react";
import {
  itemsReducer,
  initialItemsState,
  ItemsState,
  ItemsAction,
} from "./itemsReducer";

export interface ItemsContextType {
  state: ItemsState;
  dispatch: React.Dispatch<ItemsAction>;
}

const ItemsContext = createContext<ItemsContextType | undefined>(undefined);

export const ItemsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(itemsReducer, initialItemsState);

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      {children}
    </ItemsContext.Provider>
  );
};

export { ItemsContext };
