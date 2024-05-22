import { CSSProperties } from "react";
import { Item } from "../types/item";

interface ItemRowProps {
  item: Item;
}

const ItemRow: React.FC<ItemRowProps> = ({ item }) => {
  return (
    <div style={styles.row}>
      <div style={styles.cell}>
        <strong>{item.name}</strong>
      </div>
      <div style={styles.cell}>{item.description || ""}</div>
      <div style={styles.cell}>{item.quantity}</div>
      <div style={styles.cell}>{item.labels.join(", ")}</div>
      <div style={styles.cell}>{item.brand || ""}</div>
      <div style={styles.cell}>{item.size || ""}</div>
      <div style={styles.cell}>{item.color || ""}</div>
      <div style={styles.cell}>
        {item.price !== undefined ? `$${item.price.toFixed(2)}` : ""}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  row: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    padding: "8px 0",
  },
  cell: {
    flex: 1,
    padding: "0 8px",
    textAlign: "left",
  },
};

export default ItemRow;
