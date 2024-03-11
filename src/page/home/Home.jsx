import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LOGIN_ROUTE,
  PLACE,
  REGISTER_ROUT,
  VILLAS_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import styles from "./home.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import { GetAllDacha, GetAllHostel } from "./API/homeAPI";
import HostelCard from "../../components/hostel-card/hostel_card";
import HeroBox from "../../components/heroBox/HeroBox";
import Categories from "../../components/categories/Categories";

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
      </div>

      <div className={`${styles["villas"]} ${styles["container-md"]}`}>
        <div className={styles["villas-top"]}>
          <div className={styles["title-large"]}>Дачи</div>
          {dachas.length <= 15 ? (
            <>
              {buttonAllDach > 1 && (
                <div className={styles["allBtn"]}>
                  <div onClick={() => setButtonAllDach(buttonAllDach - 1)}>
                    Nazad
                  </div>
                  <Icons.ChevronR />
                </div>
              )}
              {dachas.length >= 15 && (
                <div className={styles["allBtn"]}>
                  <div onClick={() => setButtonAllDach(buttonAllDach + 1)}>
                    Все
                  </div>
                  <Icons.ChevronR />
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </div>
        <div className={styles["villas-grid"]}>
          {dachas.map((villa) => (
            <ItemCard key={villa.id} {...villa} />
          ))}
        </div>
      </div>

      <div className={`${styles["hotels"]} ${styles["container-md"]}`}>
        <div className={styles["hotels-top"]}>
          <div className={styles["title-large"]}>Отели</div>
          <div className={styles["allBtn"]}>
            <div>Все</div>
            <Icons.ChevronR />
          </div>
        </div>
        <div className={styles["hotels-grid"]}>
          {hostel.map((hotel) => (
            <HostelCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
