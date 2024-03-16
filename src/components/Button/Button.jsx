import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, type, onClick }) {
  return (
    <button
      className={`${styles["btn"]} ${styles[`${type}`]}`}
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
