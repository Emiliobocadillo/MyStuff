import React, { useState, useEffect } from "react";
import Select, { MultiValue, StylesConfig, GroupBase } from "react-select";
import { createItem, updateItem } from "../services/itemsService";
import { getLabels } from "../services/labelService";
import { Item, NewItem, UpdatedItem } from "../types/item";
import styles from "../styles/ItemForm.module.css"; // Import the CSS module

interface ItemFormProps {
  onItemAdded: (item: Item) => void;
  item?: Item | null; // Make item optional
}

interface LabelOption {
  value: string;
  label: string;
  isDefault: boolean; // New property to indicate if the label is default
}

const defaultLabels = [
  "Clothes",
  "Electronics",
  "Kitchen",
  "Furniture",
  "Sport/Wellness",
];

const ItemForm: React.FC<ItemFormProps> = ({ onItemAdded, item }) => {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [quantity, setQuantity] = useState<number>(item?.quantity || 0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    item?.labels || []
  );
  const [newLabel, setNewLabel] = useState("");
  const [allLabels, setAllLabels] = useState<GroupBase<LabelOption>[]>([]);
  const [brand, setBrand] = useState(item?.brand || "");
  const [size, setSize] = useState(item?.size || "");
  const [color, setColor] = useState(item?.color || "");
  const [price, setPrice] = useState<number | undefined>(item?.price);
  const [error, setError] = useState<string | null>(null);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const labels = await getLabels();
        const labelOptions: LabelOption[] = labels.map((label) => ({
          value: label,
          label,
          isDefault: defaultLabels.includes(label),
        }));
        const groupedLabels = [
          {
            label: "Default Categories",
            options: labelOptions.filter((option) => option.isDefault),
          },
          {
            label: "Custom Labels",
            options: labelOptions.filter((option) => !option.isDefault),
          },
        ];
        setAllLabels(groupedLabels);
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      }
    };
    fetchLabels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const combinedLabels = [...selectedLabels, ...newLabel.split(",")].filter(
      (label) => label !== ""
    );

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

    try {
      if (item) {
        // Update existing item
        const updatedItem: UpdatedItem = { ...newItem, _id: item._id };
        const result = await updateItem(item._id, updatedItem);
        onItemAdded(result);
      } else {
        // Create new item
        const createdItem = await createItem(newItem);
        onItemAdded(createdItem);
      }
      // Reset form fields
      setName("");
      setDescription("");
      setQuantity(0);
      setSelectedLabels([]);
      setNewLabel("");
      setBrand("");
      setSize("");
      setColor("");
      setPrice(undefined);
      setError(null);
      setEmptyFields([]);
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  const handleSelectChange = (selectedOptions: MultiValue<LabelOption>) => {
    setSelectedLabels(selectedOptions.map((option) => option.value));
  };

  const handleAddNewLabel = () => {
    if (newLabel.trim() !== "") {
      const newLabelOption: LabelOption = {
        value: newLabel,
        label: newLabel,
        isDefault: false,
      };
      const updatedLabels = allLabels.map((group) => {
        if (group.label === "Custom Labels") {
          return {
            ...group,
            options: [...group.options, newLabelOption], // Create a new array with the new label
          };
        }
        return group;
      });
      setAllLabels(updatedLabels);
      setSelectedLabels([...selectedLabels, newLabel]);
      setNewLabel("");
    }
  };

  // Custom styles for react-select
  const customSelectStyles: StylesConfig<LabelOption, true> = {
    control: (provided) => ({
      ...provided,
      borderColor: emptyFields.includes("labels")
        ? "red"
        : provided.borderColor,
      "&:hover": {
        borderColor: emptyFields.includes("labels")
          ? "red"
          : provided.borderColor,
      },
    }),
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
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className={`${styles.input} ${
            emptyFields.includes("quantity") ? styles.errorInput : ""
          }`}
        />
      </div>
      <div
        className={`${styles.formGroup} ${
          emptyFields.includes("labels") ? styles.error : ""
        }`}
      >
        <label className={styles.label}>Labels:</label>
        <Select
          isMulti
          options={allLabels}
          value={allLabels
            .flatMap((group) => group.options)
            .filter((option) => selectedLabels.includes(option.value))}
          onChange={handleSelectChange}
          closeMenuOnSelect={false}
          styles={customSelectStyles}
        />
        <div className={styles.newLabelContainer}>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Add new label"
            className={`${styles.input} ${
              emptyFields.includes("newLabel") ? styles.errorInput : ""
            }`}
          />
          <button
            type="button"
            onClick={handleAddNewLabel}
            className={styles.addButton}
          >
            Add
          </button>
        </div>
      </div>
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
      {error && <p className={styles.errorText}>{error}</p>}
    </form>
  );
};

export default ItemForm;
