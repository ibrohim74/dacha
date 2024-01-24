import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  HOME_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import styles from "./villas.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import DatePicker from "../../components/date-picker/date-picker";

const Villas = () => {
  const [selectedMonth, setSelectedMonth] = useState(0); // January

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

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

  return (
    <div className={styles["Villas"]}>
      <div className={`${styles["topbar"]} ${styles["container-md"]}`}>
        <div className={`${styles["topbar-left"]}`}>
          <Link className={`${styles["topbar-logo"]}`} to={HOME_ROUTE}>
            <Icons.Logo />
            <div>Travid</div>
          </Link>
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

      <div className={`${styles["grid-container"]} ${styles["container-md"]}`}>
        <div className={styles["filter"]}>
          <div>
            <label>Выберите город:</label>
            <select>
              <option>Ташкент</option>
            </select>
          </div>
          <div>
            <label>Выберите регион:</label>
            <select>
              <option>Любой</option>
            </select>
          </div>
          <div>
            <label>Свободние дни</label>
            <div className={styles["label-sc"]}>Месяц</div>
            <select value={selectedMonth} onChange={handleChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2000, i + 1, 0).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
            <div className={styles["label-sc"]}>Выберите даты</div>
            <DatePicker month={selectedMonth} />
          </div>
          <div>checkbox</div>
        </div>
        <div className={styles["villas-grid"]}>
          {villas.map((villa) => (
            <ItemCard {...villa} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Villas;
