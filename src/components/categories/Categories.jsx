import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import { PLACE, VILLAS_ROUTE } from "../../processes/utils/consts";
import { useTranslation } from "react-i18next";

export default function Categories() {
  const { t } = useTranslation();
  return (
    <div className={styles["categories-wrapper"]}>
      <div className={styles["grid-tabs"]}>
        <Link
          to={PLACE}
          className={`${styles["grid-tab"]} ${styles["grid-tab-large"]}`}
        >
          <div className={styles["title-large"]}>{t("map")}</div>
        </Link>
        <Link className={styles["grid-tab"]} to={VILLAS_ROUTE}>
          <div className={styles["title-large"]}>{t("housing")}</div>
          <div className={styles["tab-description"]}>(дачи,отели,тд.)</div>
        </Link>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>{t("food")}</div>
        </div>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>{t("entertainment")}</div>
        </div>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>{t("soon")}</div>
        </div>
      </div>
    </div>
  );
}
