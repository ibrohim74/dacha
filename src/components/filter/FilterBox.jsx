import React from "react";
import styles from "./Filter.module.css";

export function FilterBox({ children, onClick, isSelected }) {
  return (
    <div
      className={`${styles["filter-box"]} ${
        isSelected ? styles["filter-box-selected"] : ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
