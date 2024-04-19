import React from "react";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import styles from "./Notifications.module.css";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/icons";
import { useOutsideClick } from "../../hooks/useOutsideClick";

export default function Notifications({ close }) {
  const { t } = useTranslation();
  const ref = useOutsideClick({ handler: close });

  return (
    <div className={styles["notifications-container"]} ref={ref}>
      <div className={styles["notifications-arrow"]}>
        <Icons.SidebarArrow />
      </div>

      <div className={styles["notifications-wrapper"]}>
        {/* <NotificationsActiveOutlinedIcon />
        <p>{t("no_notifications")}</p> */}
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
}

const NotificationCard = () => {
  return (
    <div className={styles["notification-card-wrapper"]}>
      <div className={styles["notification-card-date"]}>
        <Icons.Calendar />
        <span>11.11.2024,</span>
        <time>21:32</time>
      </div>
      <p className={styles["notification-card-msg"]}>
        У вас новая заявка на бронь
      </p>
    </div>
  );
};
