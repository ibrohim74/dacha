import React, { useEffect, useMemo, useState } from "react";
import styles from "./Favorites.module.css";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";
import StarRating from "../starRating/StarRating";
import Button from "../Button/Button";
import { Icons } from "../../assets/icons/icons";
import { useSelector } from "react-redux";
import {
  useDeleteFeaturedMutation,
  useGetUserFeaturedQuery,
} from "../../servises/featuredAPI";
import { useGetAllDachasQuery } from "../../servises/cottagesAPI";
import Loader from "../loader/Loader";

export default function Favorites() {
  const { t } = useTranslation();
  const { id } = useSelector((state) => state?.auth?.user);

  console.log(id);

  const {
    data: favourites,
    error,
    isLoading: isLoadingFavourites,
  } = useGetUserFeaturedQuery(id);

  // console.log(id, favourites);

  const [favoutiteCottages, setFavoutiteCottages] = useState([]);

  const {
    data: cottages,
    error: errorCottages,
    isLoading: isLoadingCottages,
  } = useGetAllDachasQuery();

  //export to separate logic
  const mappedFavourites = favourites?.reduce((acc, current) => {
    const type = current.accommodation_type;
    acc[type] = acc[type] || [];
    acc[type].push(current);
    return acc;
  }, {});

  useEffect(() => {
    const favCottages = favourites?.map((favItem) => {
      const matchedCottage = cottages?.find(
        (cottage) => cottage.id === favItem.accommodation_id
      );

      if (matchedCottage) {
        return { ...matchedCottage, fav_id: favItem.id };
      } else {
        return null;
      }
    });

    setFavoutiteCottages(favCottages);
  }, [favourites]);

  // console.log(favoutiteCottages);

  return (
    <AppLayout>
      <PageHeader
        pageTitle={t("sidebar_fav")}
        pageSubtitle={t("favs_subtitle")}
      />
      <FullPageTabs
        tabs={[
          {
            label: t("hotels_title"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("cottages_title"),
            content: (
              <>
                {(isLoadingFavourites || isLoadingCottages) && <Loader />}
                {!favoutiteCottages?.length && (
                  <EmptyTab placeholderText={t("favs_placeholder")} />
                )}
                {favoutiteCottages?.length > 0 && (
                  <div className={styles["favs-tab"]}>
                    {favoutiteCottages?.map((favCottage) => (
                      <FavouriteItemCard
                        favoriteItem={favCottage}
                        key={favCottage.id}
                      />
                    ))}
                  </div>
                )}
              </>
            ),
          },
          {
            label: t("sights"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
          {
            label: t("cities"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
          },
        ]}
      />
    </AppLayout>
  );
}

const FavouriteItemCard = ({ favoriteItem }) => {
  const { t } = useTranslation();
  const {
    fav_id,
    id,
    title,
    info,
    location_name,
    rating,
    ratingStar,
    reviews_number,
  } = favoriteItem;

  const [mutate] = useDeleteFeaturedMutation();
  console.log(fav_id);

  return (
    <div className={styles["fav-card"]}>
      <div className={styles["fav-card-names"]}>
        <h4>{title}</h4>
        <span>{info}</span>
      </div>

      <div className={styles["fav-card-address"]}>
        <Icons.LocationPin />
        <address>{location_name}</address>
      </div>

      <div className={styles["fav-card-ratings"]}>
        <StarRating rating={rating} staticRating={true} />
        <p>{rating}</p>
        <span>
          {reviews_number} {t("reviews")}
        </span>
      </div>

      <Button type="icon-red" onClick={() => mutate(fav_id)}>
        <Icons.Remove />
      </Button>
    </div>
  );
};
