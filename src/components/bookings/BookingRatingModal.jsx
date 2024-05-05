import React, { useState } from "react";
import styles from "./Bookings.module.css";
import { useTranslation } from "react-i18next";
import Button from "../Button/Button";
import StarRating from "../starRating/StarRating";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../servises/reviewsAPI";

export const BookingRatingModal = ({
  accommodation_id,
  accommodation_type,
  initialReview,
}) => {
  const { t } = useTranslation();
  const [newReview, setNewReview] = useState({});
  const [updatingReview, setUpdatingReview] = useState({ ...initialReview });
  const [userRating, setUserRating] = useState("");

  // console.log(updatingReview);

  const [createReview, { error, isLoading }] = useCreateReviewMutation();
  const [updateReview, { error: updateError, isLoading: isUpdating }] =
    useUpdateReviewMutation();

  const userReview = {
    accommodation_id: "5",
    accommodation_type: "dacha",
    title: newReview.title,
    body: newReview.body,
    rating: userRating,
  };

  // const userReview = {
  //   accommodation_id: accommodation_id,
  //   accommodation_type: accommodation_type,
  //   title: "Without a title for now",
  //   body: newReview.body,
  //   rating: userRating,
  // };

  const updatedReview = {
    title: updatingReview.title,
    body: updatingReview.body,
    rating: updatingReview.rating,
  };

  return (
    <div className={styles["booking-rating-modal"]}>
      <div className={styles["booking-rating-item"]}>
        <label>{t("booking_rating_stars_label")}</label>
        <StarRating
          onSetRating={setUserRating}
          rating={initialReview ? updatingReview.rating : newReview.rating}
        />
      </div>

      <div className={styles["booking-rating-item"]}>
        <label htmlFor="">Title of the review</label>
        <input
          type="text"
          value={initialReview ? updatingReview.title : newReview.title}
          onChange={
            initialReview
              ? (e) =>
                  setUpdatingReview({
                    ...updatingReview,
                    title: e.target.value,
                  })
              : (e) => setNewReview({ ...newReview, title: e.target.value })
          }
        />
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
          value={initialReview ? updatingReview.body : newReview.body}
          onChange={
            initialReview
              ? (e) =>
                  setUpdatingReview({ ...updatingReview, body: e.target.value })
              : (e) => setNewReview({ ...newReview, body: e.target.value })
          }
        />
      </div>

      <div className={styles["booking-rating-btn"]}>
        {!initialReview && (
          <Button
            type="full-width-primary"
            onClick={() => createReview(userReview)}
          >
            {t("send")}
          </Button>
        )}
        {initialReview && (
          <Button
            type="full-width-primary"
            onClick={() => updateReview({ review_id: 2, ...updatedReview })}
          >
            {t("change")}
          </Button>
        )}
      </div>
    </div>
  );
};
