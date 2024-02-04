import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  HOME_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import styles from "./item_Page.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import ImageSlider from "../../components/image-slider/image-slider";
import Score from "../../components/score/score";
import Header from "../../components/header/header";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import {Tag} from "antd";


const customMarkerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const Item_Page = () => {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true); // Add a loading state
  const [error, setError] = useState(null); // Add an error state
  const [SliderData, setSliderData] = useState([]);
  const { id } = useParams();

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/dacha/${id}`
        );
        setProduct(response.data);
        setSliderData(response.data?.photos_path.split('\n').filter(Boolean));
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setLoading(false); // Set loading to false once data is fetched
        setError("** ERROR ** PRODUCT NOT FOUND"); // Set error state if there's an error
        console.error("Failed to fetch dacha", error);
      }
    };

    fetchProduct();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Render a loading message while data is being fetched
  }
  if (error) {
    return <div>{error}</div>; // Render the error message if there's an error
  }

  const handleOpenBron = ()=>{
  }
  return (
    <div className={styles["Item-Page"]}>
      <Header />
      <ImageSlider
        slides={SliderData}
        className={styles["container-md"]}
        styles={styles}
      />

      <div className={`${styles["item-info"]} ${styles["container-md"]}`}>
        <div className={styles["info-header"]}>
          <div className={styles["header-left"]}>
            <div className={styles["name"]}>{product.title}</div>
            <div>
              <Score score={3.5} className={styles["score"]} />
            </div>
          </div>
          <div className={styles["header-right"]}>
            <div className={styles["book-btn"]} onClick={handleOpenBron}>Бронировать</div>
            <div>{`${product.price} ${product.type}`}/день</div>
          </div>
        </div>

        <div className={styles["info-details"]}>
          <div className={styles["title-md"]}>Подробности</div>
          <Tag style={{fontSize:'16px', margin:'10px'}}>Этажность : {product?.floors}</Tag>
          <Tag style={{fontSize:'16px', margin:'10px'}}>Площадь : {product?.area}</Tag>
          <Tag style={{fontSize:'16px', margin:'10px'}}>количество комнат : {product?.rooms_number}</Tag>
          <Tag style={{fontSize:'16px', margin:'10px'}}>местоположение : {product?.location_name}</Tag>
        </div>

        <div className={styles["info-description"]}>
          <div className={styles["title-md"]}>Описание</div>
          <div className={styles["description-text"]}>{product.info}</div>
        </div>

        <div className={styles["info-location"]}>
          <div className={styles["title-md"]}>Локация</div>
<p>{product?.location_name}</p>
          <MapContainer zoom={14} center={{lat:product?.latitude , lng:product?.longitude}}
                        style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '20px' }}
          >
            <TileLayer
                attribution="Dacha.uz"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

                <Marker
                    position={[product?.latitude, product?.longitude]}
                    icon={customMarkerIcon}
                />

          </MapContainer>
        </div>

        <div className={styles["info-reviews"]}>
          <div className={styles["title-md"]}>Отзывы</div>
        </div>
      </div>

      <div className={`${styles["item-similars"]} ${styles["container-md"]}`}>
        <div className={styles["title-md"]}>Похожие</div>
        <div className={styles["similars-grid"]}>
          {villas.slice(0, 4).map((villa) => (
            <ItemCard {...villa} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Item_Page;
