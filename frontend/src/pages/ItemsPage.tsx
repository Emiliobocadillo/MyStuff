// src/pages/ItemsPage.tsx
import React, { useEffect, useState } from "react";
import ItemModal from "../components/ItemModal";
import { Item, NewItem } from "../types/item";
import { useItems } from "../hooks/useItems";
import { useItemsActions } from "../hooks/useItemsActions";
import { filterItems } from "../utils/filterItems";
import styles from "../styles/ItemsPage.module.css";
import ActionBar from "../components/ActionBar";
import ItemTable from "../components/ItemTable";

const ItemsPage: React.FC = () => {
  const { state } = useItems();
  const { items, loading, error } = state;
  const { fetchItems, handleAddItem, handleUpdateItem, handleDeleteItem } =
    useItemsActions();

  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [currentField, setCurrentField] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    setFilteredItems(filterItems(items, filter, searchQuery));
  }, [filter, searchQuery, items]);

  const handleEdit = (item: Item, fieldName?: string) => {
    setCurrentItem(item);
    setCurrentField(fieldName || null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
    setCurrentField(null);
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
        <ItemTable filteredItems={filteredItems} handleEdit={handleEdit} />
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
          item={currentItem}
          fieldName={currentField} // Pass current field name to modal
        />
      </div>
    </div>
  );
};

export default ItemsPage;
