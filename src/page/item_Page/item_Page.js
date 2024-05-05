import { Link, useParams } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import { message, notification } from "antd";
import Review from "../../components/review/review";
import AppLayout from "../../components/appLayout/AppLayout";
import StarRating from "../../components/starRating/StarRating";
import Button from "../../components/Button/Button";
import BookingPlace from "../../components/bookings/BookingPlace";
import RoomCard from "../../components/room-card/RoomCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import SimilarItems from "../../components/similar-items/SimilarItems";
import LocationOnMap from "../../components/location-on-map/LocationOnMap";
import GallerySlider from "../../components/image-slider/GallerySlider";
import { useTranslation } from "react-i18next";
import AccomodationCard from "../../components/cottages/AccomodationCard";
import styles from "./ItemPage.module.css";
import {
  useGetAllDachasQuery,
  useGetDachaQuery,
} from "../../servises/cottagesAPI";
import Loader from "../../components/loader/Loader";
import { useGetCottageReviewsQuery } from "../../servises/reviewsAPI";
import { useSelector } from "react-redux";
import {
  useCreateFeaturedMutation,
  useGetUserFeaturedQuery,
} from "../../servises/featuredAPI";

const ItemPage = () => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const { id: cottageId } = useParams();
  const { data: cottage, error, isLoading } = useGetDachaQuery(cottageId);
  const { data: cottages, isLoadingAll } = useGetAllDachasQuery();
  const { data: reviews, isLoading: isLoadingReviews } =
    useGetCottageReviewsQuery(cottageId);

  const { id: userId } = useSelector((state) => state?.auth?.user);

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

  return (
    <AppLayout>
      {contextHolder}
      {isLoading || isLoadingReviews ? (
        <Loader />
      ) : (
        <div className={styles["item-page-container"]}>
          <ItemPageHeader
            title={cottage?.title}
            rating={cottage?.rating}
            reviews={cottage?.reviews_number}
            isFavourite={isFavourite(cottage?.id)}
            id={cottage?.id}
          />
          <GallerySlider />
          <div className={styles["item-main"]}>
            <div className={styles["item-main-info"]}>
              <section className={styles["item-main-info-section"]}>
                <h3>{t("item_page_overview")}</h3>
                <p className={styles["item-main-descr"]}>
                  {cottage?.additional_info}
                </p>
              </section>

              <section className={styles["item-main-info-section"]}>
                <h3>{t("item_page_facilities")}</h3>
                <div className={styles["item-main-services"]}>
                  <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
                  <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
                  <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
                </div>
              </section>

              {/* <section className={styles["item-main-info-section"]}>
                <h3>{t("item_page_rooms")}</h3>
                <RoomCard />
              </section> */}
            </div>
            <div className={styles["item-main-booking"]}>
              <BookingPlace />
            </div>
          </div>

          {!isLoadingReviews && reviews.length > 0 && (
            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_reviews")}</h3>
              <div className={styles["item-main-reviews"]}>
                {reviews.map((review) => (
                  <ReviewCard
                    review={{
                      reviewText: review.body,
                      reviewName: "Nick",
                      reviewRating: review.rating,
                    }}
                  />
                ))}
              </div>
            </section>
          )}

          <section className={styles["item-main-info-section"]}>
            <h3>{t("item_page_map")}</h3>
            <LocationOnMap position={[cottage?.latitude, cottage?.longitude]} />
          </section>

          {cottages?.length > 0 && (
            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_similar")}</h3>
              <div className={styles["item-main-similar"]}>
                {cottages?.slice(0, 2).map((similarDacha) => (
                  <AccomodationCard accommodation={similarDacha} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </AppLayout>
  );
};
1;
export default ItemPage;

const ItemPageHeader = ({ title, rating, reviews, id, isFavourite }) => {
  const { t } = useTranslation();

  const [mutate, error, isLoading] = useCreateFeaturedMutation();

  const handleAddFavourites = async (id, type) => {
    // const accType = type ? "dacha" : "hotel";
    const newFav = { accommodation_id: id, accommodation_type: type };

    try {
      const { data } = await mutate(newFav);
      console.log("New featured item created:", data);
    } catch (error) {
      console.error("Error creating featured item:", error);
    }
  };

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header-details"]}>
        <h2>{title}</h2>
        <StarRating rating={rating} staticRating={true} />
        <div className={styles["header-avg-rating"]}>{rating}</div>
        <div className={styles["header-reviews"]}>
          {reviews} {t("reviews")}
        </div>
      </div>

      <Button type="icon" onClick={() => handleAddFavourites(id, "dacha")}>
        {isFavourite ? <Icons.StarFull /> : <Icons.StarEmpty />}
      </Button>
    </div>
  );
};

const ItemServiceBox = ({ icon, serviceName }) => {
  return (
    <div className={styles["item-main-service-box"]}>
      <div className={styles["item-main-service-box-icon"]}>{icon}</div>
      <span>{serviceName}</span>
    </div>
  );
};
