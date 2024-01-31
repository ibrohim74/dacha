import React from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={`${styles["footer"]} ${styles["container-md"]}`}>
      <div className={styles["footer-top"]}>
        <div className={styles["chat-icon"]}>
          <Icons.Chat />
        </div>
      </div>
      <div className={styles["footer-bottom"]}>
        <div>
          <div className={styles["footer-text"]}>В приложени ещё удобнее</div>
          <div className={`${styles["footer-text"]} ${styles["btn"]}`}>
            О компании
          </div>
        </div>
        <div>
          <Icons.AppStore className={styles["btn"]} />
          <Icons.GooglePlay className={styles["btn"]} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
