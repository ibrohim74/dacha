import React, {useEffect, useState} from 'react';
import {CreateAnnouncementAPI, DeleteDachaAPI, GetDachaAPI, UpdateDachaAPI} from './API/announcementAPI';
import {useParams} from 'react-router-dom';
import {Box, Button, List, ListItem, ListItemText, Typography, useTheme} from '@mui/material';
import {tokens} from '../../../components/theme';
import {formatDate} from '@fullcalendar/core';
import HeaderAdminPage from '../../../components/header_adminPage';
import Calendar from './component/calendar';
import {Input, message, Modal, Select, Tag} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import {LoadingOutlined} from '@ant-design/icons';
import MapsAnnouncement from './component/mapsAnnouncement';
import AnnItemAddPhoto from "./component/annItemAddPhoto";
import {ANNOUNCEMENT, CABINET} from "../../../processes/utils/consts";
import styles from "../../item_Page/item_Page.module.css";
import ImageSlider from "../../../components/image-slider/image-slider";
import Score from "../../../components/score/score";
import {transformation} from "leaflet/dist/leaflet-src.esm";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import Calendar_Requests from "./component/Calendar_Requests";
import Review from "../../../components/review/review";
import EditInput from "../../../components/edit-input/edit-input";
import {Icons} from "../../../assets/icons/icons";

