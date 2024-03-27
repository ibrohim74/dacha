import React, {useEffect, useState} from "react";
import {Box, Button, Checkbox, FormControlLabel} from "@mui/material";
import Create_InputLeft from "./component/create_InputLeft";
import styles from "./assets/create_ann.module.css";
import {Input, message, Radio, Switch} from "antd";
import {jwtDecode} from "jwt-decode";
import {CreateAnnouncementAPI} from "./API/announcementAPI";
import {LoadingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {ANNOUNCEMENT, CABINET} from "../../../processes/utils/consts";
import AnnCreateAddPhoto from "./component/ann_create_addPhoto";
import container from '../../../components/appLayout/AppLayout.module.css'
import Modal from "../../../components/modal/Modal";
import PaymentMethods from "../../../components/payment-methods/PaymentMethods";
import MapsAnnouncement from "./component/mapsAnnouncement";
import {Icons} from "../../../assets/icons/icons";

const CreateAnnouncement = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [initialState, setInitialState] = useState({
        type: "dacha",
        tags: "tag",
        price: 0,
        price_type:'uzs',
        cancellable: false
    });
    const [loading, setLoading] = useState(false);
    const [arrayImages, setArrayImages] = useState([]);
    const navigate = useNavigate();
    const JWT = jwtDecode(localStorage.getItem("token"));
    const [lang, setLang] = useState('ru')


    console.log(initialState)
    return (
        <Box>
            <div className={container.container} style={{background: '#fff', padding: "20px", borderRadius: "20px"}}>
                <AnnCreateAddPhoto arrayImages={arrayImages} setArrayImages={setArrayImages}/>
                <div className={styles.create_ann_line_lang}>
                    <div className={styles.create_ann_line_ru}
                         onClick={() => setLang('ru')}
                         style={lang === 'ru' ? {background: '#fff'} : {background: "transparent"}}
                    >
                        Русский
                    </div>
                    <div className={styles.create_ann_line_uzb}
                         onClick={() => setLang('uz')}
                         style={lang === 'uz' ? {background: '#fff'} : {background: "transparent"}}
                    >
                        O’zbecha
                    </div>
                </div>

                <div className={styles.create_ann_line_title}>
                    <div className={styles.create_ann_line_title_left}>
                        <div className={styles.create_ann_input}>
                            <p>Название здания</p>
                            <input type="text" placeholder={'Название дачи'}
                                   value={initialState?.title}
                                   onChange={e => setInitialState({...initialState, title: e.target.value})}
                            />
                        </div>
                        <div className={styles.create_ann_input}>
                            <p>Описание</p>
                            <textarea type="text" placeholder={'Полное описание'}
                                      value={initialState?.info}
                                      onChange={e => setInitialState({...initialState, info: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className={styles.create_ann_line_title_right}>
                        <div className={styles.create_ann_input}>
                            <p>Основыне теги</p>
                            <select
                                value={initialState?.tags}
                                onChange={e => setInitialState({...initialState, tags: e.target.value})}>
                                <option value="tag">Tag</option>
                                <option value="tag2">Tag 2</option>
                            </select>

                        </div>
                        <div className={styles.create_ann_input}>
                            <p>Дополнительно описание</p>
                            <textarea type="text" placeholder={'Пополнительное описание'}
                                      onChange={e => setInitialState({...initialState, info: e.target.value})}
                            />
                        </div>
                    </div>
                </div>

                <h1 className={styles.create_ann_subTitle}>Параменты заселения</h1>

                <div className={styles.create_ann_line_price_periud}>
                    <div className={styles.create_ann_line_title_left}>
                        <div className={styles.create_ann_input}>
                            <p>Стоимость за одну ночь</p>
                            <input type="text" placeholder={'К примеру 300.000'}
                                   value={initialState?.price
                                       ?.toString()
                                       .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}

                                   onChange={(e) => {
                                       const cleanedValue = e.target.value.replace(/\s/g, "");
                                       setInitialState({
                                           ...initialState,
                                           price: cleanedValue !== "" ? parseInt(cleanedValue) : 0,
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
                        <div className={styles.create_ann_input}>
                            <p>Минимальный срок бронирования</p>
                            <input type="number" placeholder={'К примеру 3 дня'}
                                   value={initialState?.minimum_book_days}
                                   onChange={e =>setInitialState({...initialState, minimum_book_days:parseInt(e.target.value)})}
                            />
                        </div>
                    </div>
                    <div className={styles.create_ann_line_title_right}>
                        <div className={styles.create_ann_input}>
                            <p>Валюта</p>
                            <select value={initialState?.price_type}
                                    onChange={e => setInitialState({...initialState, price_type: e.target.value})}>
                                <option value="uzs">Uzs</option>
                                <option value="usd">Usd</option>
                            </select>

                        </div>
                        <div className={styles.create_ann_input}>
                            <p>Максимальный срок предварительного бронирования</p>
                            <input type="number" placeholder={'К примеру 10 дней'}
                                   value={initialState?.minimum_preorder_days}
                                   onChange={e => setInitialState({...initialState, minimum_preorder_days:parseInt(e.target.value) })}
                            />
                        </div>
                    </div>
                </div>


                <h1 className={styles.create_ann_subTitle}>Список удобств</h1>

                <Modal>
                    <Modal.Open opens="payment-methods">
                        <div className={styles.create_ann_list_comfort_btn}>
                            <p>Добавить</p>
                        </div>
                    </Modal.Open>
                    <Modal.Window name="payment-methods" title={"Список удобств"}>
                        <div className={styles.create_ann_list_comfort}>
                            <div className={styles.create_ann_list_comfort_checkbox}>
                                <FormControlLabel control={<Checkbox
                                    sx={{
                                        '& .MuiSvgIcon-root': {fontSize: 30}, border: 'none', color: 'none',
                                        '&.Mui-checked': {
                                            color: '#006FFD',
                                        },
                                    }}
                                />} label="WI-FI"/>
                            </div>
                            <div className={styles.create_ann_list_comfort_checkbox}>
                                <FormControlLabel control={<Checkbox
                                    sx={{
                                        '& .MuiSvgIcon-root': {fontSize: 30}, border: 'none', color: 'none',
                                        '&.Mui-checked': {
                                            color: '#006FFD',
                                        },
                                    }}
                                />} label="WI-FI"/>
                            </div>
                            <div className={styles.create_ann_list_comfort_checkbox}>
                                <FormControlLabel control={<Checkbox
                                    sx={{
                                        '& .MuiSvgIcon-root': {fontSize: 30}, border: 'none', color: 'none',
                                        '&.Mui-checked': {
                                            color: '#006FFD',
                                        },
                                    }}
                                />} label="WI-FI"/>
                            </div>
                            <div className={styles.create_ann_list_comfort_checkbox}>
                                <FormControlLabel control={<Checkbox
                                    sx={{
                                        '& .MuiSvgIcon-root': {fontSize: 30}, border: 'none', color: 'none',
                                        '&.Mui-checked': {
                                            color: '#006FFD',
                                        },
                                    }}
                                />} label="WI-FI"/>
                            </div>

                            <button>Сохранить</button>
                        </div>
                    </Modal.Window>
                </Modal>

                <div className={styles.create_ann_line_adults}>
                    <div className={styles.create_ann_line_adults_left}>
                        <h1>Возможность заселения с детьми</h1>
                        <Switch style={{background: "yellow"}}/>
                    </div>
                    <div className={styles.create_ann_line_adults_right}>
                        <h1>Возможность продления срока</h1>
                        <Switch style={{background: "yellow"}}/>
                    </div>
                </div>

                <div className={styles.create_ann_contact}>
                    <div className={`${styles.create_ann_input} ${styles.activeTel}`}>
                        <input
                            type="text"
                            placeholder="Введите номер телефона"
                            value={initialState?.phone}
                            onChange={e => {
                                const formattedValue = e.target.value.replace(/\D/g, ''); // faqat raqamlarni qabul qilish
                                let formattedNumber = '+998';
                                if (formattedValue.length > 3) {
                                    formattedNumber += ' ' + formattedValue.substring(3, 5);
                                }
                                if (formattedValue.length > 5) {
                                    formattedNumber += ' ' + formattedValue.substring(5, 8);
                                }
                                if (formattedValue.length > 8) {
                                    formattedNumber += ' ' + formattedValue.substring(8, 10);
                                }
                                if (formattedValue.length > 10) {
                                    formattedNumber += ' ' + formattedValue.substring(10, 12);
                                }
                                setInitialState({...initialState, phone: formattedNumber});
                            }}
                        />

                    </div>
                    <div className={`${styles.create_ann_input}`}>
                        <input type="text" value={initialState?.phone2}
                               placeholder={'Добавить номер'}
                               onChange={e => {
                                   const formattedValue = e.target.value.replace(/\D/g, ''); // faqat raqamlarni qabul qilish
                                   let formattedNumber = '+998';
                                   if (formattedValue.length > 3) {
                                       formattedNumber += ' ' + formattedValue.substring(3, 5);
                                   }
                                   if (formattedValue.length > 5) {
                                       formattedNumber += ' ' + formattedValue.substring(5, 8);
                                   }
                                   if (formattedValue.length > 8) {
                                       formattedNumber += ' ' + formattedValue.substring(8, 10);
                                   }
                                   if (formattedValue.length > 10) {
                                       formattedNumber += ' ' + formattedValue.substring(10, 12);
                                   }
                                   setInitialState({...initialState, phone2: formattedNumber});
                               }}/>
                    </div>
                </div>
            </div>
            <div className={container.container}>
                <h1 className={styles.create_ann_subTitle}>На карте</h1>
                <MapsAnnouncement
                    setSelectPosition={setSelectPosition}
                    selectPosition={selectPosition}
                    mapStyle={{
                        width: "100%",
                        height: "400px"
                    }}
                />
                <div className={styles.create_ann_save_line}>
                    <div className={styles.create_ann_save_line_item}>
                        <div className={styles.create_ann_save_line_item_delete}>
                            <Icons.DeleteImgIcon/>
                        </div>
                        <div className={styles.create_ann_save_line_item_save}>Сохранить</div>
                    </div>
                </div>
            </div>

            {/*<div className={styles["create-calendar-box"]}>*/}
            {/*    <Create_InputLeft inputLeft={inputLeft} setInputLeft={setInputLeft}/>*/}
            {/*    <div className={styles["calendar-map"]}>*/}
            {/*        <div className={styles["box-2-input"]}>*/}
            {/*            <div*/}
            {/*                className={`${styles["input-2-row"]} ${styles["input"]}`}*/}
            {/*                style={{marginTop: "10px"}}*/}
            {/*            >*/}
            {/*                /!* <label htmlFor="floor">Этажность</label> *!/*/}
            {/*                <Input*/}
            {/*                    placeholder={"Этажность"}*/}
            {/*                    size={"large"}*/}
            {/*                    type={"number"}*/}
            {/*                    onChange={(e) =>*/}
            {/*                        setInitialState({...initialState, floors: e.target.value})*/}
            {/*                    }*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*            <div*/}
            {/*                className={`${styles["input-2-row"]} ${styles["input"]}`}*/}
            {/*                style={{marginTop: "10px"}}*/}
            {/*            >*/}
            {/*                /!* <label htmlFor="area">Площадь</label> *!/*/}
            {/*                <Input*/}
            {/*                    placeholder={"Площадь"}*/}
            {/*                    size={"large"}*/}
            {/*                    type={"number"}*/}
            {/*                    onChange={(e) =>*/}
            {/*                        setInitialState({...initialState, area: e.target.value})*/}
            {/*                    }*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className={styles["input"]} style={{marginTop: "10px"}}>*/}
            {/*            /!* <label htmlFor="phone">количество комнат</label> *!/*/}
            {/*            <Input*/}
            {/*                placeholder="Количество комнат"*/}
            {/*                type={"number"}*/}
            {/*                onChange={(e) =>*/}
            {/*                    setInitialState({*/}
            {/*                        ...initialState,*/}
            {/*                        rooms_number: e.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={styles["input"]} style={{marginTop: "10px"}}>*/}
            {/*            /!* <label htmlFor="phone">minimum_book_days</label> *!/*/}
            {/*            <Input*/}
            {/*                placeholder="Минимальное количество дней бронирования"*/}
            {/*                type={"number"}*/}
            {/*                onChange={(e) =>*/}
            {/*                    setInitialState({*/}
            {/*                        ...initialState,*/}
            {/*                        minimum_book_days: e.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={styles["input"]} style={{marginTop: "10px"}}>*/}
            {/*            /!* <label htmlFor="phone">minimum_preorder_days</label> *!/*/}
            {/*            <Input*/}
            {/*                placeholder="Минимальное количество дней предзаказа"*/}
            {/*                type={"number"}*/}
            {/*                onChange={(e) =>*/}
            {/*                    setInitialState({*/}
            {/*                        ...initialState,*/}
            {/*                        minimum_preorder_days: e.target.value,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        <div className={styles["input"]} style={{*/}
            {/*            marginTop: "10px",*/}
            {/*            alignItems: "center",*/}
            {/*            display: "flex",*/}
            {/*            justifyContent: "space-around"*/}
            {/*        }}>*/}
            {/*            <label htmlFor="phone">разрешить отмену бронирования</label>*/}
            {/*            <Input*/}
            {/*                placeholder="разрешить отмену бронирования"*/}
            {/*                type={"checkbox"}*/}
            {/*                onChange={(e) =>*/}
            {/*                    setInitialState({*/}
            {/*                        ...initialState,*/}
            {/*                        cancellable: !initialState.cancellable,*/}
            {/*                    })*/}
            {/*                }*/}
            {/*            />*/}
            {/*        </div>*/}
            {/*        {loading ? (*/}
            {/*            <Button*/}
            {/*                type="submit"*/}
            {/*                color="secondary"*/}
            {/*                variant="contained"*/}
            {/*                size={"large"}*/}
            {/*                style={{width: "100%", marginTop: "20px"}}*/}
            {/*                disabled={true}*/}
            {/*            >*/}
            {/*                <LoadingOutlined/>*/}
            {/*            </Button>*/}
            {/*        ) : (*/}
            {/*            <Button*/}
            {/*                type="submit"*/}
            {/*                color="secondary"*/}
            {/*                variant="contained"*/}
            {/*                size={"large"}*/}
            {/*                style={{width: "100%", backgroundColor: "#505050"}}*/}
            {/*                onClick={handleSend}*/}
            {/*            >*/}
            {/*                Create*/}
            {/*            </Button>*/}
            {/*        )}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </Box>
    );
};

export default CreateAnnouncement;
