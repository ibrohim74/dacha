import React, { useEffect, useState } from "react";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";
import styles from "./Bookings.module.css";
import { CalendarOutlined } from "@ant-design/icons";
import Modal from "../modal/Modal";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { CloseOutlined } from "@mui/icons-material";
import { NavLink, useParams } from "react-router-dom";
import { HOME_ROUTE } from "../../processes/utils/consts";
import DatePicker from "react-datepicker";
import { useGetDachaQuery } from "../../servises/cottagesAPI";
import { format } from "date-fns";

export default function BookingPlace({ accommodation_type }) {
  const [date, setDate] = useState({});
  const [totalDays, setTotalDays] = useState(0);
  const [bookingInfo, setBookingInfo] = useState({});
  const [people, setPeople] = useState(1);

  const { id: cottageId } = useParams();
  const { data: cottage, error, isLoading } = useGetDachaQuery(cottageId);

  const formattedStartDate = format(date.startDate || new Date(), "dd/MM/yyyy");
  const formattedEndDate = date.endDate
    ? format(date.endDate, "dd/MM/yyyy")
    : "";

  useEffect(() => {
    if (date.startDate && date.endDate) {
      const diffInMs = Math.abs(date.endDate - date.startDate);
      const oneDayInMs = 1000 * 60 * 60 * 24;
      const days = Math.ceil(diffInMs / oneDayInMs);
      setTotalDays(days);

      setBookingInfo({
        ...bookingInfo,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        price: cottage?.price,
        overallPrice: Number(totalDays) * Number(cottage?.price),
        accommodation_type: "cottage",
      });
    } else {
      setTotalDays(0);
    }
  }, [date.startDate, date.endDate]);

  console.log(bookingInfo);

  return (
    <Modal>
      <div className={styles["booking-action"]}>
        <h2>{t("booking_title")}</h2>

        {/* <div className={styles["booking-action-empty"]}>
        <Icons.EmptyPagePlaceholder />
        <p>Нет резервированых комнат</p>
      </div> */}

        <div className={styles["booking-action-info"]}>
          <div className={styles["booking-action-info-box"]}>
            <Icons.Person />
            <span className={styles["booking-action-info-people"]}>
              <input
                onChange={(e) => setPeople(e.target.value)}
                type="number"
                placeholder="Введите количество людей"
              />
            </span>
          </div>

          {/* <div className={styles["booking-action-info-box"]}>
            <div className={styles["booking-action-date"]}>
              <CalendarOutlined />
              <span>Mon 05/12</span>
            </div>
            <div className={styles["booking-action-date"]}>
              <CalendarOutlined />
              <span>Mon 05/12</span>
            </div>
          </div> */}

          <div className={styles["datepicker-box"]}>
            <div className={styles["form-input-wrapper"]}>
              <label htmlFor="checkin">{t("form_checkin")}</label>
              <DatePicker
                id="checkin"
                showIcon={true}
                selected={date.startDate}
                placeholderText={t("form_checkin_placeholder")}
                onChange={(selectedDate) =>
                  setDate({ ...date, startDate: selectedDate })
                }
                icon={<CalendarOutlined />}
                className={styles["booking-datepicker"]}
                required
              />
            </div>

            <div className={styles["form-input-wrapper"]}>
              <label htmlFor="checkout">{t("form_checkout")}</label>
              <DatePicker
                id="checkout"
                showIcon
                selected={date.endDate}
                placeholderText={t("form_checkout_placeholder")}
                onChange={(selectedDate) =>
                  setDate({ ...date, endDate: selectedDate })
                }
                icon={<CalendarOutlined />}
                className={styles["booking-datepicker"]}
                required
              />
            </div>
          </div>

          {accommodation_type === "hotel" && (
            <div className={styles["booking-action-info-rooms"]}>
              <p className={styles["booking-action-rooms"]}>2 rooms</p>
              <p className={styles["booking-action-room-type"]}>
                Standart double room
              </p>
            </div>
          )}

          <div className={styles["booking-action-price"]}>
            <p>{cottage.price_type}</p>
            <span>
              {cottage.price} {t("booking_currency")}
            </span>
          </div>
        </div>

        <button className={styles["booking-action-remove"]}>
          <Icons.Remove />
        </button>

        <div className={styles["booking-action-total-price"]}>
          <p>{t("total_to_pay")}:</p>
          <p>
            {Number(totalDays) * Number(cottage.price)} {t("booking_currency")}
          </p>
        </div>

        <Modal.Open opens="booking-confirmation">
          <Button type="full-width-primary">{t("booking_action")}</Button>
        </Modal.Open>
      </div>

      <Modal.Window
        name="booking-confirmation"
        title={t("booking_confirmation_title")}
      >
        {/* <BookingConfirmationResult result="success" /> */}
        <BookingConfirmation bookingInfo={bookingInfo} />
      </Modal.Window>
    </Modal>
  );
}

const BookingConfirmation = ({ bookingInfo }) => {
  const { t } = useTranslation();
  const {
    startDate,
    endDate,
    accommodation_type,
    price,
    overallPrice,
    additionalPrice,
  } = bookingInfo;

  console.log(overallPrice);

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
          <p>{startDate} 12:00</p>
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
          <p>{endDate} 12:00</p>
        </div>
      </div>

      <div className={styles["confirmation-details"]}>
        <h3>{t("booking_confirmation_details")}</h3>
        <div className={styles["confirmation-details-item"]}>
          <p>
            {accommodation_type === "cottage"
              ? t("cottages_title")
              : t("hotels_title")}
          </p>
          <p>{price}</p>
        </div>

        {additionalPrice && (
          <div className={styles["confirmation-details-item"]}>
            <p>{t("additional")}</p>
            <p>{additionalPrice}</p>
          </div>
        )}

        <div className={styles["confirmation-details-item"]}>
          <p>{t("total_to_pay")}</p>
          <span>
            {additionalPrice
              ? Number(additionalPrice) + Number(overallPrice)
              : overallPrice}
          </span>
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
