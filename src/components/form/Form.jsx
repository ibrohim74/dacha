import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { CalendarMonth } from "@mui/icons-material";
import Button from "../button/Button";
import { useTranslation } from "react-i18next";

export default function Form() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { t } = useTranslation();

  return (
    <form className={styles["form"]}>
      <div className={styles["form-input-wrapper"]}>
        <label htmlFor="destination">{t("form_location")}</label>
        <input
          type="text"
          id="destination"
          placeholder={t("form_location_placeholder")}
          className={`${styles["form-input"]} ${styles["form-input-location"]}`}
          required
        />
      </div>

      <div className={styles["datepicker-box"]}>
        <div className={styles["form-input-wrapper"]}>
          <label htmlFor="checkin">{t("form_checkin")}</label>
          <DatePicker
            id="checkin"
            showIcon={true}
            selected={startDate}
            placeholderText={t("form_checkin_placeholder")}
            onChange={(date) => setStartDate(date)}
            icon={<CalendarMonth />}
            required
          />
        </div>

        <div className={styles["form-input-wrapper"]}>
          <label htmlFor="checkout">{t("form_checkout")}</label>
          <DatePicker
            id="checkout"
            showIcon
            selected={endDate}
            placeholderText={t("form_checkout_placeholder")}
            onChange={(date) => setEndDate(date)}
            icon={<CalendarMonth />}
            required
          />
        </div>
      </div>

      <div className={styles["form-input-wrapper"]}>
        <label htmlFor="guests">{t("form_guests")}</label>
        <input
          id="guests"
          type="number"
          className={styles["form-input"]}
          required
          min={1}
          placeholder={t("form_guests_placeholder")}
        />
      </div>

      <Button type="primary">{t("form_button")}</Button>
    </form>
  );
}