const Announcement_Item_Page = () => {
    const [dachaData, setDachaData] = useState();
    const [initialState, setInitialState] = useState({
        display_name: null,
        latitude: null,
        longitude: null,
        type: 'dacha',
        price_type: '',
        // title: '',
        price: '',
        info: '',
        area: '',
        floors: '',
        rating:0,
        minimum_book_days: '',
        minimum_preorder_days: '',
        rooms_number: '',
    });
    const [typePrice, setTypePrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectPosition, setSelectPosition] = useState(null);
    const [events, setEvents] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const {Option} = Select;
    const {id} = useParams();
    const handleSend = () => {
        if (initialState.title && initialState.info && initialState.price !== 0) {
            if (initialState.location_name) {
                if (initialState.floors &&
                    initialState.area && initialState.rooms_number
                    && initialState.minimum_book_days && initialState.minimum_preorder_days) {
                    UpdateDachaAPI(id, initialState).then(r => {
                        if (r?.status === 200) {
                            message.success('success')
                            window.location.reload()
                        }
                        if (r?.response?.status === 401) {
                            localStorage.clear()
                            window.location.assign('/')
                        }
                    })
                } else {
                    message.error('barcha malumotlarni toldiring')
                }

            } else {
                message.error('qidiruv tugmasi orqali kerakli joyni qidirib tanlang')
            }
        } else {
            message.error('barcha malumotlarni toldiring')
        }
    };
    const handleDelete = () => {
        DeleteDachaAPI(id).then(r => {
            if (r.status === 200) {
                window.location.assign(CABINET + ANNOUNCEMENT)
            }
        })
    }

    const priceType = (val) => {
        setInitialState({...initialState, price_type: val});
    };
    const selectAfter = (
        <Select defaultValue={typePrice} onChange={priceType}>
            <Option value="UZS">UZS</Option>
            <Option value="Y.E">Y.E</Option>
        </Select>
    );

    useEffect(() => {
        GetDachaAPI(id).then((r) => {
            console.log(r)
            setDachaData(r);
            setTypePrice(r?.price_type);
            setInitialState({
                title: r?.title,
                price: r?.price,
                info: r?.info,
                area: r?.area,
                floors: r?.floors,
                minimum_book_days: r?.minimum_book_days,
                minimum_preorder_days: r?.minimum_preorder_days,
                rooms_number: r?.rooms_number,
                type: r?.type,
                price_type: r?.price_type,
                rating:r?.rating
            });
            setSelectPosition({
                lat: r?.latitude,
                lon: r?.longitude,
                display_name: r?.location_name,
            });
        });
    }, [id]);

    useEffect(() => {
        setInitialState({
            ...initialState,
            location_name: selectPosition?.display_name,
            latitude: parseFloat(selectPosition?.lat),
            longitude: parseFloat(selectPosition?.lon),
        });
    }, [selectPosition]);
    console.log(initialState)
    return (
        <div className={styles["Item-Page"]}>
            <AnnItemAddPhoto dachaId={id} dacha={dachaData}
                             className={styles["container-md"]}
                             styles={styles}/>
            <Box m="20px">
                <div className={`${styles["item-info"]} ${styles["container-md"]}`}>
                    <div className={styles["info-header"]}>
                        <div className={styles["header-left"]}>


                            <div className={styles["name "]}>

                                <EditInput
                                    key={dachaData?.id}
                                    className={styles["text-input"]}
                                    value={dachaData?.title && dachaData.title}
                                    onChange={(e) =>
                                        setInitialState({ ...initialState, title: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <Score score={initialState?.rating} showzero className={styles["score"]}/>
                            </div>
                        </div>
                        <div className={styles["header-right "]}  style={{flexDirection:'row'}}>

                            {!isEditing ? (
                                <>
                                    <span style={{ color: "black" }}>{dachaData?.price}{dachaData?.price_type}</span>
                                    <Icons.Pencil
                                        style={{ width: "20px", cursor: "pointer" }}
                                        onClick={() => setIsEditing(true)}
                                    />
                                </>
                            ) : (
                                <Input
                                    addonAfter={selectAfter}
                                    value={initialState?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                                    type={'number'}

                                    onChange={(e) => {
                                        const cleanedValue = e.target.value.replace(/\s/g, '');
                                        setInitialState({
                                            ...initialState,
                                            price: cleanedValue !== '' ? parseInt(cleanedValue) : 0,
                                        });
                                    }}
                                    onBlur={() => {
                                        if (!initialState.price || isNaN(initialState.price)) {
                                            setInitialState({
                                                ...initialState,
                                                price: 0,
                                            });
                                        }
                                    }}
                                />
                            )}

                        </div>
                    </div>
                    <div className={styles["info-details"]}>
                        <div className={styles["title-md"]}>Подробности</div>

                        <div style={{margin:"10px 0"}}>
                            <label htmlFor="floors">
                                Этажность :
                            </label>
                            <EditInput
                                key={dachaData?.id}
                                value={dachaData?.floors}
                                type={'number'}
                                className={styles['text-input']}
                                onChange={(e) => setInitialState({...initialState, floors: e.target.value})}

                            />
                        </div>         


                        <div style={{margin:"10px 0"}}>
                            <label htmlFor="floors">
                                Площадь                                                                                                                             :
                            </label>
                            <EditInput
                                key={dachaData?.id}
                                type={'number'}
                                className={styles['text-input']}
                                value={dachaData?.area}
                                onChange={(e) => setInitialState({...initialState, area: e.target.value})}
                            />
                        </div>

                        <div style={{margin:"10px 0"}}>
                            <label htmlFor="floors">
                                количество комнат :
                            </label>
                            <EditInput
                                key={dachaData?.id}
                                className={styles['text-input']}
                                value={dachaData?.rooms_number}
                                type={'number'}
                                onChange={(e) => setInitialState({...initialState, rooms_number: e.target.value})}
                            />
                        </div>

                        <div style={{margin:"10px 0"}}>
                            <label htmlFor="floors">
                                minimum_book_days
                            </label>
                            <EditInput
                                key={dachaData?.id}
                                className={styles['text-input']}
                                value={dachaData?.minimum_book_days}
                                type={'number'}
                                onChange={(e) => setInitialState({...initialState, minimum_book_days: e.target.value})}
                            />
                        </div>

                        <div style={{margin:"10px 0"}}>
                            <label htmlFor="floors">
                                minimum_preorder_days

                            </label>
                            <EditInput
                                key={dachaData?.id}
                                className={styles['text-input']}
                                value={dachaData?.minimum_preorder_days}
                                type={'number'}
                                onChange={(e) => setInitialState({...initialState, minimum_preorder_days: e.target.value})}
                            />
                        </div>


                        <Tag style={{fontSize: '16px', margin: '10px'}}>местоположение
                            : {initialState?.location_name}</Tag>
                    </div>
                    <div className={styles["info-description"]}>
                        <div className={styles["title-md"]}>Описание</div>
                        <div className={styles["description-text"]} style={{position:'relative'}}>

                            {!isEditing ? (
                                <>
                                    <span style={{ color: "black" }}>{dachaData?.info}</span>
                                    <Icons.Pencil
                                        style={{ width: "20px", cursor: "pointer", position:"absolute" , right:'20px' , top:0}}
                                        onClick={() => setIsEditing(true)}
                                    />
                                </>
                            ) : (
                                <TextArea
                                    style={{width: "100%", border: 'none'}}
                                    value={initialState?.info}
                                    onChange={(e) => setInitialState({...initialState, info: e.target.value})}
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                />
                            )}



                        </div>
                    </div>

                    <div className={styles["info-location"]}>
                        <div className={styles["title-md"]}>Локация</div>
                        <MapsAnnouncement setSelectPosition={setSelectPosition} selectPosition={selectPosition}/>
                    </div>
                    <div
                        style={{display: 'flex', justifyContent: "center", alignItems: "center", marginBottom: "60px"}}>
                        {isLoading ? (
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                size={'large'}
                                style={{background: '#4CCEAC'}}
                                disabled={true}
                            >
                                <LoadingOutlined/>
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                size={'large'}

                                onClick={handleSend}
                            >
                                Update
                            </Button>
                        )}
                        {isLoading ? (
                            <Button
                                type="submit"
                                color="error"
                                variant="contained"
                                size={'large'}
                                style={{marginLeft: '20px'}}
                                disabled={true}
                            >
                                <LoadingOutlined/>
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                color={'error'}
                                variant="contained"
                                size={'large'}
                                style={{marginLeft: '20px'}}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                    <Box>
                        <Box flex="1 1 100%">
                            <Calendar idDacha={id} setEvents={setEvents} events={events}/>
                        </Box>

                        <Box flex={'1 1 100%'} mt={'15px'}>
                            <Calendar_Requests events={events} idDacha={id}/>
                        </Box>
                    </Box>


                    <div className={styles["info-reviews"]}>
                        <div className={styles["title-md"]}>Отзывы</div>
                        <Review dachaId={id}/>
                    </div>

                </div>


            </Box>
        </div>
    );
};

export default Announcement_Item_Page;


