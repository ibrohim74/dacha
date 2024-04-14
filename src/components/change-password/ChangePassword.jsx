import React from "react";
import styles from "./ChangePassword.module.css";
import { useTranslation } from "react-i18next";

const ChangePassword = ({ passwords, onSetPasswords }) => {
  const { t } = useTranslation();

  return (
    <div className={styles["change-password-container"]}>
      <div className={styles["change-password-row"]}>
        <div className={styles["change-password-box"]}>
          <label htmlFor="prev-password">{t("current_password")}</label>
          <input
            className={styles["change-password-input"]}
            id="prev-password"
            onChange={(e) =>
              onSetPasswords({ ...passwords, old_password: e.target.value })
            }
          />
        </div>
      </div>

      <div className={styles["change-password-row"]}>
        <div className={styles["change-password-box"]}>
          <label htmlFor="new-password">{t("new_password")}</label>
          <input
            className={styles["change-password-input"]}
            id="new-password"
            onChange={(e) =>
              onSetPasswords({ ...passwords, new_password: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
