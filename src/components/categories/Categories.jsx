import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import {
  COTTAGES_CATALOGUE_ROUTE,
  PLACE,
  VILLAS_ROUTE,
} from "../../processes/utils/consts";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/icons";

export default function Categories() {
  const { t } = useTranslation();
  return (
    <div className={styles["categories-wrapper"]}>
      <CategoryCard category={t("map")} icon={<Icons.Map />} route="" />
      <CategoryCard
        category={t("housing")}
        icon={<Icons.Housing />}
        route={COTTAGES_CATALOGUE_ROUTE}
      />
      <CategoryCard category={t("food")} icon={<Icons.Food />} route="" />
      <CategoryCard
        category={t("entertainment")}
        icon={<Icons.Entertainment />}
        route=""
      />
      <CategoryCard category={t("soon")} icon={<Icons.Folder />} route="" />
    </div>
  );
}

function CategoryCard({ icon, category, route }) {
  return (
    <Link to={route} className={styles["category-link-wrapper"]}>
      <div className={styles["category"]}>
        {icon}
        <p>{category}</p>
      </div>
    </Link>
  );
}
