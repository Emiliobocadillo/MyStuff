import React from "react";
import { Item } from "../types/item";
import styles from "../styles/ItemRow.module.css"; // Import the CSS module

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div className={styles.row}>
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
      <div className={styles.cell}>
        <div className={styles.buttonContainer}>
          <button onClick={() => onEdit(item)} className={styles.editButton}>
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemRow;
