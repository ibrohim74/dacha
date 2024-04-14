import React from "react";
import AppLayout from "../appLayout/AppLayout";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";

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
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
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
