// src/components/ItemForm/LabelSelect.tsx
import React, { useState, useEffect } from "react";
import Select, {
  MultiValue,
  StylesConfig,
  GroupBase,
  components,
  OptionProps,
  SingleValueProps,
} from "react-select";
import { getLabels } from "../../services/labelService";
import { defaultLabels } from "../../constants/defaultLabels"; // Import default labels
import styles from "../../styles/ItemForm.module.css"; // Adjust the path if necessary
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface LabelOption {
  value: string;
  label: string;
  icon?: IconDefinition;
  isDefault: boolean;
}

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
        const customLabels = await getLabels();
        const labelOptions: LabelOption[] = [
          ...defaultLabels.map((labelObj) => ({
            value: labelObj.label,
            label: labelObj.label,
            icon: labelObj.icon,
            isDefault: true,
          })),
          ...customLabels
            .filter(
              (label) =>
                !defaultLabels.some(
                  (defaultLabel) => defaultLabel.label === label
                )
            )
            .map((label) => ({
              value: label,
              label,
              isDefault: false,
            })),
        ];
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
      // Check if the new label already exists
      const existingLabel = allLabels
        .flatMap((group) => group.options)
        .find(
          (option) => option.label.toLowerCase() === newLabel.toLowerCase()
        );

      if (existingLabel) {
        alert("This label already exists. Please enter a different label.");
        setNewLabel("");
        return;
      }

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

  // Custom Option component to include icons
  const Option = (props: OptionProps<LabelOption>) => {
    return (
      <components.Option {...props}>
        {props.data.icon && (
          <FontAwesomeIcon
            icon={props.data.icon}
            style={{ marginRight: "8px" }}
          />
        )}
        {props.data.label}
      </components.Option>
    );
  };

  // Custom SingleValue component to include icons
  const SingleValue = (props: SingleValueProps<LabelOption>) => {
    return (
      <components.SingleValue {...props}>
        {props.data.icon && (
          <FontAwesomeIcon
            icon={props.data.icon}
            style={{ marginRight: "8px" }}
          />
        )}
        {props.data.label}
      </components.SingleValue>
    );
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
        components={{ Option, SingleValue }} // Use custom components
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
