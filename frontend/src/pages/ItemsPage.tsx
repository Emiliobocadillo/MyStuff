import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, deleteItem } from "../services/itemsService";
import ItemRow from "../components/ItemRow";
import ItemModal from "../components/ItemModal";
import { Item } from "../types/item";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/ItemsPage.module.css";

const ItemsPage: React.FC = () => {
  const { userEmail } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      navigate("/login");
      return;
    }

    const fetchItems = async () => {
      try {
        const items = await getItems();
        setItems(items);
        setFilteredItems(items); // Initialize filtered items
      } catch (error) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [userEmail, navigate]);

  useEffect(() => {
    let filtered = items;

    if (filter) {
      filtered = filtered.filter((item) => item.labels.includes(filter));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          (item.description &&
            item.description.toLowerCase().includes(query)) ||
          item.labels.some((label) => label.toLowerCase().includes(query)) ||
          (item.brand && item.brand.toLowerCase().includes(query)) ||
          (item.size && item.size.toLowerCase().includes(query)) ||
          (item.color && item.color.toLowerCase().includes(query))
      );
    }

    setFilteredItems(filtered);
  }, [filter, searchQuery, items]);

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirmed) {
      return;
    }

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

  const handleFilter = (label: string) => {
    setFilter(label);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1>Items Page</h1>
      <div className={styles.actionBar}>
        <button
          onClick={() => setIsModalOpen(true)}
          className={styles.addButton}
        >
          Add New Item
        </button>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <div className={styles.filterButtons}>
          {[
            "Clothes",
            "Electronics",
            "Kitchen",
            "Furniture",
            "Sport/Wellness",
          ].map((label) => (
            <button
              key={label}
              onClick={() => handleFilter(label)}
              className={`${styles.filterButton} ${
                filter === label ? styles.activeFilter : ""
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setFilter(null)}
            className={`${styles.filterButton} ${
              filter === null ? styles.activeFilter : ""
            }`}
          >
            All
          </button>
        </div>
      </div>
      <div className={styles.table}>
        <div className={`${styles.header} ${styles.row}`}>
          <div className={styles.cell}>Name</div>
          <div className={styles.cell}>Description</div>
          <div className={styles.cell}>Quantity</div>
          <div className={styles.cell}>Labels</div>
          <div className={styles.cell}>Brand</div>
          <div className={styles.cell}>Size</div>
          <div className={styles.cell}>Color</div>
          <div className={styles.cell}>Price</div>
          <div className={styles.cell}>Actions</div>
        </div>
        {filteredItems.map((item) => (
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

export default ItemsPage;
