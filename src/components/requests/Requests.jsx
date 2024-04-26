import React from "react";
import AppLayout from "../appLayout/AppLayout";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import styles from "./Requests.module.css";
import { Link } from "react-router-dom";
import { NEW_REQUEST } from "../../processes/utils/consts";

export default function Requests() {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <PageHeader
        pageTitle={t("requests_title")}
        pageSubtitle={t("requests_subtitle")}
      />
      <FullPageTabs
        tabs={[
          {
            label: t("requests_current"),
            content: (
              <div className={styles["requests-wrapper"]}>
                <EmptyTab placeholderText={t("favs_placeholder")} />
                <Button type="primary">
                  <Link to={NEW_REQUEST}>{t("request_btn")}</Link>
                </Button>
              </div>
            ),
          },
          {
            label: t("requests_history"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
        ]}
      />
    </AppLayout>
  );
}
