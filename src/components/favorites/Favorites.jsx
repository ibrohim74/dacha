import React from "react";
import styles from "./Favorites.module.css";
import PageHeader from "../page-header/PageHeader";
import FullPageTabs, { EmptyTab } from "../full-page-tabs/FullPageTabs";
import { useTranslation } from "react-i18next";
import AppLayout from "../appLayout/AppLayout";
import StarRating from "../starRating/StarRating";
import Button from "../Button/Button";
import { Icons } from "../../assets/icons/icons";

export default function Favorites() {
  const { t } = useTranslation();
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
            content: (
              <div className={styles["favs-tab"]}>
                <FavouriteItemCard
                  onDelete={() => {}}
                  favoriteItem={{
                    title: "Gabrielle Hotel",
                    description: "Аппартаменты в отличном состоянии отвечаю.",
                    address: "Ташкент, Яккасарайский район",
                    ratingNum: "4.5",
                    ratingStar: "2",
                    reviewsAmount: "2032",
                  }}
                />
              </div>
            ),
          },
          {
            label: t("cottages_title"),
            content: <EmptyTab placeholderText={t("favs_placeholder")} />,
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

const FavouriteItemCard = ({ favoriteItem, onDelete }) => {
  const { t } = useTranslation();
  const { title, description, address, ratingNum, ratingStar, reviewsAmount } =
    favoriteItem;

  return (
    <div className={styles["fav-card"]}>
      <div className={styles["fav-card-names"]}>
        <h4>{title}</h4>
        <span>{description}</span>
      </div>

      <div className={styles["fav-card-address"]}>
        <Icons.LocationPin />
        <address>{address}</address>
      </div>

      <div className={styles["fav-card-ratings"]}>
        <StarRating rating={ratingStar} onSetRating={() => {}} />
        <p>{ratingNum}</p>
        <span>
          {reviewsAmount} {t("reviews")}
        </span>
      </div>

      <Button type="icon-red" onClick={onDelete}>
        <Icons.Remove />
      </Button>
    </div>
  );
};
