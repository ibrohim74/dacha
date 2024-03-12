import StarRating from "../starRating/StarRating";
import styles from "./CataloguePreview.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import Button from "../button/Button";

export default function CataloguePreview({ items, route, title }) {
  const slicedItems = items.slice(0, 3);
  const navigate = useNavigate();

  return (
    <div className={styles["cards-preview"]}>
      <div className={styles["cards-preview-header"]}>
        <h2>{title}</h2>

        <div
          className={styles["cards-preview-link"]}
          onClick={() => navigate(route)}
        >
          <Link>Смотреть все</Link>
          <Icons.ArrowRight />
        </div>
      </div>

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
        Смотреть еще
      </Button>
    </div>
  );
}

function CataloguePreviewCard({ title, location, price, image, rating }) {
  const MAX_LOCATION_LENGTH = 40;

  const handleClick = () => {};

  const locationText =
    location.length > MAX_LOCATION_LENGTH
      ? `${location.substring(0, MAX_LOCATION_LENGTH)}...`
      : location;

  return (
    <div className={styles["card"]}>
      <img
        src={image ? image : require("../../assets/cottage_placeholder.png")}
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

        <StarRating rating={rating} />
      </div>
    </div>
  );
}
