import React, {useEffect, useState} from 'react';
import {Button, message, Modal} from "antd";
import {GetUserById} from "../../page/seller_Page/announcement/API/announcementAPI";
import {GetUserByJWT, SendReview} from "./API/reviewAPI";
import TextArea from "antd/es/input/TextArea";
import style from './assets/review.module.css'
import {Icons} from "../../assets/icons/icons";

const LeaveReviews = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialState, setInitialState] = useState({
        accommodation_type: props.dacha.type,
        accommodation_id: props.dacha.id
    })
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

    console.log(props)
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleSend = () => {
        if (initialState.body){
            SendReview(initialState).then(r => {
                if (r.status === 200){
                    message.success('jonatildi')
                    setIsModalOpen(false)
                }
            })
        }
    }

    useEffect(() => {
        GetUserByJWT().then(r => {
            setInitialState({...initialState, reviewer_id: r.id, title: `${r?.firstName} ${r?.lastName}`})
        })
    }, [])

    return (
        <div style={props?.style}>
            <Button type="primary" onClick={showModal}>
                оставить отзыв
            </Button>
            <Button type={'dashed'} onClick={showModal} style={{marginTop:"20px" }}>
                мои отзывы
            </Button>
            <Modal title={`оставить отзыв " ${props?.dacha?.title} "`} open={isModalOpen} onCancel={handleCancel}>
                <TextArea
                    placeholder={`Напишите свои впечатления `}
                    style={{width: "100%"}}
                    value={initialState?.info}
                    onChange={(e) => setInitialState({...initialState, body: e.target.value})}
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
                <div>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                                <input

                                    type="radio"
                                    name="rating"
                                    value={currentRating}
                                    onChange={() => setInitialState({...initialState, rating: currentRating})}
                                />
                                <span
                                    className="star"

                                    onClick={() => setInitialState({...initialState, rating: currentRating})}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(null)}
                                >
        <svg style={{marginTop: "15px"}} width="25" height="25" viewBox="0 0 16 16"
             fill={currentRating <= (initialState.rating) ? "#ffc107" : "#e4e5e9"} xmlns="http://www.w3.org/2000/svg">
<path
    d="M12.1199 14L11.0299 9.31401L14.6666 6.16268L9.87259 5.75134L7.99992 1.33334L6.12725 5.75134L1.33325 6.16268L4.96992 9.31401L3.87992 14L7.99992 11.5147L12.1199 14Z"/>
</svg>

    </span>
                            </label>


                        );
                    })}
                </div>


                <Button onClick={handleSend}>
                    send
                </Button>
            </Modal>
        </div>
    );
};

export default LeaveReviews;