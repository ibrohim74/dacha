import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, type, onClick, disabled = false }) {
  return (
    <button
      className={`${styles["btn"]} ${styles[`${type}`]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
    </button>
  );
}
