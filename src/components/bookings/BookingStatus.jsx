import React from "react";
import styles from "./Bookings.module.css";
import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/icons";

export const BookingStatus = ({ status }) => {
  const { t } = useTranslation();

  // BOOKING_STATUS_LIST = ["finished", "deleted", "pre-finished", "cancelled", "awaiting", "ongoing"]
  return (
    <div className={`${styles["booking-status"]} ${styles[`${status}`]}`}>
      <span>
        {status === "ongoing" && (
          <>
            <ClockCircleOutlined />
            <p>{t("booking_pending")}</p>
          </>
        )}

        {status === "cancelled" && (
          <>
            <CloseOutlined />
            <p>{t("booking_rejected")}</p>
          </>
        )}

        {status === "approved" && (
          <>
            <CheckOutlined />
            <p>{t("booking_approved")}</p>
          </>
        )}
        {status === "finished" && (
          <>
            <Icons.Completed />
            <p>{t("booking_completed")}</p>
          </>
        )}
      </span>
    </div>
  );
};
