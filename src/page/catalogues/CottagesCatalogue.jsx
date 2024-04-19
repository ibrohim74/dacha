import { useTranslation } from "react-i18next";
import Catalogue from "../../components/catalogue/Catalogue";
import { useGetAllDachasQuery } from "../../servises/cottagesAPI";

export default function CottagesCatalogue() {
  const { data: cottages, error, isLoading } = useGetAllDachasQuery();
  const { t } = useTranslation();

  return (
    <Catalogue
      products={cottages}
      isLoading={isLoading}
      currentTab={t("cottages_title")}
    />
  );
}
