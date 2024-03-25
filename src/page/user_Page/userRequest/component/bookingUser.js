import React, { useEffect, useState } from 'react';
import styles from "../../../seller_Page/announcement/assets/request.module.css";
import { Icons } from "../../../../assets/icons/icons";
import {GetUserBooking, GetUserRequest} from "../api/user_requestAPI";
import Review from "../../../../components/review/review";
import LeaveReviews from "../../../../components/review/leaveReviews";

const BookingUser = (props) => {
    const [booking, setBooking] = useState([]);
    const { dachasIdList, setDachasIdList } = props;
    useEffect(() => {
        GetUserBooking().then(r => {
            console.log(r)
            if (r.status === 200) {
                setBooking(r?.data);
                setDachasIdList(r?.data?.map((item) => item.accommodation_id));
            } else {
                console.error("getUserRequest:", r.data);
            }
        }).catch(error => {
            console.error("Error fetching user requests:", error);
        })


    }, [props.dachasList.length]);

    const uniqueBooking = Object.values(booking.reduce((acc, cur) => {
        acc[cur.booking_id] = cur;
        return acc;
    }, {}));
    return (
        <div>
            {booking.length > 0 ? uniqueBooking?.map((item, index) => {
                    const itemDacha = props.dachasList.find(dacha => dacha.id === item.accommodation_id);
                    if (itemDacha) {
                        const currentPhotoUrls = props.dachaImg[index]?.[0] || "";
                        return (
                            <div key={index} className={styles['requestItem']}>
                                <div className={styles.req_start}>
                                    <div className={styles.imgReq} style={{ width: "100%" }}>
                                        {currentPhotoUrls.length > 0 ? (
                                                <img key={currentPhotoUrls.length}
                                                     src={"https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api" + currentPhotoUrls}
                                                     alt="Dacha"
                                                     width={"100%"}
                                                     height={"100%"}
                                                     className={styles["item-img"]}
                                                />
                                            ) :
                                            <Icons.ImgPlcHolder
                                                width={"100%"}
                                                height={"100%"}
                                                className={styles["item-img"]}
                                            />
                                        }
                                    </div>
                                    <div className={styles.req_start__text}>
                                    </div>
                                </div>
                                <div className={styles.req_center}>
                                    <div className={styles.req_center__text}>
                                        <h1>{itemDacha.title}</h1>
                                        <p>С {props.formData(item?.start_day)} -
                                            до {props.formData(item?.end_day)} </p>
                                    </div>
                                </div>
                                <div className={styles.req_footer}>
                                    <LeaveReviews dacha={itemDacha} />
                                    запрос принять
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                }) : 'нет информации'
            }

        </div>
    );
};

export default BookingUser;
