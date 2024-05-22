import React from "react";
import { Item } from "../types/item";

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit, onDelete }) => {
  return (
    <div style={styles.row}>
      <div style={styles.cell}>{item.name}</div>
      <div style={styles.cell}>{item.description}</div>
      <div style={styles.cell}>{item.quantity}</div>
      <div style={styles.cell}>{item.labels.join(", ")}</div>
      <div style={styles.cell}>{item.brand}</div>
      <div style={styles.cell}>{item.size}</div>
      <div style={styles.cell}>{item.color}</div>
      <div style={styles.cell}>
        {item.price ? `$${item.price.toFixed(2)}` : ""}
      </div>
      <div style={styles.cell}>
        <div style={styles.buttonContainer}>
          <button onClick={() => onEdit(item)} style={styles.editButton}>
            Edit
          </button>
          <button
            onClick={() => onDelete(item._id)}
            style={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  row: {
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #ccc",
    padding: "10px 0",
  },
  cell: {
    flex: 1,
    padding: "0 10px",
    textAlign: "left",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  editButton: {
    marginBottom: "5px",
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "5px 10px",
    backgroundColor: "#FF4136",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ItemRow;
