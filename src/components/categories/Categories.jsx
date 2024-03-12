import { Link } from "react-router-dom";
import styles from "./Categories.module.css";
import { PLACE, VILLAS_ROUTE } from "../../processes/utils/consts";

export default function Categories() {
  return (
    <div className={styles["categories-wrapper"]}>
      <h2 className={styles["section-title"]}>Категории</h2>
      <div className={styles["grid-tabs"]}>
        <Link
          to={PLACE}
          className={`${styles["grid-tab"]} ${styles["grid-tab-large"]}`}
        >
          <div className={styles["title-large"]}>Карта</div>
        </Link>
        <Link className={styles["grid-tab"]} to={VILLAS_ROUTE}>
          <div className={styles["title-large"]}>Жильё</div>
          <div className={styles["tab-description"]}>(дачи,отели,тд.)</div>
        </Link>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>Еда</div>
        </div>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>Развлечение</div>
        </div>
        <div className={styles["grid-tab"]}>
          <div className={styles["title-large"]}>Скоро</div>
        </div>
      </div>
    </div>
  );
}
