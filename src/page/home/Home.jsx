import React, { useEffect, useRef, useState } from "react";
import {
  COTTAGES_CATALOGUE_ROUTE,
  HOSTEL,
  HOTELS_CATALOGUE_ROUTE,
  VILLAS_ROUTE,
} from "../../processes/utils/consts";
import styles from "./home.module.css";
import { getAllDacha, GetAllHostel } from "./API/homeAPI";
import HeroBox from "../../components/HeroBox/HeroBox";
import Categories from "../../components/categories/Categories";
import CataloguePreview from "../../components/catalogue-preview/CataloguePreview";
import { useTranslation } from "react-i18next";
import AppLayout from "../../components/appLayout/AppLayout";
import { BookingCard } from "../../components/bookings/Bookings";
import LocationRequest from "../../components/location-request/LocationRequest";
import useUserLocation from "../../hooks/useUserLocation";

const Home = () => {
  const [dachas, setDachas] = useState([]);
  const [hostel, setHostel] = useState([]);
  const [buttonAllDach, setButtonAllDach] = useState(1);
  const [buttonAllHotel, setButtonAllHotel] = useState(1);
  const { t } = useTranslation();
  const elementsRef = useRef(null);
  const { userLocation } = useUserLocation();

  useEffect(() => {
    getAllDacha(buttonAllDach).then((r) => {
      if (r?.status === 200) {
        setDachas(r.data);
      }
    });
  }, [buttonAllDach]);
  useEffect(() => {
    GetAllHostel(buttonAllHotel).then((r) => {
      if (r?.status === 200) {
        setHostel(r.data);
      }
    });
  }, [buttonAllHotel]);

  return (
    <>
      <AppLayout elementsRef={elementsRef}>
        <HeroBox />
        <Categories />

        <CataloguePreview
          items={dachas}
          route={COTTAGES_CATALOGUE_ROUTE}
          title={t("cottages_title")}
        />
        <CataloguePreview
          items={hostel}
          route={HOTELS_CATALOGUE_ROUTE}
          title={t("hotels_title")}
        />
      </AppLayout>
      {userLocation === null && <LocationRequest />}
    </>
  );
};

export default Home;
