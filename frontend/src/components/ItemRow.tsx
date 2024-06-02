// src/components/ItemRow.tsx
import React from "react";
import { Item } from "../types/item";
import tableStyles from "../styles/ItemTable.module.css";
import rowStyles from "../styles/ItemRow.module.css";

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item, fieldName?: string) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit }) => {
  return (
    <div
      className={`${tableStyles.row} ${rowStyles.row}`}
      onClick={() => onEdit(item)}
    >
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "name");
          }}
        >
          {item.name}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "description");
          }}
        >
          {item.description}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "quantity");
          }}
        >
          {item.quantity}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "labels");
          }}
        >
          {item.labels.join(", ")}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "brand");
          }}
        >
          {item.brand}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "size");
          }}
        >
          {item.size}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "color");
          }}
        >
          {item.color}
        </span>
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        <span
          className={rowStyles.clickableText}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(item, "price");
          }}
        >
          {item.price}
        </span>
      </div>
    </div>
  );
};

export default ItemRow;
