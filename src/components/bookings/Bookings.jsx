import React, { useEffect, useState } from "react";
import styles from "./Bookings.module.css";
import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { GetUserBooking } from "../../page/user_Page/userRequest/api/user_requestAPI";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";
import Modal from "../modal/Modal";
import StarRating from "../starRating/StarRating";
import PageHeader from "../page-header/PageHeader";
import Breadcrumb_dashboard from "../breadcrumb_dashboard/breadcrumb_dashboard";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    GetUserBooking()
      .then((res) => {
        if (res.status === 200) {
          setBookings(res?.data);
        } else {
          console.error("getUserRequest:", r.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching user requests:", error);
      });
  }, []);

  console.log(bookings.length);

  return (
    <AppLayout>
      <div className={styles["booking-page"]}>
        <Breadcrumb_dashboard />
        <PageHeader
          pageTitle={t("booking_title")}
          pageSubtitle={t("booking_subtitle")}
        />
        <FullPageTabs
          tabs={[
            {
              label: t("booking_first_tab"),
              content:
                bookings.length > 0 ? (
                  <div className={styles["booking-tab"]}>
                    {bookings.map((booking) => (
                      <BookingCard booking={booking} key={booking.id} />
                    ))}
                  </div>
                ) : (
                  <EmptyTab placeholderText={t("booking_empty_placeholder")} />
                ),
              // <div className={styles["booking-tab"]}>
              //   <BookingCard
              //     booking={{
              //       title: "Hyde Park",
              //       status: "completed",
              //       address: "Ташкент, Яккасарайский район",
              //       final_price: "500000",
              //       adults: "5",
              //       phone_number: "998901411111",
              //       review: {
              //         text: "very good",
              //         rating: "2",
              //       },
              //     }}
              //   />
              // </div>
            },
            {
              label: t("booking_second_tab"),
              content: (
                <EmptyTab
                  placeholderText={t("booking_no_history_placeholder")}
                />
              ),
            },
          ]}
        />
      </div>
    </AppLayout>
  );
}

const BookingCard = ({ booking }) => {
  const { title, status, address, final_price, adults, phone_number, review } =
    booking;
  const { t } = useTranslation();
  const [userRating, setUserRating] = useState("");

  return (
    <Modal>
      <div className={styles["booking-card"]}>
        <h4>{title}</h4>

        <div className={styles["booking-card-address"]}>
          <Icons.LocationPin />
          {address}
        </div>

        <div className={styles["booking-card-info"]}>
          <div className={styles["booking-card-details"]}>
            <div className={styles["booking-card-price-box"]}>
              <span>{t("booking_per_day")}</span>

              <p className={styles["booking-card-price"]}>
                {final_price} {t("booking_currency")}
              </p>
            </div>
            <p>
              {adults} {t("booking_amount_of_people")}
            </p>
          </div>

          {status === "approved" && (
            <div className={styles["booking-accepted-number"]}>
              {phone_number}
            </div>
          )}
        </div>

        <BookingStatus status={status} />

        {status === "approved" && (
          <div className={styles["booking-button"]}>
            <Modal.Open opens="early-departure">
              <Button type="full-width-primary">
                {t("booking_early_departure")}
              </Button>
            </Modal.Open>
          </div>
        )}

        {status === "completed" && review && <BookingReview review={review} />}

        {status === "completed" && !review && (
          <div className={styles["booking-button"]}>
            <Modal.Open opens="rate-booking">
              <Button type="full-width-primary">{t("booking_rate")}</Button>
            </Modal.Open>
          </div>
        )}

        {status === "rejected" && (
          <div className={styles["booking-rejected"]}>
            <InfoCircleOutlined />
            <p>
              Это бронирование было дополнительно проверено и отклонено потому
              что вы этого не стоите
            </p>
          </div>
        )}
      </div>

      <Modal.Window name="rate-booking" title={t("sidebar_bookings")}>
        <BookingRatingModal setRating={setUserRating} />
      </Modal.Window>

      <Modal.Window name="early-departure">
        <BookingEarlyDeparture />
      </Modal.Window>
    </Modal>
  );
};

const BookingStatus = ({ status }) => {
  const { t } = useTranslation();
  return (
    <div className={`${styles["booking-status"]} ${styles[`${status}`]}`}>
      <span>
        {status === "pending" && (
          <>
            <ClockCircleOutlined />
            <p>{t("booking_pending")}</p>
          </>
        )}

        {status === "rejected" && (
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
        {status === "completed" && (
          <>
            <Icons.Completed />
            <p>{t("booking_completed")}</p>
          </>
        )}
      </span>
    </div>
  );
};

const BookingRatingModal = ({ setRating }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["booking-rating-modal"]}>
      <div className={styles["booking-rating-item"]}>
        <label>{t("booking_rating_stars_label")}</label>
        <StarRating onSetRating={setRating} />
      </div>
      <div className={styles["booking-rating-item"]}>
        <label htmlFor="booking-rating-textarea">
          {t("booking_rating_text_label")}
        </label>
        <textarea
          name="booking-rating-textarea"
          id="booking-rating-textarea"
          placeholder={t("booking_rating_textarea")}
          cols="30"
          rows="6"
        ></textarea>
      </div>
      <div className={styles["booking-rating-btn"]}>
        <Button type="full-width-primary">{t("send")}</Button>
      </div>
    </div>
  );
};

const BookingReview = ({ review }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["booking-review"]}>
      <div className={styles["booking-rating-item"]}>
        <label>{t("booking_rating_stars_label")}</label>
        <StarRating rating={review.rating} />
      </div>
      <div className={styles["booking-rating-item"]}>
        <label htmlFor="booking-rating-textarea">
          {t("booking_rating_text_label")}
        </label>
        <p>{review.text}</p>
      </div>
    </div>
  );
};

const BookingEarlyDeparture = ({ penaltyPrice }) => {
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
