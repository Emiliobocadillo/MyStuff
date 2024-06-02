import React from "react";
import { Item } from "../types/item";
import ItemRow from "./ItemRow";
import tableStyles from "../styles/ItemTable.module.css";

interface ItemTableProps {
  filteredItems: Item[];
  handleEdit: (item: Item) => void;
}

const ItemTable: React.FC<ItemTableProps> = ({ filteredItems, handleEdit }) => {
  return (
    <div className={tableStyles.tableContainer}>
      <div className={`${tableStyles.tableHeader} ${tableStyles.row}`}>
        <div className={tableStyles.cell}>Name</div>
        <div className={tableStyles.cell}>Description</div>
        <div className={tableStyles.cell}>Quantity</div>
        <div className={tableStyles.cell}>Labels</div>
        <div className={tableStyles.cell}>Brand</div>
        <div className={tableStyles.cell}>Size</div>
        <div className={tableStyles.cell}>Color</div>
        <div className={tableStyles.cell}>Price</div>
      </div>
      <div className={tableStyles.tableBody}>
        {filteredItems.map((item) => (
          <ItemRow key={item._id} item={item} onEdit={handleEdit} />
        ))}
      </div>
    </div>
  );
};

export default ItemTable;
