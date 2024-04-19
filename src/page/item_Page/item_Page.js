import { Link, useParams } from "react-router-dom";
import { Icons } from "../../assets/icons/icons";
import { message, notification } from "antd";
import Review from "../../components/review/review";
import AppLayout from "../../components/appLayout/AppLayout";
import StarRating from "../../components/starRating/StarRating";
import Button from "../../components/Button/Button";
import BookingPlace from "../../components/bookings/BookingPlace";
import RoomCard from "../../components/room-card/RoomCard";
import ReviewCard from "../../components/review-card/ReviewCard";
import SimilarItems from "../../components/similar-items/SimilarItems";
import LocationOnMap from "../../components/location-on-map/LocationOnMap";
import GallerySlider from "../../components/image-slider/GallerySlider";
import { useTranslation } from "react-i18next";
import AccomodationCard from "../../components/cottages/AccomodationCard";
import styles from "./ItemPage.module.css";
import {
  useGetAllDachasQuery,
  useGetDachaQuery,
} from "../../servises/cottagesAPI";

const ItemPage = () => {
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const { id: cottageId } = useParams();
  const { data: cottage, error, isLoading } = useGetDachaQuery(cottageId);
  const { data: cottages, isLoadingAll } = useGetAllDachasQuery();

  return (
    <AppLayout>
      {contextHolder}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles["item-page-container"]}>
          <ItemPageHeader
            title={cottage?.title}
            rating={cottage?.rating}
            reviews={cottage?.reviews_number}
          />
          <GallerySlider />
          <div className={styles["item-main"]}>
            <div className={styles["item-main-info"]}>
              <section className={styles["item-main-info-section"]}>
                <h3>{t("item_page_overview")}</h3>
                <p className={styles["item-main-descr"]}>
                  {cottage?.additional_info}
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

              {/* <section className={styles["item-main-info-section"]}>
                <h3>{t("item_page_rooms")}</h3>
                <RoomCard />
              </section> */}
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
            <LocationOnMap position={[cottage?.latitude, cottage?.longitude]} />
          </section>

          {cottages?.length > 0 && (
            <section className={styles["item-main-info-section"]}>
              <h3>{t("item_page_similar")}</h3>
              <div className={styles["item-main-similar"]}>
                {cottages?.slice(0, 2).map((similarDacha) => (
                  <AccomodationCard accommodation={similarDacha} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </AppLayout>
  );
};
1;
export default ItemPage;

const ItemPageHeader = ({ title, rating, reviews }) => {
  const { t } = useTranslation();
  return (
    <div className={styles["header-wrapper"]}>
      <div className={styles["header-details"]}>
        <h2>{title}</h2>
        <StarRating rating={rating} staticRating={true} />
        <div className={styles["header-avg-rating"]}>{rating}</div>
        <div className={styles["header-reviews"]}>
          {reviews} {t("reviews")}
        </div>
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
