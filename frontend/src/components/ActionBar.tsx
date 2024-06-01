import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/ItemsPage.module.css"; // Adjust the path if necessary
import { defaultLabels } from "../constants/defaultLabels"; // Import default labels

interface ActionBarProps {
  setIsModalOpen: (isOpen: boolean) => void;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string | null;
  setFilter: (filter: string | null) => void;
  handleFilter: (label: string) => void;
}

const ActionBar: React.FC<ActionBarProps> = ({
  setIsModalOpen,
  searchQuery,
  handleSearchChange,
  filter,
  setFilter,
  handleFilter,
}) => {
  return (
    <div className={styles.actionBar}>
      <button onClick={() => setIsModalOpen(true)} className={styles.addButton}>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
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
        {defaultLabels.map(({ label, icon }) => (
          <button
            key={label}
            onClick={() => handleFilter(label)}
            className={`${styles.filterButton} ${
              filter === label ? styles.activeFilter : ""
            }`}
          >
            <FontAwesomeIcon
              icon={icon}
              className={filter === label ? "fa-spin" : ""}
              style={{ marginRight: "8px" }}
            />
            {label}
          </button>
        ))}
        <button
          onClick={() => setFilter(null)}
          className={`${styles.filterButton} ${
            filter === null ? styles.activeFilter : ""
          }`}
        >
          <FontAwesomeIcon
            icon={faBars}
            className={filter === null ? "fa-spin" : ""}
            style={{ marginRight: "8px" }}
          />
          All
        </button>
      </div>
    </div>
  );
};

export default ActionBar;
