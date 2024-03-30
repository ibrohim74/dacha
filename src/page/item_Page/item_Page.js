import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  HOME_ROUTE,
} from "../../processes/utils/consts";
import { Icons } from "../../assets/icons/icons";
import styles from "./ItemPage.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import ImageSlider from "../../components/image-slider/image-slider";
import Score from "../../components/score/score";
import Header from "../../components/header/Header";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";
import { DatePicker, Input, message, Modal, notification, Tag } from "antd";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import {
  CreateRequestAPI,
  GetSellerBookingAPI,
  GetSellerBookingItemPageAPI,
} from "./API/itemPageAPI";
import { GetDachaAPI } from "../seller_Page/announcement/API/announcementAPI";
import { GetAllDacha } from "../home/API/homeAPI";
import Review from "../../components/review/review";
import AppLayout from "../../components/appLayout/AppLayout";
import StarRating from "../../components/starRating/StarRating";
import Button from "../../components/Button/Button";
import BookingPlace from "../../components/bookings/BookingPlace";
import RoomCard from "../../components/room-card/RoomCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import CottageCard from "../../components/cottages/CottageCard";
import SimilarItems from "../../components/similar-items/SimilarItems";
import { SwiperSlide } from "swiper/react";
import LocationOnMap from "../../components/location-on-map/LocationOnMap";
import GallerySlider from "../../components/image-slider/GallerySlider";
import { useTranslation } from "react-i18next";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ItemPage = () => {
  const [product, setProduct] = useState([]);
  const [SimilarDachas, setSimilarDachas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [SliderData, setSliderData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [errorNotification, setErrorNotification] = useState("");
  const [bookingData, setBookingData] = useState([]);
  const JWT = localStorage.getItem("token")
    ? jwtDecode(localStorage.getItem("token"))
    : null;
  const { id } = useParams();
  const { RangePicker } = DatePicker;
  const [initialState, setInitialState] = useState({
    requested_price: 0,
    accommodation_id: parseInt(id),
    accommodation_type: "dacha",
    adults: 1,
    contacts: "",
    children: 0,
  });

  const { t } = useTranslation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchBookingData = async () => {
    try {
      if (id) {
        const response = await GetSellerBookingItemPageAPI(id);
        const data = response.data;
        const filteredData = data?.filter(
          (booking) => booking.accommodation_id === parseInt(id)
        );
        setBookingData(filteredData);
        console.log(response);
      }
    } catch (error) {
      console.error("Sotuvchi bron ma'lumotlarini olishda xato:", error);
    }
  };

  useEffect(() => {
    GetDachaAPI(id).then((r) => {
      if (r) {
        setProduct(r);
        setSliderData(r?.photos_path.split("\n").filter(Boolean));
        setLoading(false);

        console.log(SliderData);
      }
    });
    GetAllDacha(1).then((r) => {
      if (r?.status === 200) {
        setSimilarDachas(r.data);
      }
    });
  }, []);

  useEffect(() => {
    fetchBookingData();
  }, [product?.parent_id, id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const onChange = (value, dateString) => {
    const minimumBookDays = product?.minimum_book_days;
    try {
      const selectedDates = dateString.map((date) => dayjs(date));
      if (selectedDates.some((date) => !date.isValid())) {
        new Error("Noto‘g‘ri sana formati");
      }
      const differenceInDays = selectedDates[1].diff(selectedDates[0], "day");
      if (differenceInDays < minimumBookDays) {
        setInitialState({ ...initialState, start_day: "", end_day: "" });
        setErrorNotification(
          `* XATO: Eng kam sana bron qilish uchun ${product?.minimum_book_days} kun bo'lishi kerak.`
        );
      } else {
        setErrorNotification("");
        const start_day = selectedDates[0].format("YYYY-MM-DDTHH:mm:ss");
        const end_day = selectedDates[1].format("YYYY-MM-DDTHH:mm:ss");
        setInitialState({ ...initialState, start_day, end_day });
      }
    } catch (error) {
      console.error("Sana qayta ishlashda xato:", error);
      setErrorNotification("* XATO: Noto‘g‘ri sana formati yoki vaqt.");
      setInitialState({ ...initialState, start_day: "", end_day: "" });
    }
  };

  const handleOpenBron = () => {
    setIsModalOpen(true);
  };

  const disabledDate = (current) => {
    if (!current) return false;

    const today = dayjs();

    if (current.isBefore(today, "day") || current.isSame(today, "day")) {
      return true;
    }

    if (bookingData.length > 0) {
      if (
        bookingData.some(
          (booking) =>
            current >= dayjs(booking.start_day) &&
            current <= dayjs(booking.end_day)
        )
      ) {
        return true;
      }
    }

    return false;
  };

  const openNotification = (placement) => {
    api.info({
      message: `Бронирование`,
      description: (
        <p style={{ fontSize: 17 }}>
          Войдите в личный кабинет, чтобы забронировать
        </p>
      ),
      placement,
    });
  };

  const handleSendData = () => {
    CreateRequestAPI(initialState)
      .then((response) => {
        if (response?.status === 200) {
          message.success("Yuborildi");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Ma’lumotlarni yuborishda xato:", error);
        message.error("Ma’lumotlarni yuborishda xato yuz berdi");
      });
  };

  return (
    <AppLayout>
      {contextHolder}
      <div className={styles["item-page-container"]}>
        <ItemPageHeader />
        <GallerySlider />
        <div className={styles["item-main"]}>
          <div className={styles["item-main-info"]}>
            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_overview")}</h3>
              <p className={styles["item-main-descr"]}>
                Современная дача, расположенная на Хумсане, ждет вас. Дача
                расположенный в Хумсане с большим двором для отдыха и
                наслаждения свежим горным воздухом, рассчитан на 12 гостей.
                Отличное место, чтобы быть с семьей или друзьями. В этом
                коттедже есть крытая/открытая кухня, летний бассейн, финская
                сауна, комфортабельные спальни. Вы также можете насладиться
                различными развлекательными мероприятиями, играя в бильярд и
                настольный теннис.
              </p>
            </section>

            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_facilities")}</h3>
              <div className={styles["item-main-services"]}>
                <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
                <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
                <ItemServiceBox serviceName="Wi-Fi" icon={<Icons.WiFi />} />
              </div>
            </section>

            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_rooms")}</h3>
              <RoomCard />
            </section>
          </div>
          <div className={styles["item-main-booking"]}>
            <BookingPlace />
          </div>
        </div>

        <section className={styles["item-main-info-section"]}>
          <h3>{t("item_page_reviews")}</h3>
          <div className={styles["item-main-reviews"]}>
            <ReviewCard
              review={{
                reviewText:
                  "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
                reviewName: "Nick",
                reviewRating: "5",
              }}
            />
            <ReviewCard
              review={{
                reviewText:
                  "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
                reviewName: "Nick",
                reviewRating: "5",
              }}
            />
            <ReviewCard
              review={{
                reviewText:
                  "Lorem ipsum dolor sit amet, adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.",
                reviewName: "Nick",
                reviewRating: "5",
              }}
            />
          </div>
        </section>

        <section className={styles["item-main-info-section"]}>
          <h3>{t("item_page_map")}</h3>
          <LocationOnMap position={[product?.latitude, product?.longitude]} />
        </section>

        <section className={styles["item-main-info-section"]}>
          <h3>{t("item_page_similar")}</h3>
          <div className={styles["item-main-similar"]}>
            <SimilarItems>
              {SimilarDachas.slice(0, 4).map((similarDacha) => (
                <SwiperSlide style={{ width: "400px !important" }}>
                  <CottageCard cottage={similarDacha} />
                </SwiperSlide>
              ))}
            </SimilarItems>
          </div>
        </section>
      </div>
    </AppLayout>
  );
};
1;
export default ItemPage;

const ItemPageHeader = ({ item }) => {
  // const { title, rating, reviews, avgRating } = item;

  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header-details"]}>
        <h2>Luex Hotel Premium</h2>
        <StarRating />
        <div className={styles["header-avg-rating"]}>4.5</div>
        <div className={styles["header-reviews"]}>2032 reviews</div>
      </div>

      <Button type="icon">
        <Icons.StarEmpty />
      </Button>
    </div>
  );
};

const ItemServiceBox = ({ icon, serviceName }) => {
  return (
    <div className={styles["item-main-service-box"]}>
      <div className={styles["item-main-service-box-icon"]}>{icon}</div>
      <span>{serviceName}</span>
    </div>
  );
};

// <div className={styles["Item-Page"]}>
//       {contextHolder}
//       <Header />
//       <ImageSlider
//         slides={SliderData}
//         className={styles["container-md"]}
//         styles={styles}
//       />
//       <Modal title="Бронирование" open={isModalOpen} onCancel={handleCancel}>
//         <ul style={{ padding: 0 }}>
//           <li>
//             <p style={{ fontSize: "17px" }}>
//               Бронирование возможно минимум за {product?.minimum_preorder_days}{" "}
//               дня.
//             </p>
//           </li>
//           <li>
//             <p style={{ fontSize: "17px" }}>
//               Вы можете забронировать минимум на {product?.minimum_book_days}{" "}
//               дней
//             </p>
//           </li>
//         </ul>

//         <span style={{ color: "red" }}>{errorNotification}</span>
//         <RangePicker
//           showTime={{
//             format: "HH:mm",
//           }}
//           onChange={onChange}
//           format="YYYY-MM-DD HH:mm:ss"
//           disabledDate={disabledDate}
//         />

//         <div className={"input"}>
//           <label htmlFor="reqPrice">
//             напишите цену, о которой хотите договориться
//           </label>
//           <Input
//             addonAfter={product?.price_type}
//             value={initialState?.requested_price
//               ?.toString()
//               .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
//             type={"text"}
//             onChange={(e) => {
//               const cleanedValue = e.target.value.replace(/\s/g, "");
//               setInitialState({
//                 ...initialState,
//                 requested_price:
//                   cleanedValue !== "" ? parseInt(cleanedValue) : 0,
//               });
//             }}
//             onBlur={() => {
//               if (
//                 !initialState.requested_price ||
//                 isNaN(initialState.requested_price)
//               ) {
//                 setInitialState({
//                   ...initialState,
//                   requested_price: 0,
//                 });
//               }
//             }}
//           />
//         </div>
//         <div className={'input'}>
//                     <label htmlFor="adults">Adults</label>
//                     <Input type="number" value={initialState.adults} onChange={e=>setInitialState({...initialState, adults:parseInt(e.target.value) })}/>
//                     <label htmlFor="Children">Children</label>
//                     <Input type="number" value={initialState.children} onChange={e=>setInitialState({...initialState, children:parseInt( e.target.value)})}/>
//                     <label htmlFor="Children">Contact</label>
//                     <Input type="text" value={initialState.contacts} onChange={e=>setInitialState({...initialState, contacts: e.target.value})}/>
//                 </div>
//                 <div>
//           <p style={{ fontSize: 16 }}>
//             продавец установил цену {product?.price} {product?.price_type} за 1
//             день{" "}
//           </p>
//         </div>
//         <Button onClick={handleSendData}>отправить</Button>
//       </Modal>

//       <div className={`${styles["item-info"]} ${styles["container-md"]}`}>
//         <div className={styles["info-header"]}>
//           <div className={styles["header-left"]}>
//             <div className={styles["name"]}>{product.title}</div>
//             <div>
//               <Score score={3.5} className={styles["score"]} />
//             </div>
//           </div>
//           <div className={styles["header-right"]}>
//             {JWT ? (
//               <>
//                 <div className={styles["book-btn"]} onClick={handleOpenBron}>
//                   Бронировать
//                 </div>
//               </>
//             ) : (
//               <div
//                 className={styles["book-btn"]}
//                 onClick={() => openNotification("topRight")}
//               >
//                 Бронировать
//               </div>
//             )}

//                         <div>{`${product.price} ${product.price_type}`}/день</div>
//                     </div>
//                 </div>

//         <div className={styles["info-details"]}>
//           <div className={styles["title-md"]}>Подробности</div>
//           <Tag style={{ fontSize: "16px", margin: "10px" }}>
//             Этажность : {product?.floors}
//           </Tag>
//           <Tag style={{ fontSize: "16px", margin: "10px" }}>
//             Площадь : {product?.area}
//           </Tag>
//           <Tag style={{ fontSize: "16px", margin: "10px" }}>
//             количество комнат : {product?.rooms_number}
//           </Tag>
//           <Tag style={{ fontSize: "16px", margin: "10px" }}>
//             местоположение : {product?.location_name}
//           </Tag>
//         </div>

//         <div className={styles["info-description"]}>
//           <div className={styles["title-md"]}>Описание</div>
//           <div className={styles["description-text"]}>{product.info}</div>
//         </div>

//         <div className={styles["info-location"]}>
//           <div className={styles["title-md"]}>Локация</div>
//           <p>{product?.location_name}</p>
//           <MapContainer
//             zoom={14}
//             center={{ lat: product?.latitude, lng: product?.longitude }}
//             style={{
//               width: "100%",
//               height: "200px",
//               overflow: "hidden",
//               borderRadius: "20px",
//             }}
//           >
//             <TileLayer
//               attribution="Dacha.uz"
//               url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
//             />
//             <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

//             <Marker
//               position={[product?.latitude, product?.longitude]}
//               icon={customMarkerIcon}
//             />
//           </MapContainer>
//         </div>

//         <div className={styles["info-reviews"]}>
//           <div className={styles["title-md"]}>Отзывы</div>
//           <Review dachaId={id} />
//         </div>
//       </div>

//       <div className={`${styles["item-similars"]} ${styles["container-md"]}`}>
//         <div className={styles["title-md"]}>Похожие</div>
//         <div className={styles["similars-grid"]}>
//           {SimilarDachas.slice(0, 4).map((villa) => (
//             <ItemCard {...villa}  key={villa.id}/>
//           ))}
//         </div>
//       </div>

//             <Footer/>
//         </div>
