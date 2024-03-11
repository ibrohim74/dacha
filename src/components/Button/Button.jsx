import React from "react";
import styles from "./Button.module.css";

export default function Button({ children, type }) {
  return (
    <button className={`${styles["btn"]} ${styles[`${type}`]}`}>
      {children}
    </button>
  );
}
