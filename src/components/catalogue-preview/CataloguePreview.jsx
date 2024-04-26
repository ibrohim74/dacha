import StarRating from "../starRating/StarRating";
import styles from "./CataloguePreview.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import Button from "../Button/Button";
import { useTranslation } from "react-i18next";
import { GOOGLE_STORAGE_URL } from "../../processes/utils/consts";
import { splitImagePaths } from "../../helpers/splitImagePath";
import Loader from "../loader/Loader";

export default function CataloguePreview({
  items,
  route,
  title,
  isLoadingCottages,
}) {
  const slicedItems = items?.slice(0, 6);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // console.log(items);

  return (
    <div className={styles["cards-preview"]}>
      <div className={styles["cards-preview-header"]}>
        <h2>{title}</h2>

        <div
          className={styles["cards-preview-link"]}
          onClick={() => navigate(route)}
        >
          <Link>{t("view_all")}</Link>
          <Icons.ArrowRight />
        </div>
      </div>

      {isLoadingCottages && <Loader />}

      {slicedItems?.length ? (
        <div className={styles["cards-preview-container"]}>
          <div className={styles["cards-preview-wrapper"]}>
            {slicedItems.map((item) => (
              <CataloguePreviewCard
                key={item.id}
                title={item.title}
                location={item.location_name}
                price={item.price}
                image={item.photos_path}
                rating={item.rating}
              />
            ))}
          </div>
          <Button type="primary" onClick={() => navigate(route)}>
            {t("view_more")}
          </Button>
        </div>
      ) : (
        <div className={styles["card-preview-empty"]}>
          <Icons.EmptyPagePlaceholder />
          <p>{t("favs_placeholder")}</p>
        </div>
      )}
    </div>
  );
}

function CataloguePreviewCard({ title, location, price, image, rating }) {
  const MAX_LOCATION_LENGTH = 40;

  const handleClick = () => {};

  const images = splitImagePaths(image);

  const locationText =
    location.length > MAX_LOCATION_LENGTH
      ? `${location.substring(0, MAX_LOCATION_LENGTH)}...`
      : location;

  return (
    <div className={styles["card"]}>
      <img
        src={
          image
            ? `${GOOGLE_STORAGE_URL}${images[0]}`
            : require("../../assets/cottage_placeholder.png")
        }
        alt="placeholder"
        className={styles["card-image"]}
      />
      <div className={styles["card-infobox"]}>
        <div className={styles["card-info"]}>
          <h4>{title}</h4>
          <p onClick={handleClick}>{locationText}</p>
          <div className={styles["card-info-distance"]}>
            <Icons.LocationPin /> 4.5 KM
          </div>
          <p className={styles["card-info-price"]}>{price}</p>
        </div>

        <StarRating staticRating={true} rating={rating} />
      </div>
    </div>
  );
}
