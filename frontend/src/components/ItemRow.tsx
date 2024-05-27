import React from "react";
import { Item } from "../types/item";
import styles from "../styles/ItemRow.module.css"; // Import the CSS module

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit }) => {
  return (
    <div className={styles.row} onClick={() => onEdit(item)}>
      <div className={styles.cell}>{item.name}</div>
      <div className={styles.cell}>{item.description}</div>
      <div className={styles.cell}>{item.quantity}</div>
      <div className={styles.cell}>{item.labels.join(", ")}</div>
      <div className={styles.cell}>{item.brand}</div>
      <div className={styles.cell}>{item.size}</div>
      <div className={styles.cell}>{item.color}</div>
      <div className={styles.cell}>
        {item.price ? `$${item.price.toFixed(2)}` : ""}
      </div>
    </div>
  );
};

export default ItemRow;
