import React from "react";
import AppLayout from "../appLayout/AppLayout";
import PageHeader from "../page-header/PageHeader";
import styles from "./Requests.module.css";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";

export default function NewRequest() {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <PageHeader
        pageTitle={t("request_title")}
        pageSubtitle={t("request_subtitle")}
      />
      <div className={styles["new-request-wrapper"]}>
        <div className={styles["request-input"]}>
          <label htmlFor="request-re">{t("request_re")}</label>
          <input
            type="text"
            id="request-re"
            placeholder={t("request_re_placeholder")}
          />
        </div>

        <div className={styles["request-input"]}>
          <label htmlFor="request-body">{t("request_body")}</label>
          <textarea
            name="request-body"
            id="request-body"
            placeholder={t("request_body_placeholder")}
          ></textarea>
        </div>

        <Button type="primary">{t("request_btn")}</Button>
      </div>
    </AppLayout>
  );
}
