// src/constants/defaultLabels.ts
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faTshirt,
  faPlug,
  faUtensils,
  faCouch,
  faDumbbell,
} from "@fortawesome/free-solid-svg-icons";

interface DefaultLabel {
  label: string;
  icon: IconDefinition;
}

export const defaultLabels: DefaultLabel[] = [
  { label: "Clothes", icon: faTshirt },
  { label: "Electronics", icon: faPlug },
  { label: "Kitchen", icon: faUtensils },
  { label: "Furniture", icon: faCouch },
  { label: "Sport/Wellness", icon: faDumbbell },
];
