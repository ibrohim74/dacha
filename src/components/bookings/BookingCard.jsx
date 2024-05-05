import React from "react";
import styles from "./Bookings.module.css";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";
import Modal from "../modal/Modal";
import {
  useDeleteReviewMutation,
  useGetReviewByIdQuery,
  useGetUserReviewsQuery,
  useUpdateReviewMutation,
} from "../../servises/reviewsAPI";
import { DeleteOutline, Edit } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { BookingReview } from "./BookingReview";
import { BookingEarlyDeparture } from "./BookingEarlyDeparture";
import { BookingRatingModal } from "./BookingRatingModal";
import { BookingStatus } from "./BookingStatus";

export const BookingCard = ({ booking }) => {
  const {
    title,
    status,
    address,
    final_price,
    adults,
    contacts,
    review,
    accommodation_id,
    accommodation_type,
  } = booking;

  const [deleteReview, { isDeleting, errorDeleting }] =
    useDeleteReviewMutation();

  const { id: userId } = useSelector((state) => state.auth.user);

  const { data } = useGetUserReviewsQuery(userId);
  console.log("user reviews:", data);

  // const { title, location_name } = cottage;
  const { t } = useTranslation();

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

        {status === "finished" && review && (
          <div className={styles["booking-review-container"]}>
            <BookingReview review={review} />
            <div className={styles["booking-review-buttons"]}>
              <Modal.Open opens="change-rate-booking">
                <Button type="functional-icon">
                  <Edit />
                </Button>
              </Modal.Open>
              <Button type="functional-icon" onClick={() => deleteReview(4)}>
                <DeleteOutline />
              </Button>
            </div>
          </div>
        )}

        {status === "finished" && !review && (
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
        <BookingRatingModal
          accommodation_id={accommodation_id}
          accommodation_type={accommodation_type}
        />
      </Modal.Window>

      <Modal.Window name="early-departure">
        <BookingEarlyDeparture />
      </Modal.Window>

      <Modal.Window name="change-rate-booking" title={t("change_review")}>
        <BookingRatingModal
          // accommodation_id={accommodation_id}
          // accommodation_type={accommodation_type}
          initialReview={review}
        />
      </Modal.Window>
    </Modal>
  );
};
