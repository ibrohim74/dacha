import React from "react";
import StarRating from "../starRating/StarRating";
import styles from "./ReviewCard.module.css";

export default function ReviewCard({ review }) {
  const { reviewRating, reviewText, reviewName } = review;

  const formattedreviewText =
    reviewText.length > 150 ? `${reviewText.substring(0, 150)}...` : reviewText;

  return (
    <div className={styles["review-card-wrapper"]}>
      <StarRating rating={reviewRating} />

      <p>{formattedreviewText}</p>

      <span>{reviewName}</span>
    </div>
  );
}
