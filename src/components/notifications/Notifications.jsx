import React from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import styles from "./Notifications.module.css";
import { useTranslation } from "react-i18next";

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <div className={styles["notifications-container"]}>
      <div className={styles["notifications-wrapper"]}>
        <NotificationsActiveOutlinedIcon />
        <p>{t("no_notifications")}</p>
      </div>
    </div>
  );
}
