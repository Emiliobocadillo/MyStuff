import React from "react";
import { Item } from "../types/item";
import tableStyles from "../styles/ItemTable.module.css";
import rowStyles from "../styles/ItemRow.module.css";

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({ item, onEdit }) => {
  return (
    <div
      className={`${tableStyles.row} ${rowStyles.row}`}
      onClick={() => onEdit(item)}
    >
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>{item.name}</div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.description}
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.quantity}
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.labels.join(", ")}
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.brand}
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>{item.size}</div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.color}
      </div>
      <div className={`${tableStyles.cell} ${rowStyles.cell}`}>
        {item.price}
      </div>
    </div>
  );
};

export default ItemRow;
