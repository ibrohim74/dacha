import React from "react";
import { Icons } from "../../assets/icons/icons";
import { useTranslation } from "react-i18next";
import styles from "./Logout.module.css";
import Button from "../Button/Button";

export default function Logout({ onLogout }) {
  const { t } = useTranslation();
  return (
    <div className={styles["logout-modal"]}>
      <div className={styles["logout-icon"]}>
        <Icons.Logout />
      </div>

      <h4>{t("profile_logout_title")}</h4>
      <p>{t("profile_logout_confirmation")}</p>

      <div className={styles["logout-btns"]}>
        <Button type="secondary">{t("cancel")}</Button>
        <Button type="red" onClick={onLogout}>
          {t("logout")}
        </Button>
      </div>
    </div>
  );
}

export const DeleteAccount = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["logout-modal"]}>
      <div className={styles["logout-icon"]}>
        <Icons.Remove />
      </div>

      <h4>{t("profile_delete_account_title")}</h4>
      <p>{t("profile_delete_account_confirmation")}</p>

      <div className={styles["logout-btns"]}>
        <Button type="secondary">{t("cancel")}</Button>
        <Button type="red">{t("delete")}</Button>
      </div>
    </div>
  );
};
