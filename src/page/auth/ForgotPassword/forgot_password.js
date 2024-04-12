import React from "react";
import AuthTemplate from "../AuthTemplate/AuthTemplate";
import styles from "./ForgotPassword.module.css";
import Button from "../../../components/Button/Button";
import { useTranslation } from "react-i18next";

const ForgotPassword = () => {
  const { t } = useTranslation();
  return (
    <AuthTemplate>
      <div className={styles["forgot-password-wrapper"]}>
        <h4>{t("auth_password_recovery")}</h4>
        <div className={styles["input-row"]}>
          <label htmlFor="email">{t("auth_password_recovery_email")}</label>
          <input
            type="email"
            id="email"
            placeholder={t("auth_password_recovery_email_placecholder")}
            required
            onChange={(e) => {}}
          />
        </div>

        {/* <div className={styles["forgot-password-confirm"]}>
          <p>
            {t("auth_email_sent")} {t("auth_code_sent")}
          </p>
          <div className={styles["input-row"]}>
            <label htmlFor="confirm-code">{t("auth_confirmation_code")}</label>
            <input
              type="number"
              id="confirm-code"
              placeholder={t("auth_confirmation_code_placeholder")}
              required
              onChange={(e) => {}}
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="new-password">{t("auth_new_password")}</label>
            <input
              type="password"
              id="new-password"
              placeholder={t("auth_new_password_placeholder")}
              required
              onChange={(e) => {}}
            />
          </div>

          <div className={styles["input-row"]}>
            <label htmlFor="confirm-password">
              {t("auth_new_password_confirm")}
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder={t("auth_new_password_confirm_placeholder")}
              required
              onChange={(e) => {}}
            />
          </div>
        </div> */}
        <Button type="full-width-primary">{t("send")}</Button>
      </div>
    </AuthTemplate>
  );
};

export default ForgotPassword;
