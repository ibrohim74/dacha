import React, { useEffect, useState } from 'react';
import styles from "../../../seller_Page/announcement/assets/request.module.css";
import { Icons } from "../../../../assets/icons/icons";
import { GetUserRequest } from "../api/user_requestAPI";
import Review from "../../../../components/review/review";

const RequestUser = (props) => {
    const [requests, setRequests] = useState([]);
    const { setDachasIdList } = props;

    useEffect(() => {
        GetUserRequest()
            .then(response => {
                console.log(response)
                if (response.status === 200) {
                    const data = response.data || [];
                    setRequests(data);
                    setDachasIdList(data.map(item => item.accommodation_id));
                } else {
                    console.error("getUserRequest error:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching user requests:", error);
            });
    }, [setDachasIdList]);

    const uniqueRequests = requests.filter((value, index, self) =>
        self.findIndex(item => item.request_id === value.request_id) === index
    );

    return (
        <div>
            {requests.length > 0 ? uniqueRequests.map((item, index) => {
                const itemDacha = props.dachasList.find(dacha => dacha.id === item.accommodation_id);
                if (itemDacha) {
                    const currentPhotoUrl = props.dachaImg[index]?.[0] || "";
                    return (
                        <div key={index} className={styles.requestItem}>
                            <div className={styles.req_start}>
                                <div className={styles.imgReq} style={{ width: "100%" }}>
                                    {currentPhotoUrl ? (
                                        <img
                                            key={currentPhotoUrl}
                                            src={"https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api" + currentPhotoUrl}
                                            alt="Dacha"
                                            width="100%"
                                            height="100%"
                                            className={styles.itemImg}
                                        />
                                    ) : (
                                        <Icons.ImgPlcHolder
                                            width="100%"
                                            height="100%"
                                            className={styles.itemImg}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className={styles.req_center}>
                                <div className={styles.req_centerText}>
                                    <h1>{itemDacha.title}</h1>
                                    <p>From {props.formData(item.start_day)} - To {props.formData(item.end_day)}</p>
                                </div>
                            </div>
                            <div className={styles.reqFooter}>
                                Request not yet accepted
                            </div>
                        </div>
                    );
                }
                return null; // Return null if itemDacha is not found
            }) : 'нет информации'}
        </div>
    );
};

export default RequestUser;
