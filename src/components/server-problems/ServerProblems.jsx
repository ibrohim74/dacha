import React from "react";
import { Icons } from "../../assets/icons/icons";
import styles from "./ServerProblems.module.css";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

export default function ServerProblems() {
  const { t } = useTranslation();
  return (
    <div className={styles["server-problems-container"]}>
      <div className={styles["server-problems-wrapper"]}>
        <div className={styles["server-problems-descr"]}>
          <Icons.CloudInTrouble />
          <div className={styles["server-problems-text"]}>
            <h4>{t("server_problems_title")}</h4>
            <p>{t("server_problems_descr")}</p>
          </div>
        </div>
        <Button type="white-and-red">{t("reload")}</Button>
      </div>
    </div>
  );
}
