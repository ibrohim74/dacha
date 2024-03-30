import React from "react";
import styles from "./ChangePassword.module.css";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
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
              setInitialState({ ...initialState, old_password: e.target.value })
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
              setInitialState({ ...initialState, new_password: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
