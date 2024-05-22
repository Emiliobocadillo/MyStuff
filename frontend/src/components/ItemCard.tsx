import React from "react";
import { Item } from "../types/item";

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{item.name}</h2>
      {item.description && <p style={styles.description}>{item.description}</p>}
      <p>
        <strong>Quantity:</strong> {item.quantity}
      </p>
      {item.labels && (
        <p>
          <strong>Labels:</strong> {item.labels.join(", ")}
        </p>
      )}
      {item.brand && (
        <p>
          <strong>Brand:</strong> {item.brand}
        </p>
      )}
      {item.size && (
        <p>
          <strong>Size:</strong> {item.size}
        </p>
      )}
      {item.color && (
        <p>
          <strong>Color:</strong> {item.color}
        </p>
      )}
      {item.price && (
        <p>
          <strong>Price:</strong> ${item.price.toFixed(2)}
        </p>
      )}
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0 0 8px",
  },
  description: {
    margin: "0 0 16px",
  },
};

export default ItemCard;
