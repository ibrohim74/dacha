import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    LOGIN_ROUTE,
    REGISTER_ROUT,
    VILLAS_ROUTE,
} from "../../processes/utils/consts";
import {Icons} from "../../assets/icons/icons";
import styles from "./home.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/header";
import {GetAllDacha} from "./API/homeAPI";

const Home = () => {
    const [villas, setVillas] = useState([]);
    const [buttonAllDach, setButtonAllDach] = useState(1)

    const hotels = [
        {name: "Отель 1", price: "99.90", score: 4, img: null},
        {name: "Отель 2", price: "39.90", score: 1.5, img: null},
        {name: "Отель 3", price: "69.90", score: 5, img: null},
        {name: "Отель 4", price: "49.90", score: 4.6, img: null},
        {name: "Отель 5", price: "109.90", score: 4, img: null},
        {name: "Отель 6", price: "89.90", score: 4.1, img: null},
        {name: "Отель 7", price: "59.90", score: 3.5, img: null},
        {name: "Отель 8", price: "79.90", score: 3.8, img: null},
    ];

    useEffect(() => {
        GetAllDacha(buttonAllDach).then((r) => {
            if (r?.status === 200) {
                setVillas(r.data);
            }
        });
    }, [buttonAllDach]);
    return (
        <div className={styles["Home"]}>
            {/* <div>
        <Link to={LOGIN_ROUTE}>Login</Link> <br />
        <Link to={REGISTER_ROUT}>Registration</Link>
      </div> */}

            <Header/>

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
                    {villas.length <= 15 ?  <>
                        {buttonAllDach > 1 && <div className={styles["allBtn"]}>
                            <div onClick={() => setButtonAllDach(buttonAllDach - 1)}>Nazad</div>
                            <Icons.ChevronR/>
                        </div>}
                        {villas.length >= 15 &&
                            <div className={styles["allBtn"]}>
                                <div onClick={() => setButtonAllDach(buttonAllDach + 1)}>Все</div>
                                <Icons.ChevronR/>
                            </div>
                        }

                    </> :  ''}

                </div>
                <div className={styles["villas-grid"]}>
                    {villas.map((villa) => (
                        <ItemCard key={villa.id} {...villa} />
                    ))}


                </div>
            </div>

            <div className={`${styles["hotels"]} ${styles["container-md"]}`}>
                <div className={styles["hotels-top"]}>
                    <div className={styles["title-large"]}>Отели</div>
                    <div className={styles["allBtn"]}>
                        <div>Все</div>
                        <Icons.ChevronR/>
                    </div>
                </div>
                <div className={styles["hotels-grid"]}>
                    {/*{hotels.map((hotel) => (*/}
                    {/*    <ItemCard key={hotel.id} {...hotel} />*/}
                    {/*))}*/}
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default Home;
