import React from "react";
import { Link } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  VILLAS_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import styles from "./home.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";

const Home = () => {
  const villas = [
    { name: "Дача 1", price: "109.90", score: 5, img: null },
    { name: "Дача 2", price: "89.90", score: 4.2, img: null },
    { name: "Дача 3", price: "99.90", score: 3.6, img: null },
    { name: "Дача 4", price: "39.90", score: 4.7, img: null },
    { name: "Дача 5", price: "69.90", score: 4.9, img: null },
    { name: "Дача 6", price: "49.90", score: 4.4, img: null },
    { name: "Дача 7", price: "59.90", score: 3, img: null },
    { name: "Дача 8", price: "79.90", score: 2.5, img: null },
  ];
  const hotels = [
    { name: "Отель 1", price: "99.90", score: 4, img: null },
    { name: "Отель 2", price: "39.90", score: 1.5, img: null },
    { name: "Отель 3", price: "69.90", score: 5, img: null },
    { name: "Отель 4", price: "49.90", score: 4.6, img: null },
    { name: "Отель 5", price: "109.90", score: 4, img: null },
    { name: "Отель 6", price: "89.90", score: 4.1, img: null },
    { name: "Отель 7", price: "59.90", score: 3.5, img: null },
    { name: "Отель 8", price: "79.90", score: 3.8, img: null },
  ];
  return (
    <div className={styles["Home"]}>
      {/* <div>
        <Link to={LOGIN_ROUTE}>Login</Link> <br />
        <Link to={REGISTER_ROUT}>Registration</Link>
      </div> */}
      <div className={`${styles["topbar"]} ${styles["container-md"]}`}>
        <div className={`${styles["topbar-left"]}`}>
          <div className={`${styles["topbar-logo"]}`}>
            <Icons.Logo />
            <div>Travid</div>
          </div>
          <div className={`${styles["topbar-searchbar"]}`}>
            <Icons.Magnifier />
            <div>Найти</div>
          </div>
        </div>
        <div className={`${styles["topbar-right"]}`}>
          <Icons.Language />
          <div>
            <Link to={LOGIN_ROUTE}>sign in</Link>
          </div>
          <div>
            <Link to={REGISTER_ROUT}>sign up</Link>
          </div>
        </div>
      </div>
      <div className={`${styles["categories"]} ${styles["container-md"]}`}>
        <div className={styles["title-large"]}>Категории</div>
        <div className={styles["grid-tabs"]}>
          <div className={`${styles["grid-tab"]} ${styles["grid-tab-large"]}`}>
            <div className={styles["title-large"]}>Карта</div>
          </div>
          <Link className={styles["grid-tab"]} to={VILLAS_ROUTE}>
            <div className={styles["title-large"]}>Жильё</div>
            <div className={styles["tab-description"]}>(дачи,отели,тд.)</div>
          </Link>
          <div className={styles["grid-tab"]}>
            <div className={styles["title-large"]}>Еда</div>
          </div>
          <div className={styles["grid-tab"]}>
            <div className={styles["title-large"]}>Развлечение</div>
          </div>
          <div className={styles["grid-tab"]}>
            <div className={styles["title-large"]}>Скоро</div>
          </div>
        </div>
      </div>
      <div className={`${styles["villas"]} ${styles["container-md"]}`}>
        <div className={styles["villas-top"]}>
          <div className={styles["title-large"]}>Дачи</div>
          <Link className={styles["allBtn"]} to={VILLAS_ROUTE}>
            <div>Все</div>
            <Icons.ChevronL />
          </Link>
        </div>
        <div className={styles["villas-grid"]}>
          {villas.map((villa) => (
            <ItemCard {...villa} />
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
          {hotels.map((hotel) => (
            <ItemCard {...hotel} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
