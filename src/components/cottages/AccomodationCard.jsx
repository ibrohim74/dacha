import StarRating from "../starRating/StarRating";
import styles from "./AccomodationCard.module.css";
import { useNavigate } from "react-router-dom";
import {
  GOOGLE_STORAGE_URL,
  PRODUCT_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useCreateFeaturedMutation } from "../../servises/featuredAPI";

export default function AccomodationCard({ accommodation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  // console.log(accommodation);

  const [mutate, error, isLoading] = useCreateFeaturedMutation();

  const {
    id,
    info,
    reviews_number,
    rating,
    photos_path,
    price,
    title,
    price_type,
    location_name,
    type,
  } = accommodation;

  const handleAddFavourites = async (id, type) => {
    const accType = type ? "dacha" : "hotel";
    const newFav = { accommodation_id: id, accommodation_type: accType };

    try {
      const { data } = await mutate(newFav);
      console.log("New featured item created:", data);
    } catch (error) {
      console.error("Error creating featured item:", error);
    }
  };

  const handleRemoveFromFavourite = (favId) => {
    dispatch(removeFavourite(favId, "cottage"));
  };

  const handleAccomodationClick = () => {
    const path = PRODUCT_ROUTE.replace(":id", id);
    navigate(path);
  };

  return (
    <div className={styles["accomodation-wrapper"]}>
      <div
        className={styles["accomodation-img"]}
        onClick={handleAccomodationClick}
      >
        <img
          src={
            photos_path.length
              ? `${GOOGLE_STORAGE_URL}${photos_path}`
              : require("../../assets/cottage_placeholder.png")
          }
          alt="accomodation image placeholder"
        />
      </div>
      <div className={styles["accomodation-inner-wrapper"]}>
        <div className={styles["accomodation-upper-part"]}>
          <div className={styles["accomodation-info"]}>
            <h4
              className={styles["accomodation-title"]}
              onClick={handleAccomodationClick}
            >
              {title}
            </h4>

            <div className={styles["accomodation-infobox"]}>
              <p>{location_name}</p>
              <p>{info}</p>
            </div>
          </div>

          <div className={styles["accomodation-ratings"]}>
            <StarRating rating={rating} staticRating={true} />
            <div className={styles["accomodation-rate"]}>
              {rating.toFixed(1)}
            </div>
            <p>
              {reviews_number} {t("reviews")}
            </p>
          </div>
        </div>

        <div className={styles["accommodation-tags"]}>
          <div className={styles["accommodation-tag"]}>{t("tag_parking")}</div>
          <div className={styles["accommodation-tag"]}>
            {t("tag_breakfast")}
          </div>
        </div>

        <div className={styles["accomodation-lower-part"]}>
          <div className={styles["accomodation-prices"]}>
            <p className={styles["accomodation-price-type"]}>{price_type}</p>
            <p>{price} UZS</p>
          </div>

          <div
            className={styles["add-fav"]}
            onClick={() => handleAddFavourites(id, type)}
          >
            <Icons.StarEmpty />
          </div>
        </div>
      </div>
    </div>
  );
}
