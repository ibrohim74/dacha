import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {
    LOGIN_ROUTE,
    REGISTER_ROUT,
    HOME_ROUTE,
} from "../../processes/utils/consts";
import {Icons} from "../../assets/icons/icons";
import styles from "./item_Page.module.css";
import ItemCard from "../../components/item-card/item-card";
import Footer from "../../components/footer/footer";
import ImageSlider from "../../components/image-slider/image-slider";
import Score from "../../components/score/score";
import Header from "../../components/header/header";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import L from "leaflet";
import {Button, DatePicker, Input, message, Modal, notification, Tag} from "antd";
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs';
import {CreateRequestAPI, GetSellerBookingAPI} from "./API/itemPageAPI";

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
const Context = React.createContext({
    name: 'Default',
});
const Item_Page = () => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [SliderData, setSliderData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [errorNotification, setErrorNotification] = useState('')
    const [bookingData , setBookingData] = useState([])
    const JWT = localStorage.getItem("token")
        ? jwtDecode(localStorage.getItem("token"))
        : null;
    const {id} = useParams();
    const {RangePicker} = DatePicker;
    const [initialState, setInitialState] = useState({
        requested_price:0,
        customer_id:parseInt(JWT?.userId),
        accommodation_id: parseInt(id),
        start_price:300,
        accommodation_type:'dacha'
    })
    const villas = [
        {name: "Дача 1", price: "109.90", score: 5, img: null},
        {name: "Дача 2", price: "89.90", score: 4.2, img: null},
        {name: "Дача 3", price: "99.90", score: 3.6, img: null},
        {name: "Дача 4", price: "39.90", score: 4.7, img: null},
        {name: "Дача 5", price: "69.90", score: 4.9, img: null},
        {name: "Дача 6", price: "49.90", score: 4.4, img: null},
        {name: "Дача 7", price: "59.90", score: 3, img: null},
        {name: "Дача 8", price: "79.90", score: 2.5, img: null},
    ];

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/dacha/${id}`
            );
            setProduct(response.data);
            setSliderData(response.data?.photos_path.split('\n').filter(Boolean));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError("** ERROR ** PRODUCT NOT FOUND");
            console.error("Failed to fetch dacha", error);
        }
    };

    useEffect(() => {
        fetchProduct();

    }, []);
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                if (product?.parent_id) {
                    const response = await GetSellerBookingAPI(product.parent_id);
                    const data = response?.data;

                    // Har bir "booking" ma'lumotini tekshirish
                    const filteredData = data.filter(booking => booking.accommodation_id === parseInt(id));

                    // "booking" ma'lumotlarini tekshirilgan ma'lumotlar bilan almashtirish
                    setBookingData(filteredData);
                }
            } catch (error) {
                console.error("Error fetching seller booking data:", error);
            }
        };

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
            const selectedDates = dateString.map(date => dayjs(date));

            if (selectedDates.some(date => !date.isValid())) {
                throw new Error('Invalid date format');
            }

            const differenceInDays = selectedDates[1].diff(selectedDates[0], 'day');
            console.log(differenceInDays)
            if (differenceInDays < minimumBookDays) {
                setInitialState({...initialState, start_day:'' , end_day:''})
                setErrorNotification(`* Ошибка: Минимальное количество дней бронирования не может быть меньше ${product?.minimum_book_days} дней.`);
            } else {
                setErrorNotification('');
                const start_day = selectedDates[0].format('YYYY.MM.DD HH:mm');
                const end_day = selectedDates[1].format('YYYY.MM.DD HH:mm');

                setInitialState({ ...initialState, start_day, end_day });
            }
        } catch (error) {
            console.error('Error processing dates:', error);
            setErrorNotification('* Ошибка: Неверный формат даты или время.');
            setInitialState({...initialState, start_day:'' , end_day:''})
        }
    };

    const handleOpenBron = () => {
        setIsModalOpen(true)

    }
    const disabledDate = (current) => {
        if (!current) return false;

        const today = dayjs();

        if (current.isBefore(today, 'day') || current.isSame(today, 'day')) {
            return true;
        }


        if (bookingData.length > 0) {
            if (bookingData.some(booking => (
                current >= dayjs(booking.start_day) && current <= dayjs(booking.end_day)
            ))) {
                return true;
            }
        }

        return false;
    };



    const openNotification = (placement) => {
        api.info({
            message: `Бронирование`,
            description: <p style={{fontSize: 17}}>Войдите в личный кабинет, чтобы забронировать</p>,
            placement,
        });
    };
                                       
    const handleSendData = () => {
        CreateRequestAPI(initialState).then(r => {
            if (r?.status === 200){
                message.success('Jonatildi')
                window.location.reload()
            }
        })
    }
    return (
        <div className={styles["Item-Page"]}>
            {contextHolder}
            <Header/>
            <ImageSlider
                slides={SliderData}
                className={styles["container-md"]}
                styles={styles}
            />
            <Modal title="Бронирование" open={isModalOpen} onCancel={handleCancel}>
                <ul style={{padding: 0}}>
                    <li><p style={{fontSize: '17px'}}>Бронирование возможно минимум
                        за {product?.minimum_preorder_days} дня.</p></li>
                    <li><p style={{fontSize: '17px'}}>Вы можете забронировать минимум
                        на {product?.minimum_book_days} дней</p></li>
                </ul>

                <span style={{color: 'red'}}>{errorNotification}</span>
                <RangePicker
                    showTime={{
                        format: 'HH:mm',
                    }}
                    onChange={onChange}
                    format="YYYY-MM-DD HH:mm:ss"

                    disabledDate={disabledDate}
                />

                <div className={'input'}>
                    <label htmlFor="reqPrice">напишите цену, о которой хотите договориться</label>
                    <Input
                        addonAfter={product?.price_type}
                        value={initialState?.requested_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                        type={'text'}
                        onChange={(e) => {
                            const cleanedValue = e.target.value.replace(/\s/g, '');
                            setInitialState({
                                ...initialState,
                                requested_price: cleanedValue !== '' ? parseInt(cleanedValue) : 0,
                            });
                        }}
                        onBlur={() => {
                            if (!initialState.requested_price || isNaN(initialState.requested_price)) {
                                setInitialState({
                                    ...initialState,
                                    requested_price: 0,
                                });
                            }
                        }}
                    />
                </div>
                <div>
                    <p style={{fontSize:16}}>продавец установил цену {product?.price} {product?.price_type} за 1 день </p>
                </div>
                <Button onClick={handleSendData}>отправить</Button>
            </Modal>



            <div className={`${styles["item-info"]} ${styles["container-md"]}`}>
                <div className={styles["info-header"]}>
                    <div className={styles["header-left"]}>
                        <div className={styles["name"]}>{product.title}</div>
                        <div>
                            <Score score={3.5} className={styles["score"]}/>
                        </div>
                    </div>
                    <div className={styles["header-right"]}>
                        {JWT ? (<>
                            <div className={styles["book-btn"]} onClick={handleOpenBron}>Бронировать</div>
                        </>) : (<div className={styles["book-btn"]}
                                     onClick={() => openNotification('topRight')}
                        >Бронировать</div>)}

                        <div>{`${product.price} ${product.type}`}/день</div>
                    </div>
                </div>

                <div className={styles["info-details"]}>
                    <div className={styles["title-md"]}>Подробности</div>
                    <Tag style={{fontSize: '16px', margin: '10px'}}>Этажность : {product?.floors}</Tag>
                    <Tag style={{fontSize: '16px', margin: '10px'}}>Площадь : {product?.area}</Tag>
                    <Tag style={{fontSize: '16px', margin: '10px'}}>количество комнат : {product?.rooms_number}</Tag>
                    <Tag style={{fontSize: '16px', margin: '10px'}}>местоположение : {product?.location_name}</Tag>
                </div>

                <div className={styles["info-description"]}>
                    <div className={styles["title-md"]}>Описание</div>
                    <div className={styles["description-text"]}>{product.info}</div>
                </div>

                <div className={styles["info-location"]}>
                    <div className={styles["title-md"]}>Локация</div>
                    <p>{product?.location_name}</p>
                    <MapContainer zoom={14} center={{lat: product?.latitude, lng: product?.longitude}}
                                  style={{width: '100%', height: '200px', overflow: 'hidden', borderRadius: '20px'}}
                    >
                        <TileLayer
                            attribution="Dacha.uz"
                            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                        />
                        <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"/>

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

            <Footer/>
        </div>
    );
};

export default Item_Page;
