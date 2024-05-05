import React, { useContext, useEffect, useRef, useState } from "react";
import {
  COTTAGES_CATALOGUE_ROUTE,
  HOTELS_CATALOGUE_ROUTE,
} from "../../processes/utils/consts";
import HeroBox from "../../components/HeroBox/HeroBox";
import Categories from "../../components/categories/Categories";
import CataloguePreview from "../../components/catalogue-preview/CataloguePreview";
import { useTranslation } from "react-i18next";
import AppLayout from "../../components/appLayout/AppLayout";
import LocationRequest from "../../components/location-request/LocationRequest";
import { useGetAllDachasQuery } from "../../servises/cottagesAPI";
import { useGetAllHotelsQuery } from "../../servises/hotelsAPI";
import { UserLocationContext } from "../../context/UserLocation";

const Home = () => {
  const { t } = useTranslation();
  const elementsRef = useRef(null);

  const { data: cottages, isLoading: isLoadongCottages } =
    useGetAllDachasQuery();
  const { data: hotels, isLoading: isLoadingHotels } = useGetAllHotelsQuery();

  const { userLocation } = useContext(UserLocationContext);
  const location = localStorage.getItem("userLocation");

  // console.log(userLocation);

  return (
    <>
      <AppLayout elementsRef={elementsRef}>
        <HeroBox />
        <Categories />

        <CataloguePreview
          items={cottages}
          isLoadongCottages={isLoadongCottages}
          route={COTTAGES_CATALOGUE_ROUTE}
          title={t("cottages_title")}
        />
        <CataloguePreview
          items={hotels}
          route={HOTELS_CATALOGUE_ROUTE}
          title={t("hotels_title")}
        />
      </AppLayout>
      {!location && <LocationRequest />}
    </>
  );
};

export default Home;
