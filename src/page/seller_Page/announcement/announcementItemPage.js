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

const AnnouncementItemPage = () => {
    const [dachaData, setDachaData] = useState();
    const [initialState, setInitialState] = useState({
        display_name: null,
        latitude: null,
        longitude: null,
        type: 'dacha',
        price_type:'',
        title: '',
        price: '',
        info: '',
        area: '',
        floors: '',
        minimum_book_days: '',
        minimum_preorder_days: '',
        rooms_number: '',
    });
    const [typePrice, setTypePrice] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [selectPosition, setSelectPosition] = useState(null);
    const [events, setEvents] = useState([]);
    const {Option} = Select;
    const {id} = useParams();
    const handleSend = () => {
        if (initialState.title && initialState.info && initialState.price !== 0) {
            if (initialState.location_name) {
                if (initialState.floors &&
                    initialState.area && initialState.rooms_number
                    && initialState.minimum_book_days && initialState.minimum_preorder_days) {
                    UpdateDachaAPI(id,initialState).then(r => {
                        if (r?.status === 200) {
                            message.success('success')
                            window.location.reload()
                        } if (r?.response?.status === 401) {
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
    const handleDelete = () =>{
        DeleteDachaAPI(id).then(r => {
            if (r.status === 200){
                window.location.assign(CABINET+ANNOUNCEMENT)
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
                price_type:r?.price_type
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

    return (
        <div className={styles["Item-Page"]}>
            <AnnItemAddPhoto dachaId={id} dacha={dachaData}
                             className={styles["container-md"]}
                             styles={styles}/>
            <Box m="20px">
                <div className={`${styles["item-info"]} ${styles["container-md"]}`}>
                    <div className={styles["info-header"]}>
                        <div className={styles["header-left"]}>
                            <div className={styles["name"]}>
                                <Input
                                value={initialState?.title}
                                onChange={(e) => setInitialState({...initialState, title: e.target.value})}
                            /></div>
                            <div>
                                <Score score={3.5} className={styles["score"]}/>
                            </div>
                        </div>
                        <div className={styles["header-right"]}>
                            <div>
                                <Input
                                    addonAfter={selectAfter}
                                    value={initialState?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                                    type={'text'}
                                    stayl={{width:100}}
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
                            </div>
                        </div>
                    </div>
                         <div className={styles["info-details"]}>
                        <div className={styles["title-md"]}>Подробности</div>
                        <Tag style={{fontSize: '16px', margin: '10px'}} className={styles.antTag}>Этажность :
                            <input
                                value={initialState?.floors}
                                type={'number'}
                                onChange={(e) => setInitialState({...initialState, floors: e.target.value})}
                            />
                        </Tag>
                        <Tag style={{fontSize: '16px', margin: '10px'}} className={styles.antTag}>Площадь :
                            <input
                                type={'number'}
                            value={initialState?.area}
                            onChange={(e) => setInitialState({...initialState, area: e.target.value})}
                        /></Tag>
                        <Tag style={{fontSize: '16px', margin: '10px'}} className={styles.antTag}>количество комнат :
                            <input
                                value={initialState?.rooms_number}
                                type={'number'}
                                onChange={(e) => setInitialState({...initialState, rooms_number: e.target.value})}
                            />
                        </Tag>
                        <Tag style={{fontSize: '16px', margin: '10px'}}>местоположение : {initialState?.location_name}</Tag>
                    </div>
                    <div className={styles["info-description"]}>
                        <div className={styles["title-md"]}>Описание</div>
                        <div className={styles["description-text"]}>
                            <TextArea
                                style={{width:"100%" , border:'none'}}
                                value={initialState?.info}
                                onChange={(e) => setInitialState({...initialState, info: e.target.value})}
                                autoSize={{
                                    minRows: 3,
                                    maxRows: 5,
                                }}
                            />
                        </div>
                    </div>

                    <div className={styles["info-location"]}>
                        <div className={styles["title-md"]}>Локация</div>
                        <MapsAnnouncement setSelectPosition={setSelectPosition} selectPosition={selectPosition}/>
                    </div>
                    <div style={{display:'flex' , justifyContent:"center" ,alignItems:"center" , marginBottom:"60px"}}>
                        {isLoading ? (
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                                size={'large'}
                                style={{ background: '#4CCEAC'}}
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
                                style={{marginLeft:'20px'}}
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
                                style={{marginLeft:'20px'}}
                                onClick={handleDelete}
                            >
                                Delete
                            </Button>
                        )}
                    </div>
                    <Box>
                        <Box flex="1 1 100%" >
                            <Calendar idDacha={id} setEvents={setEvents} events={events}/>
                        </Box>

                        <Box flex={'1 1 100%'} mt={'15px'}>
                            <Calendar_Requests events={events} idDacha={id}/>
                        </Box>
                    </Box>
                </div>





            </Box>
        </div>
    );
};

export default AnnouncementItemPage;


         