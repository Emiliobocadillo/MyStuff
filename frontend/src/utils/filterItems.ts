// src/utils/filterItems.ts
import { Item } from "../types/item";

export const filterItems = (
  items: Item[],
  filter: string | null,
  searchQuery: string
): Item[] => {
  let filtered = items;

  if (filter) {
    filtered = filtered.filter((item) => item.labels.includes(filter));
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        item.labels.some((label) => label.toLowerCase().includes(query)) ||
        (item.brand && item.brand.toLowerCase().includes(query)) ||
        (item.size && item.size.toLowerCase().includes(query)) ||
        (item.color && item.color.toLowerCase().includes(query))
    );
  }

  return filtered;
};
