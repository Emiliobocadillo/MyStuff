import React from "react";
import Modal from "react-modal";
import ItemForm from "./ItemForm";
import { Item, NewItem } from "../types/item";
import styles from "../styles/ItemModal.module.css"; // Import the CSS module

Modal.setAppElement("#root"); // Bind modal to your appElement

interface ItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddItem: (item: NewItem) => void;
  onUpdateItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
  item?: Item | null; // Make item optional
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onRequestClose,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  item,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent} // Apply modal content styles
      overlayClassName={styles.customOverlay} // Apply overlay styles
      contentLabel={item ? "Edit Item" : "Add New Item"}
    >
      <div>
        <h2 className={styles.header}>{item ? "Edit Item" : "Add New Item"}</h2>
        <ItemForm
          onItemAdded={onAddItem}
          onItemUpdated={onUpdateItem}
          item={item}
        />
        <div className={styles.buttonGroup}>
          <button onClick={onRequestClose} className={styles.closeButton}>
            Close
          </button>
          {item && (
            <button
              onClick={() => onDeleteItem(item._id)}
              className={styles.deleteButton}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
