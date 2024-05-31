// src/components/ItemForm/LabelSelect.tsx
import React, { useState, useEffect } from "react";
import Select, { MultiValue, StylesConfig, GroupBase } from "react-select";
import { getLabels } from "../../services/labelService";
import styles from "../../styles/ItemForm.module.css"; // Adjust the path if necessary

interface LabelOption {
  value: string;
  label: string;
  isDefault: boolean;
}

const defaultLabels = [
  "Clothes",
  "Electronics",
  "Kitchen",
  "Furniture",
  "Sport/Wellness",
];

interface LabelSelectProps {
  selectedLabels: string[];
  setSelectedLabels: (labels: string[]) => void;
  emptyFields: string[];
}

const LabelSelect: React.FC<LabelSelectProps> = ({
  selectedLabels,
  setSelectedLabels,
  emptyFields,
}) => {
  const [newLabel, setNewLabel] = useState("");
  const [allLabels, setAllLabels] = useState<GroupBase<LabelOption>[]>([]);

  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const labels = await getLabels();
        const labelOptions: LabelOption[] = labels.map((label) => ({
          value: label,
          label,
          isDefault: defaultLabels.includes(label),
        }));
        const groupedLabels = [
          {
            label: "Default Categories",
            options: labelOptions.filter((option) => option.isDefault),
          },
          {
            label: "Custom Labels",
            options: labelOptions.filter((option) => !option.isDefault),
          },
        ];
        setAllLabels(groupedLabels);
      } catch (error) {
        console.error("Failed to fetch labels:", error);
      }
    };
    fetchLabels();
  }, []);

  const handleSelectChange = (selectedOptions: MultiValue<LabelOption>) => {
    setSelectedLabels(selectedOptions.map((option) => option.value));
  };

  const handleAddNewLabel = () => {
    if (newLabel.trim() !== "") {
      const newLabelOption: LabelOption = {
        value: newLabel,
        label: newLabel,
        isDefault: false,
      };
      const updatedLabels = allLabels.map((group) => {
        if (group.label === "Custom Labels") {
          return {
            ...group,
            options: [...group.options, newLabelOption],
          };
        }
        return group;
      });
      setAllLabels(updatedLabels);
      setSelectedLabels([...selectedLabels, newLabel]);
      setNewLabel("");
    }
  };

  const customSelectStyles: StylesConfig<LabelOption, true> = {
    control: (provided) => ({
      ...provided,
      borderColor: emptyFields.includes("labels")
        ? "red"
        : provided.borderColor,
      "&:hover": {
        borderColor: emptyFields.includes("labels")
          ? "red"
          : provided.borderColor,
      },
    }),
  };

  return (
    <div
      className={`${styles.formGroup} ${
        emptyFields.includes("labels") ? styles.error : ""
      }`}
    >
      <label className={styles.label}>Labels:</label>
      <Select
        isMulti
        options={allLabels}
        value={allLabels
          .flatMap((group) => group.options)
          .filter((option) => selectedLabels.includes(option.value))}
        onChange={handleSelectChange}
        closeMenuOnSelect={false}
        styles={customSelectStyles}
      />
      <div className={styles.newLabelContainer}>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Add new label"
          className={`${styles.input} ${
            emptyFields.includes("newLabel") ? styles.errorInput : ""
          }`}
        />
        <button
          type="button"
          onClick={handleAddNewLabel}
          className={styles.addButton}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default LabelSelect;
