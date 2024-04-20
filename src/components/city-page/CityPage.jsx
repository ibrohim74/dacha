import React from "react";
import AppLayout from "../appLayout/AppLayout";
import { useParams } from "react-router-dom";
import { citiesData } from "../city-card/citiesDatabase";
import { CityCard } from "../city-card/CityCards";
import LocationOnMap from "../location-on-map/LocationOnMap";
import styles from "./CityPage.module.css";
import { useTranslation } from "react-i18next";

export default function CityPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const city = citiesData.filter((city) => city.id === id)[0];

  if (!city) {
    return <div>City not found</div>;
  }

  // console.log(city);

  return (
    <AppLayout>
      <CityCard
        title={city.name}
        descr={city.descr}
        img={require("../../assets/citycard-image.png")}
        weather={{ weatherDeg: "", weatherDescr: "" }}
      />
      <section className={styles["city-page-section"]}>
        <h4>{t("sights")}</h4>
        <div className={styles["city-page-image"]}>
          <img src={city?.img[1].imgPath} alt="city-image" />
        </div>
      </section>

      <section className={styles["city-page-section"]}>
        <h4>{t("city_history")}</h4>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
          blanditiis beatae quia omnis, sapiente esse eveniet voluptatum?
          Necessitatibus provident quo corporis iusto vel neque nulla est
          praesentium quibusdam. Et quidem iure alias inventore mollitia itaque?
          Cumque sed quas officiis eveniet odio blanditiis harum totam voluptas
          id, ullam repellat voluptates placeat!
        </p>
      </section>

      <section className={styles["city-page-section"]}>
        <h4>{t("item_page_map")}</h4>
        <LocationOnMap position={[city?.latitude, city?.longitude]} />
      </section>
    </AppLayout>
  );
}
