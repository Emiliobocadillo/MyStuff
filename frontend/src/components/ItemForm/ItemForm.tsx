// src/components/ItemForm/ItemForm.tsx
import React, { useEffect, useRef, useState } from "react";
import { Item, NewItem } from "../../types/item";
import LabelSelect from "./LabelSelect";
import styles from "../../styles/ItemForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit } from "@fortawesome/free-solid-svg-icons";

interface ItemFormProps {
  onItemAdded?: (item: NewItem) => void;
  onItemUpdated?: (item: Item) => void;
  item?: Item | null;
  fieldName?: string | null;
}

const ItemForm: React.FC<ItemFormProps> = ({
  onItemAdded,
  onItemUpdated,
  item,
  fieldName,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const labelsRef = useRef<HTMLInputElement>(null);
  const brandRef = useRef<HTMLInputElement>(null);
  const sizeRef = useRef<HTMLInputElement>(null);
  const colorRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const focusField = () => {
      switch (fieldName) {
        case "name":
          nameRef.current?.focus();
          nameRef.current?.select();
          break;
        case "description":
          descriptionRef.current?.focus();
          descriptionRef.current?.select();
          break;
        case "quantity":
          quantityRef.current?.focus();
          quantityRef.current?.select();
          break;
        case "labels":
          labelsRef.current?.focus();
          labelsRef.current?.select();
          break;
        case "brand":
          brandRef.current?.focus();
          brandRef.current?.select();
          break;
        case "size":
          sizeRef.current?.focus();
          sizeRef.current?.select();
          break;
        case "color":
          colorRef.current?.focus();
          colorRef.current?.select();
          break;
        case "price":
          priceRef.current?.focus();
          priceRef.current?.select();
          break;
        default:
          break;
      }
    };

    if (fieldName) {
      focusField();
    }
  }, [fieldName]);

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
          ref={nameRef}
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
          ref={quantityRef}
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
          ref={descriptionRef}
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
          ref={brandRef}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Size:</label>
        <input
          type="text"
          ref={sizeRef}
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Color:</label>
        <input
          type="text"
          ref={colorRef}
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Price:</label>
        <input
          type="number"
          ref={priceRef}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className={styles.input}
        />
      </div>

      <button type="submit" className={styles.addButton}>
        <FontAwesomeIcon
          icon={item ? faEdit : faPlus}
          style={{ marginRight: "8px" }}
        />
        {item ? "Update Item" : "Add Item"}
      </button>
      {error && <div className={styles.errorMessage}>{error}</div>}
    </form>
  );
};

export default ItemForm;
