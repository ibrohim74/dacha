import React, { useState } from "react";
import styles from "./FilterServices.module.css";
import i18next from "i18next";

const tags = [
  { id: "parking", name: i18next.t("tag_parking") },
  { id: "wifi", name: i18next.t("tag_wifi") },
  { id: "breakfast", name: i18next.t("tag_breakfast") },
  { id: "pool", name: i18next.t("tag_pool") },
  { id: "airconditioner", name: i18next.t("tag_airconditioner") },
];

export default function FilterServices() {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (id) => {
    const isSelected = selectedTags.includes(id);

    setSelectedTags((prevSelectedTags) => {
      if (isSelected) {
        return prevSelectedTags.filter((tag) => tag !== id);
      } else {
        return [...prevSelectedTags, id];
      }
    });

    console.log(selectedTags);
  };

  return (
    <ul className={styles["filter-tags"]}>
      {tags.map((tag) => (
        <li
          className={styles["filter-tag-wrapper"]}
          key={tag.id}
          onClick={() => handleTagChange(tag.id)}
        >
          <label htmlFor={tag.id}>{tag.name}</label>
          <div
            className={`${styles["filter-item-tag"]} ${
              selectedTags.includes(tag.id) ? styles["checked"] : ""
            }`}
            role="checkbox"
            aria-checked={selectedTags.includes(tag.id)}
            id={tag.id}
          />
        </li>
      ))}
    </ul>
  );
}
