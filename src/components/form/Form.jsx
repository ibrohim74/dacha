import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { CalendarMonth } from "@mui/icons-material";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";

export default function Form({ type = "globalSearch" }) {
  const { t } = useTranslation();

  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numGuests, setNumGuests] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch({ location, startDate, endDate, numGuests });
  };

  return (
    <form className={`${styles["form"]} ${styles[type]}`}>
      {type === "globalSearch" && (
        <>
          <div className={styles["form-input-wrapper"]}>
            <label htmlFor="destination">{t("form_location")}</label>
            <input
              type="text"
              id="destination"
              placeholder={t("form_location_placeholder")}
              className={`${styles["form-input"]} ${styles["form-input-location"]}`}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
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
              value={numGuests}
              onChange={(e) => setNumGuests(parseInt(e.target.value))}
            />
          </div>

          <Button type="primary" onClick={handleSubmit}>
            {t("form_button")}
          </Button>
        </>
      )}

      {type === "roomPicker" && (
        <>
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

          <Button type="primary">
            {/* {t("form_button")} */}
            Add
          </Button>
        </>
      )}
    </form>
  );
}
