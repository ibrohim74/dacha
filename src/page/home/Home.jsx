import React, { useEffect, useState } from "react";
import {
  LOGIN_ROUTE,
  PLACE,
  REGISTER_ROUT,
  VILLAS_ROUTE,
} from "../../processes/utils/consts";
import styles from "./home.module.css";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import { GetAllDacha, GetAllHostel } from "./API/homeAPI";
import HeroBox from "../../components/heroBox/HeroBox";
import Categories from "../../components/categories/Categories";
import CataloguePreview from "../../components/catalogue-preview/CataloguePreview";

const Home = () => {
  const [dachas, setDachas] = useState([]);
  const [hostel, setHostel] = useState([]);
  const [buttonAllDach, setButtonAllDach] = useState(1);
  const [buttonAllHotel, setButtonAllHotel] = useState(1);

  useEffect(() => {
    GetAllDacha(buttonAllDach).then((r) => {
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
    <div className={styles["home"]}>
      <Header />

      <div className={styles["container-md"]}>
        <HeroBox />
        <Categories />
        <CataloguePreview items={dachas} route={VILLAS_ROUTE} title="Дачи" />
        <CataloguePreview items={hostel} route={""} title="Отели" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
