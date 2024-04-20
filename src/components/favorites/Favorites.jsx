import React, { useEffect, useMemo, useState } from "react";
import styles from "./Favorites.module.css";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";
import StarRating from "../starRating/StarRating";
import Button from "../Button/Button";
import { Icons } from "../../assets/icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAllDacha } from "../../page/home/API/homeAPI";
import {
  useDeleteFeaturedMutation,
  useGetUserFeaturedQuery,
} from "../../servises/featuredAPI";

export default function Favorites() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);

  const { data: favourites, error, isLoading } = useGetUserFeaturedQuery(id);
  // console.log(favourites);

  //temporary solution
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    getAllDacha()
      .then((response) => {
        // console.log(response.data);
        setCottages(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const mappedFavourites = favourites?.reduce((acc, current) => {
    const type = current.accommodation_type;
    acc[type] = acc[type] || [];
    acc[type].push(current);
    return acc;
  }, {});

  console.log(mappedFavourites);

  function findCottageByFavItem(cottages, favourites) {
    // return useMemo(() => {
    const matchedCottages = [];
    const favItemIds = [];

    for (const item of favourites) {
      favItemIds.push(item.accommodation_id);
    }

    for (const cottage of cottages) {
      for (const favId of favItemIds) {
        if (cottage.id === favId) {
          matchedCottages.push(cottage);
        }
      }
    }
    return matchedCottages;
    // }, [cottages, favourites]);
  }

  let favCottages = [];

  if (favourites) {
    favCottages = findCottageByFavItem(cottages, favourites);
  }

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
                {isLoading && <p>Loading...</p>}
                {!favCottages.length && (
                  <EmptyTab placeholderText={t("favs_placeholder")} />
                )}
                {favCottages.length > 0 && (
                  <div className={styles["favs-tab"]}>
                    {favCottages.map((favCottage) => (
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
  const dispatch = useDispatch();
  const { id, title, info, location_name, rating, ratingStar, reviews_number } =
    favoriteItem;

  const [mutate] = useDeleteFeaturedMutation();

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
        <StarRating rating={rating} />
        <p>{rating}</p>
        <span>
          {reviews_number} {t("reviews")}
        </span>
      </div>

      <Button type="icon-red" onClick={() => mutate(id)}>
        <Icons.Remove />
      </Button>
    </div>
  );
};
