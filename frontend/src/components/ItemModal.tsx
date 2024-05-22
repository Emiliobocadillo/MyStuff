import React from "react";
import Modal from "react-modal";
import ItemForm from "./ItemForm";
import { Item } from "../types/item";

Modal.setAppElement("#root"); // Bind modal to your appElement

interface ItemModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onItemAdded: (item: Item) => void;
  item?: Item | null; // Make item optional
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onRequestClose,
  onItemAdded,
  item,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel={item ? "Edit Item" : "Add New Item"}
    >
      <div style={styles.modalContent}>
        <h2 style={styles.header}>{item ? "Edit Item" : "Add New Item"}</h2>
        <ItemForm onItemAdded={onItemAdded} item={item} />
        <button onClick={onRequestClose} style={styles.closeButton}>
          Close
        </button>
      </div>
    </Modal>
  );
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    borderRadius: "8px",
    border: "1px solid #ccc",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "90%",
    maxWidth: "500px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  },
};

const styles: { [key: string]: React.CSSProperties } = {
  modalContent: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "8px",
  },
  header: {
    marginBottom: "20px",
  },
  closeButton: {
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#545a5f",
    color: "#FFF",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ItemModal;
