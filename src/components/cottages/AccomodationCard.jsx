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
import {
  useCreateFeaturedMutation,
  useGetUserFeaturedQuery,
} from "../../servises/featuredAPI";
import { useGetAccommodationTagsQuery } from "../../servises/tagsAPI";
import { splitImagePaths } from "../../helpers/splitImagePath";

export default function AccomodationCard({ accommodation }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { id: userId } = useSelector((state) => state?.auth?.user);

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

  const {
    data: favourites,
    error: errorFavourites,
    isLoading: isLoadingFavourites,
  } = useGetUserFeaturedQuery(userId);

  const isFavourite = (accommodation_id) => {
    return favourites?.some(
      (favourite) => favourite?.accommodation_id === accommodation_id
    );
  };

  const images = splitImagePaths(photos_path);

  const { data: cottageTags, isLoadingTags } = useGetAccommodationTagsQuery(
    id,
    type
  );
  const [mutate, error, isLoading] = useCreateFeaturedMutation();

  // console.log(favourites);

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
              ? `${GOOGLE_STORAGE_URL}${images[0]}`
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
          {cottageTags?.map((tag) => (
            <div className={styles["accommodation-tag"]} key={tag.id}>
              {tag.name}
            </div>
          ))}
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
            {isFavourite(id) ? <Icons.StarFull /> : <Icons.StarEmpty />}
          </div>
        </div>
      </div>
    </div>
  );
}
