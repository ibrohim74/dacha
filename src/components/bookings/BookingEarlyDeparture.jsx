import React from "react";
import styles from "./Bookings.module.css";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";

export const BookingEarlyDeparture = ({ penaltyPrice }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["early-departure-modal"]}>
      <Icons.RedLogout />
      <h4>{t("booking_early_departure")}</h4>
      <p>{t("booking_early_departure_confirmation")}</p>

      <p className={styles["early-departure-penalty"]}>
        {t("booking_early_departure_warning")}
      </p>
      <span>
        {penaltyPrice} {t("booking-currency")}
      </span>

      <div className={styles["early-departure-btns"]}>
        <Button type="secondary">{t("cancel")}</Button>
        <Button type="red">{t("confirm")}</Button>
      </div>
    </div>
  );
};
