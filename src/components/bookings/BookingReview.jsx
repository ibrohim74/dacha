import React from "react";
import styles from "./Bookings.module.css";
import { useTranslation } from "react-i18next";
import StarRating from "../starRating/StarRating";

export const BookingReview = ({ review }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["booking-review"]}>
      <div className={styles["booking-rating-item"]}>
        <label>{t("booking_rating_stars_label")}</label>
        <StarRating rating={review.rating} staticRating={true} />
      </div>
      <div className={styles["booking-rating-item"]}>
        <label htmlFor="booking-rating-textarea">
          {t("booking_rating_text_label")}
        </label>
        <p>{review.body}</p>
      </div>
    </div>
  );
};
