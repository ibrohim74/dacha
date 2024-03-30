import React, { useState } from "react";
import styles from "./AccordionItem.module.css";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
} from "@mui/icons-material";

export default function AccordionItem({ title, content }) {
  const [isOpen, setisOpen] = useState(false);

  const handleOpen = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className={styles["accordion-wrapper"]}>
      <button
        className={`${styles["accordion-btn"]} ${
          isOpen ? styles["accordion-open-btn"] : ""
        }`}
        onClick={handleOpen}
      >
        {title}
        {isOpen ? <KeyboardArrowUpOutlined /> : <KeyboardArrowDownOutlined />}
      </button>

      {isOpen && <div className={styles["accordion-content"]}>{content}</div>}
    </div>
  );
}
