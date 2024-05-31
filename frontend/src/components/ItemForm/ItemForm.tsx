// src/components/ItemForm/ItemForm.tsx
import React, { useState } from "react";
import { Item, NewItem } from "../../types/item";
import LabelSelect from "./LabelSelect";
import styles from "../../styles/ItemForm.module.css"; // Import the CSS module

interface ItemFormProps {
  onItemAdded?: (item: NewItem) => void;
  onItemUpdated?: (item: Item) => void;
  item?: Item | null; // Make item optional
}

const ItemForm: React.FC<ItemFormProps> = ({
  onItemAdded,
  onItemUpdated,
  item,
}) => {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [quantity, setQuantity] = useState<number>(item?.quantity || 0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    item?.labels || []
  );
  const [brand, setBrand] = useState(item?.brand || "");
  const [size, setSize] = useState(item?.size || "");
  const [color, setColor] = useState(item?.color || "");
  const [price, setPrice] = useState<number | undefined>(item?.price);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedLabels = [...selectedLabels].filter((label) => label !== "");

    // Validation
    const emptyFields = [];
    if (!name) emptyFields.push("name");
    if (!quantity) emptyFields.push("quantity");
    if (combinedLabels.length === 0) emptyFields.push("labels");

    if (emptyFields.length > 0) {
      setError(
        `Please fill in the following fields: ${emptyFields.join(", ")}`
      );
      setEmptyFields(emptyFields);
      return;
    }

    const newItem: NewItem = {
      name,
      description,
      quantity,
      labels: combinedLabels,
      brand,
      size,
      color,
      price,
    };

    if (item && onItemUpdated) {
      onItemUpdated({ ...newItem, _id: item._id });
    } else if (onItemAdded) {
      onItemAdded(newItem);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div
        className={`${styles.formGroup} ${
          emptyFields.includes("name") ? styles.error : ""
        }`}
      >
        <label className={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`${styles.input} ${
            emptyFields.includes("name") ? styles.errorInput : ""
          }`}
        />
      </div>

      <div
        className={`${styles.formGroup} ${
          emptyFields.includes("quantity") ? styles.error : ""
        }`}
      >
        <label className={styles.label}>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value > 0) {
              setQuantity(value);
            }
          }}
          required
          className={`${styles.input} ${
            emptyFields.includes("quantity") ? styles.errorInput : ""
          }`}
          min="1"
        />
      </div>

      <LabelSelect
        selectedLabels={selectedLabels}
        setSelectedLabels={setSelectedLabels}
        emptyFields={emptyFields}
      />

      <div className={styles.formGroup}>
        <label className={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${styles.textarea} ${
            emptyFields.includes("description") ? styles.errorInput : ""
          }`}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.addButton}>
        {item ? "Update Item" : "Add Item"}
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};

export default ItemForm;
