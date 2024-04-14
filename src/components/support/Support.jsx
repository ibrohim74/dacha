import { Icons } from "../../assets/icons/icons";
import { ChevronRightOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import styles from "./Support.module.css";
import { useTranslation } from "react-i18next";
import FAQ from "../faq/FAQ";
import { FAQ_ROUTE, REQUESTS_ROUTE } from "../../processes/utils/consts";

export default function Support() {
  const { t } = useTranslation();
  return (
    <div className={styles["support-container"]}>
      <ul className={styles["support-list"]}>
        <Link to={REQUESTS_ROUTE} className={styles["support-list-link"]}>
          <li className={styles["support-list-item"]}>
            <div className={styles["support-li-wrapper"]}>
              <Icons.Requests />
              <p>{t("support_requests")}</p>
            </div>
            <ChevronRightOutlined />
          </li>
        </Link>
        <Link to={FAQ_ROUTE} className={styles["support-list-link"]}>
          <li className={styles["support-list-item"]}>
            <div className={styles["support-li-wrapper"]}>
              <Icons.FAQ />
              <p>{t("support_faq")}</p>
            </div>
            <ChevronRightOutlined />
          </li>
        </Link>
        <Link className={styles["support-list-link"]}>
          <li className={styles["support-list-item"]}>
            <div className={styles["support-li-wrapper"]}>
              <Icons.Chat />
              <p>{t("support_chat")}</p>
            </div>
            <ChevronRightOutlined />
          </li>
        </Link>
        <Link className={styles["support-list-link"]}>
          <li className={styles["support-list-item"]}>
            <div className={styles["support-li-wrapper"]}>
              <Icons.History />
              <p>{t("support_requests_history")}</p>
            </div>
            <ChevronRightOutlined />
          </li>
        </Link>
      </ul>
    </div>
  );
}
