import { CSSProperties, useEffect, useState } from "react";
import { getItems } from "../services/itemsService";
import { Item } from "../types/item";
import ItemRow from "../components/ItemRow";

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Items Page</h1>
      <div style={styles.header}>
        <div style={styles.cell}>
          <strong>Name</strong>
        </div>
        <div style={styles.cell}>
          <strong>Description</strong>
        </div>
        <div style={styles.cell}>
          <strong>Quantity</strong>
        </div>
        <div style={styles.cell}>
          <strong>Labels</strong>
        </div>
        <div style={styles.cell}>
          <strong>Brand</strong>
        </div>
        <div style={styles.cell}>
          <strong>Size</strong>
        </div>
        <div style={styles.cell}>
          <strong>Color</strong>
        </div>
        <div style={styles.cell}>
          <strong>Price</strong>
        </div>
      </div>
      <div style={styles.container}>
        {items.map((item) => (
          <ItemRow key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    borderBottom: "2px solid #000",
    padding: "8px 0",
    backgroundColor: "#f0f0f0",
  },
  cell: {
    flex: 1,
    padding: "0 8px",
    textAlign: "left",
  },
};

export default ItemsPage;
