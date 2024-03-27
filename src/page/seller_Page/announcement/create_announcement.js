import React, {useEffect, useState} from "react";
import {Box, Button, Checkbox, FormControlLabel} from "@mui/material";
import Create_InputLeft from "./component/create_InputLeft";
import styles from "./assets/create_ann.module.css";
import {Input, message, notification, Radio, Switch} from "antd";
import {jwtDecode} from "jwt-decode";
import {CreateAnnouncementAPI} from "./API/announcementAPI";
import {LoadingOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {ANNOUNCEMENT, CABINET, SELLER_DASHBOARD} from "../../../processes/utils/consts";
import AnnCreateAddPhoto from "./component/ann_create_addPhoto";
import container from '../../../components/appLayout/AppLayout.module.css'
import Modal from "../../../components/modal/Modal";
import PaymentMethods from "../../../components/payment-methods/PaymentMethods";
import MapsAnnouncement from "./component/mapsAnnouncement";
import {Icons} from "../../../assets/icons/icons";
import Footer from "../../../components/footer/footer";

const CreateAnnouncement = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [initialState, setInitialState] = useState({
        type: "dacha",
        tags: "tag",
        price: 0,
        price_type: 'uzs',
        cancellable: false,
        children_allowed: false,
        extension_allowed: false,
        working_days: {
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fr: false,
            sat: false,
            sun: false
        }
    });
    const [loading, setLoading] = useState(false);
    const [arrayImages, setArrayImages] = useState([]);
    const navigate = useNavigate();
    const JWT = jwtDecode(localStorage.getItem("token"));
    const [lang, setLang] = useState(true)
    const [notifications, contextHolder] = notification.useNotification();

    const handleSend = () => {
        setLoading(true)
        if (initialState.title) {
            if (initialState.info) {
                if (initialState.additional_info) {
                    if (initialState.floors) {
                        if (initialState.area) {
                            if (initialState.rooms_number) {
                                if (initialState.price) {
                                    if (initialState.minimum_book_days) {
                                        if (initialState.minimum_preorder_days) {
                                            if (initialState.contacts) {
                                                if (initialState.location_name) {


                                                    CreateAnnouncementAPI(initialState).then(r => {
                                                        if (r.status === 200) {
                                                            notifications.success({
                                                                message: lang ? "объект создан" : "ob'ekt yaratildi"
                                                            })
                                                            setTimeout(() => {
                                                                window.location.assign(CABINET + SELLER_DASHBOARD)
                                                            }, 5000)
                                                        }
                                                    }).catch(err =>
                                                        notifications.success({
                                                            message: 'sdasdsad'
                                                        })
                                                    )


                                                } else {
                                                    notifications.error({
                                                        message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                                        description: lang ? 'Местоположение дачи не выбрано' : "Dachaning joylashuvi tanlanmagan",
                                                    })
                                                }
                                            } else {
                                                notifications.error({
                                                    message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                                    description: lang ? 'номер телефона не указана' : "telefon raqami ko'rsatilmagan",
                                                })
                                            }
                                        } else {
                                            notifications.error({
                                                message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                                description: lang ? 'Максимальный срок предварительного бронирования не указана' : "Oldindan bron qilishning maksimal muddati ko'rsatilmagan",
                                            })
                                        }
                                    } else {
                                        notifications.error({
                                            message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                            description: lang ? 'Минимальный срок бронирования не указана' : "Minimal bron qilish muddati belgilanmagan",
                                        })
                                    }
                                } else {
                                    notifications.error({
                                        message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                        description: lang ? 'стоимость дача  не указана' : "Uyning narxi ko'rsatilmagan",
                                    })
                                }
                            } else {
                                notifications.error({
                                    message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                    description: lang ? 'Количество комнат не заполнено' : "Xonalar soni to'ldirilmagan ",
                                })
                            }
                        } else {
                            notifications.error({
                                message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                                description: lang ? 'Размер дач не заполнено' : "Dachaning o'lchamlari to'ldirilmagan",
                            })
                        }
                    } else {
                        notifications.error({
                            message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                            description: lang ? 'Количество этажей не заполнено' : "Qavatlar soni to'ldirilmagan",
                        })
                    }
                } else {
                    notifications.error({
                        message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                        description: lang ? 'Дополнительно описание не заполнено' : "Qo'shimcha tavsif to'ldirilmagan",
                    })
                }
            } else {
                notifications.error({
                    message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                    description: lang ? 'Описание не заполнено' : "Tavsif bo'sh",
                })
            }
        } else {
            notifications.error({
                message: lang ? "информация не заполнена" : "Ma'lumotlar to'ldirilmagan",
                description: lang ? 'Название здания не заполнено' : "Bino nomi bo'sh",
            })
        }
    }

    useEffect(() => {
        setInitialState({
            ...initialState,
            location_name: selectPosition?.display_name,
            latitude: parseFloat(selectPosition?.lat),
            longitude: parseFloat(selectPosition?.lon)
        })
    }, [selectPosition])
    console.log(initialState)
    return (
        <Box>
            {contextHolder}
            <div className={container.container} style={{background: '#fff', padding: "20px", borderRadius: "20px"}}>
                <AnnCreateAddPhoto arrayImages={arrayImages} setArrayImages={setArrayImages}
                    lang={lang}
                />
                <div className={styles.create_ann_line_lang}>
                    <div className={styles.create_ann_line_ru}
                         onClick={() => setLang(true)}
                         style={lang ? {background: '#fff'} : {background: "transparent"}}
                    >
                        Русский
                    </div>
                    <div className={styles.create_ann_line_uzb}
                         onClick={() => setLang(false)}
                         style={lang ? {background: 'transparent'} : {background: "#fff"}}
                    >
                        O’zbecha
                    </div>
                </div>

                <div className={styles.create_ann_line_title}>
                    <div className={styles.create_ann_line_title_left}>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Название здания" : "Bino nomi"}</p>
                            <input type="text" placeholder={lang ? 'Название дачи' : "Bino nomi"}
                                   value={initialState?.title}
                                   onChange={e => setInitialState({...initialState, title: e.target.value})}
                            />
                        </div>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Описание" : "Tavsif"}</p>
                            <textarea type="text" placeholder={lang ? 'Полное описание' : "To'liq tavsif"}
                                      value={initialState?.info}
                                      onChange={e => setInitialState({...initialState, info: e.target.value})}
                            />
                        </div>

                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Этажность" : "Qavatlar soni"}</p>
                            <input type="number" placeholder={lang ? 'Этажность' : "Qavatlar soni"}
                                   value={initialState?.floors}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       floors: parseInt(e.target.value)
                                   })}
                            />
                        </div>

                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Количество комнат" : "Xonalar soni"}</p>
                            <input type="number" placeholder={lang ? "Количество комнат" : "Xonalar soni"}
                                   value={initialState?.rooms_number}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       rooms_number: parseInt(e.target.value)
                                   })}
                            />
                        </div>

                    </div>


                    <div className={styles.create_ann_line_title_right}>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Основыне теги" : "Asosiy teglar"}</p>
                            <select
                                value={initialState?.tags}
                                onChange={e => setInitialState({...initialState, tags: e.target.value})}>
                                <option value="tag">Tag</option>
                                <option value="tag2">Tag 2</option>
                            </select>

                        </div>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Дополнительно описание" : "Qo'shimcha tavsif"}</p>
                            <textarea type="text" placeholder={lang ? "Дополнительно описание" : "Qo'shimcha tavsif"}
                                      value={initialState?.additional_info}
                                      onChange={e => setInitialState({
                                          ...initialState,
                                          additional_info: e.target.value
                                      })}
                            />
                        </div>

                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Размер дач" : "Dachalarning o'lchamlari"}</p>
                            <input type="number" placeholder={lang ? "Размер дач" : "Dachalarning o'lchamlari"}
                                   value={initialState?.area}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       area: parseInt(e.target.value)
                                   })}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.create_ann_line_work_day}>
                    <div className={styles.create_ann_line_work_day_icon}>
                        <Icons.Calendar/>
                    </div>
                    <div className={styles.create_ann_line_work_day_elements}>
                        <h1>{lang ? "Рабочие дни" : "Ish kuni"}</h1>
                        <div className={styles.create_ann_line_work_day_days}>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         mon: !initialState.working_days.mon
                                     }
                                 })}
                                 style={initialState.working_days.mon ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}
                            >
                                {lang ? "Понедельник" : "Dushanba"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         tue: !initialState.working_days.tue
                                     }
                                 })}
                                 style={initialState.working_days.tue ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}
                            >
                                {lang ? "Вторник" : "Seshanba"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         wed: !initialState.working_days.wed
                                     }
                                 })}
                                 style={initialState.working_days.wed ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}
                            >
                                {lang ? "Среда" : "Chorshanba"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         thu: !initialState.working_days.thu
                                     }
                                 })}
                                 style={initialState.working_days.thu ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}
                            >
                                {lang ? "Четверг" : "Payshanba"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         fr: !initialState.working_days.fr
                                     }
                                 })}
                                 style={initialState.working_days.fr ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}

                            >
                                {lang ? "Пятница" : "Juma"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         sat: !initialState.working_days.sat
                                     }
                                 })}
                                 style={initialState.working_days.sat ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}

                            >
                                {lang ? "Суббота" : "Shanba"}
                            </div>
                            <div className={styles.create_ann_line_work_day_days_item}
                                 onClick={(e) => setInitialState({
                                     ...initialState,
                                     working_days: {
                                         ...initialState.working_days,
                                         sun: !initialState.working_days.sun
                                     }
                                 })}
                                 style={initialState.working_days.sun ? {
                                     background: "#15CC69",
                                     color: "#fff"
                                 } : {background: "#F7F8F9"}}
                            >
                                {lang ? "Воскресенье" : "Yakshanba"}
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className={styles.create_ann_subTitle}>{lang ? "Параменты заселения" : "Joylashtirish nastroykasi"}</h1>

                <div className={styles.create_ann_line_price_periud}>
                    <div className={styles.create_ann_line_title_left}>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Стоимость за одну ночь" : "Bir kecha uchun narx"}</p>
                            <input type="text" placeholder={lang ? 'К примеру 300.000' : "Masalan, 300 000"}
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
                            <p>{lang ? "Минимальный срок бронирования" : "Minimal bron qilish muddati"}</p>
                            <input type="number" placeholder={lang ? 'К примеру 3 дня' : "Masalan, 3 kun"}
                                   value={initialState?.minimum_book_days}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       minimum_book_days: parseInt(e.target.value)
                                   })}
                            />
                        </div>
                    </div>
                    <div className={styles.create_ann_line_title_right}>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Валюта" : "Valyuta"}</p>
                            <select value={initialState?.price_type}
                                    onChange={e => setInitialState({...initialState, price_type: e.target.value})}>
                                <option value="uzs">Uzs</option>
                                <option value="usd">Usd</option>
                            </select>

                        </div>
                        <div className={styles.create_ann_input}>
                            <p>{lang ? "Максимальный срок предварительного бронирования" : "Oldindan bron qilishning maksimal muddati"}</p>
                            <input type="number" placeholder={lang ? 'К примеру 10 дней' : "Masalan, 10 kun"}
                                   value={initialState?.minimum_preorder_days}
                                   onChange={e => setInitialState({
                                       ...initialState,
                                       minimum_preorder_days: parseInt(e.target.value)
                                   })}
                            />
                        </div>
                    </div>
                </div>


                <h1 className={styles.create_ann_subTitle}>{lang ? "Список удобств" : "Imkoniyatlar ro'yxati"}</h1>

                <Modal>
                    <Modal.Open opens="list_Comfort">
                        <div className={styles.create_ann_list_comfort_btn}>
                            <p>{lang ? "Добавить" : "Qo'shish"}</p>
                        </div>
                    </Modal.Open>
                    <Modal.Window name="list_Comfort" title={lang ? "Список удобства" : "Imkoniyatlar ro'yxati"}>
                        <div className={styles.create_ann_list_comfort}>
                            <div className={styles.create_ann_list_comfort_checkbox}>
                                <FormControlLabel control={
                                    <Checkbox
                                        sx={{
                                            '& .MuiSvgIcon-root': {fontSize: 30}, border: 'none', color: 'none',
                                            '&.Mui-checked': {
                                                color: '#006FFD',
                                            },
                                        }}
                                    />
                                } label="WI-FI"/>
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

                            <button>{lang ? "Сохранить" :"Saqlash"}</button>
                        </div>
                    </Modal.Window>
                </Modal>

                <div className={styles.create_ann_line_adults}>
                    <div className={styles.create_ann_line_adults_left}>
                        <h1>{lang ? "Возможность заселения с детьми" : "Bolalar bilan yashash imkoniyati"}</h1>
                        <Switch
                            style={initialState?.children_allowed ? {background: "#15CC69"} : {background: "#EEEFF5"}}
                            onChange={() => setInitialState({
                                ...initialState,
                                children_allowed: !initialState.children_allowed
                            })}
                        />
                    </div>
                    <div className={styles.create_ann_line_adults_right}>
                        <h1>{lang ? "Возможность продления срока" : "Bron vaqtini cho'zish imkonyati"}</h1>
                        <Switch
                            style={initialState?.extension_allowed ? {background: "#15CC69"} : {background: "#EEEFF5"}}
                            onChange={() => setInitialState({
                                ...initialState,
                                extension_allowed: !initialState.extension_allowed
                            })}/>
                    </div>
                </div>

                <div className={styles.create_ann_contact}>
                    <div className={`${styles.create_ann_input} ${styles.activeTel}`}>
                        <input
                            type="text"
                            placeholder={lang ? "Введите номер телефона" : "Telefon raqamingizni kiriting"}
                            value={initialState?.contacts}
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
                                setInitialState({...initialState, contacts: formattedNumber});
                            }}
                        />

                    </div>
                </div>
            </div>
            <div className={container.container}>
                <h1 className={styles.create_ann_subTitle}>{lang ? "На карте" : "Xaritada"}</h1>
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
                        <div className={styles.create_ann_save_line_item_delete}
                             onClick={() => {
                                 window.location.assign(CABINET + SELLER_DASHBOARD)
                             }}
                        >
                            <Icons.DeleteImgIcon/>
                        </div>
                        <div className={styles.create_ann_save_line_item_save}
                             onClick={handleSend}
                        >{lang ? "Сохранить" : "Saqlash"}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </Box>
    );
};

export default CreateAnnouncement;
