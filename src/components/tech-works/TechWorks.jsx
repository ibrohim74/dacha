import React from "react";
import Button from "../Button/Button";
import styles from "./TechWorks.module.css";
import { useTranslation } from "react-i18next";

export default function TechWorks() {
  const { t } = useTranslation();
  return (
    <div className={styles["tech-works-container"]}>
      <div className={styles["tech-works-wrapper"]}>
        <img src={require("../../assets/tech-works.png")} alt="tech-works" />
        <h2>{t("tech_works_title")}</h2>
        <p>{t("tech_works_descr")}</p>

        <div className={styles["tech-works-btn"]}>
          <Button type="full-width-primary">{t("reload")}</Button>
        </div>
      </div>
    </div>
  );
}
