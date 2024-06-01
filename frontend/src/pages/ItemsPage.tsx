// src/pages/ItemsPage.tsx
import React, { useEffect, useState } from "react";
import ItemRow from "../components/ItemRow";
import ItemModal from "../components/ItemModal";
import { Item, NewItem } from "../types/item";
import { useItems } from "../hooks/useItems";
import { useItemsActions } from "../hooks/useItemsActions";
import { filterItems } from "../utils/filterItems";
import styles from "../styles/ItemsPage.module.css";
import ActionBar from "../components/ActionBar"; // Import the new ActionBar component

const ItemsPage: React.FC = () => {
  const { state } = useItems();
  const { items, loading, error } = state;
  const { fetchItems, handleAddItem, handleUpdateItem, handleDeleteItem } =
    useItemsActions();

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setFilteredItems(filterItems(items, filter, searchQuery));
  }, [filter, searchQuery, items]);

  const handleEdit = (item: Item) => {
    setCurrentItem(item);
    setIsModalOpen(true);
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
    <div className={isModalOpen ? styles.blurred : ""}>
      <div className={styles.container}>
        <h1>Items Page</h1>
        <ActionBar
          setIsModalOpen={setIsModalOpen}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          filter={filter}
          setFilter={setFilter}
          handleFilter={handleFilter}
        />
        <div className={styles.tableContainer}>
          <div className={`${styles.header} ${styles.row}`}>
            <div className={styles.cell}>Name</div>
            <div className={styles.cell}>Description</div>
            <div className={styles.cell}>Quantity</div>
            <div className={styles.cell}>Labels</div>
            <div className={styles.cell}>Brand</div>
            <div className={styles.cell}>Size</div>
            <div className={styles.cell}>Color</div>
            <div className={styles.cell}>Price</div>
          </div>
          <div className={styles.tableBody}>
            {filteredItems.map((item) => (
              <ItemRow key={item._id} item={item} onEdit={handleEdit} />
            ))}
          </div>
        </div>
        <ItemModal
          isOpen={isModalOpen}
          onRequestClose={handleModalClose}
          onAddItem={(newItem: NewItem) =>
            handleAddItem(newItem, handleModalClose)
          }
          onUpdateItem={(updatedItem: Item) =>
            handleUpdateItem(updatedItem, handleModalClose)
          }
          onDeleteItem={(itemId: string) =>
            handleDeleteItem(itemId, handleModalClose)
          }
          item={currentItem} // Pass the current item to the modal for editing
        />
      </div>
    </div>
  );
};

export default ItemsPage;
