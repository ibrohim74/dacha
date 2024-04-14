import React from "react";
import AppLayout from "../appLayout/AppLayout";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";

export default function FAQ() {
  const { t } = useTranslation();

  return (
    <AppLayout>
      <PageHeader pageTitle={t("FAQ")} pageSubtitle={t("faq_tab_subtitle")} />
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
            label: t("payment"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("other"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
        ]}
      />
    </AppLayout>
  );
}
