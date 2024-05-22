import React, { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { createItem, updateItem } from "../services/itemsService";
import { getLabels } from "../services/labelService";
import { Item, NewItem, UpdatedItem } from "../types/item";

interface ItemFormProps {
  onItemAdded: (item: Item) => void;
  item?: Item | null; // Make item optional
}

interface LabelOption {
  value: string;
  label: string;
}

const ItemForm: React.FC<ItemFormProps> = ({ onItemAdded, item }) => {
  const [name, setName] = useState(item?.name || "");
  const [description, setDescription] = useState(item?.description || "");
  const [quantity, setQuantity] = useState<number>(item?.quantity || 0);
  const [selectedLabels, setSelectedLabels] = useState<string[]>(
    item?.labels || []
  );
  const [newLabel, setNewLabel] = useState("");
  const [allLabels, setAllLabels] = useState<LabelOption[]>([]);
  const [brand, setBrand] = useState(item?.brand || "");
  const [size, setSize] = useState(item?.size || "");
  const [color, setColor] = useState(item?.color || "");
  const [price, setPrice] = useState<number | undefined>(item?.price);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const labels = await getLabels();
        setAllLabels(labels.map((label) => ({ value: label, label })));
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
    } catch (error) {
      console.error("Failed to save item:", error);
    }
  };

  const handleSelectChange = (selectedOptions: MultiValue<LabelOption>) => {
    setSelectedLabels(selectedOptions.map((option) => option.value));
  };

  const handleAddNewLabel = () => {
    if (newLabel.trim() !== "") {
      const newLabelOption: LabelOption = { value: newLabel, label: newLabel };
      setAllLabels([...allLabels, newLabelOption]);
      setSelectedLabels([...selectedLabels, newLabel]);
      setNewLabel("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Description:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Labels:</label>
        <Select
          isMulti
          options={allLabels}
          value={allLabels.filter((option) =>
            selectedLabels.includes(option.value)
          )}
          onChange={handleSelectChange}
          closeMenuOnSelect={false}
        />
        <div style={styles.newLabelContainer}>
          <input
            type="text"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="Add new label"
            style={styles.input}
          />
          <button
            type="button"
            onClick={handleAddNewLabel}
            style={styles.addButton}
          >
            Add
          </button>
        </div>
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Brand:</label>
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Size:</label>
        <input
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Color:</label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          style={styles.input}
        />
      </div>
      <button type="submit" style={styles.addButton}>
        {item ? "Update Item" : "Add Item"}
      </button>
    </form>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  newLabelContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  addButton: {
    padding: "5px 10px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  formControl: {
    marginBottom: "15px",
  },
};

export default ItemForm;
