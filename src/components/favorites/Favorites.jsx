import React from "react";
import styles from "./Favorites.module.css";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";

export default function Favorites() {
  const { t } = useTranslation();
  return (
    <AppLayout>
      <PageHeader
        pageTitle={t("sidebar_fav")}
        pageSubtitle={t("favs_subtitle")}
      />
      <FullPageTabs
        tabs={[
          {
            label: t("hotels_title"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("cottages_title"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("sights"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("cities"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
        ]}
      />
    </AppLayout>
  );
}
