import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import { CalendarMonth } from "@mui/icons-material";
import Button from "../button/Button";

export default function Form() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <form className={styles["form"]}>
      <div className={styles["form-input-wrapper"]}>
        <label htmlFor="destination">Локация</label>
        <input
          type="text"
          id="destination"
          placeholder="Куда?"
          className={`${styles["form-input"]} ${styles["form-input-location"]}`}
          required
        />
      </div>

      <div className={styles["datepicker-box"]}>
        <div className={styles["form-input-wrapper"]}>
          <label htmlFor="checkin">Заезд</label>
          <DatePicker
            id="checkin"
            showIcon={true}
            selected={startDate}
            placeholderText="Когда"
            onChange={(date) => setStartDate(date)}
            icon={<CalendarMonth />}
            required
          />
        </div>

        <div className={styles["form-input-wrapper"]}>
          <label htmlFor="checkout">Выезд</label>
          <DatePicker
            id="checkout"
            showIcon
            selected={endDate}
            placeholderText="Обратно"
            onChange={(date) => setEndDate(date)}
            icon={<CalendarMonth />}
            required
          />
        </div>
      </div>

      <div className={styles["form-input-wrapper"]}>
        <label htmlFor="guests">Гости</label>
        <input
          id="guests"
          type="number"
          className={styles["form-input"]}
          required
          min={1}
          placeholder="Сколько гостей?"
        />
      </div>

      <Button type="primary">Поиск</Button>
    </form>
  );
}
