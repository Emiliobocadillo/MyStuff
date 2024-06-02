import React from "react";
import Modal from "react-modal";
import ItemForm from "./ItemForm/ItemForm";
import { Item, NewItem } from "../types/item";
import styles from "../styles/ItemModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

interface ItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onAddItem: (item: NewItem) => void;
  onUpdateItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
  item?: Item | null;
  fieldName?: string | null;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onRequestClose,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  item,
  fieldName,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modalContent}
      overlayClassName={styles.customOverlay}
      contentLabel={item ? "Edit Item" : "Add New Item"}
    >
      <div>
        <h2 className={styles.header}>{item ? "Edit Item" : "Add New Item"}</h2>
        <ItemForm
          onItemAdded={onAddItem}
          onItemUpdated={onUpdateItem}
          item={item}
          fieldName={fieldName} // Pass field name to ItemForm
        />
        <div className={styles.buttonGroup}>
          <button onClick={onRequestClose} className={styles.closeButton}>
            <FontAwesomeIcon icon={faTimes} style={{ marginRight: "8px" }} />
            Close
          </button>
          {item && (
            <button
              onClick={() => onDeleteItem(item._id)}
              className={styles.deleteButton}
            >
              <FontAwesomeIcon icon={faTrash} style={{ marginRight: "8px" }} />
              Delete Item
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ItemModal;
