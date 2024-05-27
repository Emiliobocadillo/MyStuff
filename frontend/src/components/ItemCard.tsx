import React from "react";
import { Item } from "../types/item";
import styles from "../styles/ItemCard.module.css"; // Import the CSS module

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{item.name}</h2>
      {item.description && (
        <p className={styles.description}>{item.description}</p>
      )}
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

export default ItemCard;
