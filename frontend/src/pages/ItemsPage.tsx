import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/itemsService";
import ItemRow from "../components/ItemRow";
import ItemModal from "../components/ItemModal";
import { Item } from "../types/item";

const ItemsPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await getItems();
        setItems(items);
      } catch (error) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    try {
      await deleteItem(itemId);
      setItems(items.filter((item) => item._id !== itemId));
    } catch (error) {
      setError("Failed to delete item.");
    }
  };

  const handleItemAdded = (updatedItem: Item) => {
    setItems((prevItems) => {
      const itemIndex = prevItems.findIndex(
        (item) => item._id === updatedItem._id
      );
      if (itemIndex !== -1) {
        // Update existing item
        const newItems = [...prevItems];
        newItems[itemIndex] = updatedItem;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, updatedItem];
      }
    });
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Items Page</h1>
      <button onClick={() => setIsModalOpen(true)} style={styles.addButton}>
        Add New Item
      </button>
      <div style={styles.table}>
        <div style={styles.header}>
          <div style={styles.cell}>Name</div>
          <div style={styles.cell}>Description</div>
          <div style={styles.cell}>Quantity</div>
          <div style={styles.cell}>Labels</div>
          <div style={styles.cell}>Brand</div>
          <div style={styles.cell}>Size</div>
          <div style={styles.cell}>Color</div>
          <div style={styles.cell}>Price</div>
          <div style={styles.cell}>Actions</div>
        </div>
        {items.map((item) => (
          <ItemRow
            key={item._id}
            item={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <ItemModal
        isOpen={isModalOpen}
        onRequestClose={handleModalClose}
        onItemAdded={handleItemAdded}
        item={currentItem} // Pass the current item to the modal for editing
      />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  },
  cell: {
    flex: 1,
    padding: "0 10px",
    textAlign: "left",
    fontWeight: "bold",
  },
  addButton: {
    marginBottom: "20px",
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ItemsPage;
