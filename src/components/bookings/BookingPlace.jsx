import React from "react";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";
import styles from "./Bookings.module.css";
import { CalendarOutlined } from "@ant-design/icons";
import Modal from "../modal/Modal";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { CloseOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { HOME_ROUTE } from "../../processes/utils/consts";

export default function BookingPlace() {
  return (
    <Modal>
      <div className={styles["booking-action"]}>
        <h2>Бронирование</h2>

        {/* <div className={styles["booking-action-empty"]}>
        <Icons.EmptyPagePlaceholder />
        <p>Нет резервированых комнат</p>
      </div> */}

        <div className={styles["booking-action-info"]}>
          <div className={styles["booking-action-info-box"]}>
            <Icons.Person />
            <span>2 people</span>
          </div>

          <div className={styles["booking-action-info-box"]}>
            <div className={styles["booking-action-date"]}>
              <CalendarOutlined />
              <span>Mon 05/12</span>
            </div>
            <div className={styles["booking-action-date"]}>
              <CalendarOutlined />
              <span>Mon 05/12</span>
            </div>
          </div>

          <div className={styles["booking-action-info-rooms"]}>
            <p className={styles["booking-action-rooms"]}>2 rooms</p>
            <p className={styles["booking-action-room-type"]}>
              Standart double room
            </p>
          </div>

          <div className={styles["booking-action-price"]}>
            <p>Per day</p>
            <span>3.600.000 som</span>
          </div>
        </div>

        <button className={styles["booking-action-remove"]}>
          <Icons.Remove />
        </button>

        <div className={styles["booking-action-total-price"]}>
          <p>Total:</p>
          <p>3.600.000 som</p>
        </div>

        <Modal.Open opens="booking-confirmation">
          <Button type="full-width-primary">Бронировать</Button>
        </Modal.Open>
      </div>

      <Modal.Window
        name="booking-confirmation"
        // title={t("booking_confirmation_title")}
      >
        <BookingConfirmationResult result="success" />
      </Modal.Window>
    </Modal>
  );
}

const BookingConfirmation = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["confirmation-modal"]}>
      <div className={styles["confirmation-period"]}>
        <div className={styles["confirmation-period-left"]}>
          <div className={styles["confirmation-period-icon"]}>
            <DoneOutlinedIcon />
          </div>
          <p>{t("form_checkin")}</p>
        </div>
        <div className={styles["confirmation-period-date"]}>
          <p>06.06.2024 12:00</p>
        </div>
      </div>

      <div className={styles["confirmation-period"]}>
        <div className={styles["confirmation-period-left"]}>
          <div className={styles["confirmation-period-icon"]}>
            <DoneOutlinedIcon />
          </div>
          <p>{t("form_checkout")}</p>
        </div>
        <div className={styles["checkin-date"]}>
          <p>06.06.2024 12:00</p>
        </div>
      </div>

      <div className={styles["confirmation-details"]}>
        <h3>{t("booking_confirmation_details")}</h3>
        <div className={styles["confirmation-details-item"]}>
          <p>Отель</p>
          <p>3,600,000</p>
        </div>
        <div className={styles["confirmation-details-item"]}>
          <p>{t("additional")}</p>
          <p>250.000</p>
        </div>
        <div className={styles["confirmation-details-item"]}>
          <p>{t("total_to_pay")}</p>
          <span>3.850.000</span>
        </div>
      </div>

      <Button type="full-width-primary">{t("pay")}</Button>
    </div>
  );
};

const BookingConfirmationResult = ({ result }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["confirmation-result"]}>
      <div
        className={`${styles["confirmation-result-icon"]} ${styles[result]}`}
      >
        {result === "success" && <DoneOutlinedIcon />}
        {result === "error" && <CloseOutlined />}
      </div>
      <div>
        <h3>
          {result === "success" && t("booking_confirmation_successful_title")}
          {result === "error" && t("booking_confirmation_unsuccessful_title")}
        </h3>
        <p>
          {result === "success" && t("booking_confirmation_successful_descr")}
          {result === "error" && t("booking_confirmation_unsuccessful_descr")}
        </p>
      </div>
      <NavLink
        to={HOME_ROUTE}
        className={styles["confirmation-result-navlink"]}
      >
        <Button type="full-width-primary">{t("home_page_link")}</Button>
      </NavLink>
    </div>
  );
};
