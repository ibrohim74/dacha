import React, { useEffect, useState } from 'react';
import { Button, Input, message, Modal } from "antd";
import {GetUserByJWT, GetReviewByUserId, SendReview, ReviewUpdate} from "./API/reviewAPI";
import TextArea from "antd/es/input/TextArea";
import './assets/review.css';

const LeaveReviews = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMayModalOpen, setIsMayModalOpen] = useState(false);
    const [editBtn, setEditBtn] = useState(false);
    const [editData, setEditData] = useState({});
    const [initialState, setInitialState] = useState({
        accommodation_type: props.dacha.type,
        accommodation_id: props.dacha.id,
        reviewer_id: null, // reviewer_id ni qo'shdim
        title: "",
        body: "",
        rating: 0
    });
    const [userReviews, setUserReviews] = useState([]);
    const [totalStars] = useState(5);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const myModal = () => {
        setIsMayModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleMayModalCancel = () => {
        setIsMayModalOpen(false);
    };

    const handleSend = () => {
        if (initialState.body) {
            SendReview(initialState).then(r => {
                if (r.status === 200) {
                    message.success('jonatildi');
                    setIsModalOpen(false);
                }
            });
        }
    };
    const updateReview = ()=>{
        if (editData){
            ReviewUpdate(editData).then(r=>{
                if (r?.status === 200){
                    message.success('updated')
                }
            }).catch(err=> message.error(err))
        }
    }

    useEffect(() => {
        GetUserByJWT().then(r => {
            setInitialState(prevState => ({ ...prevState, reviewer_id: r.id }));
        });
        GetReviewByUserId().then(r => {
            if (r.status === 200) {
                setUserReviews(r.data);
            }
        });
    }, []);

    const filter = userReviews.filter(e => e.accommodation_id === props.dacha.id);
    console.log(editData )
    return (
        <div style={props?.style}>
            <Button type="primary" onClick={showModal}>
                оставить отзыв
            </Button>

            <Button type="dashed" onClick={myModal} style={{ marginTop: "20px" }}>
                мои отзывы
            </Button>
            <Modal title={`оставить отзыв "${props?.dacha?.title}"`} visible={isModalOpen} onCancel={handleCancel} >
                {filter && (<>
                    <Input placeholder="title" onChange={(e) => setInitialState(prevState => ({ ...prevState, title: e.target.value }))} />
                    <TextArea
                        placeholder="Напишите свои впечатления"
                        style={{ width: "100%" }}
                        value={initialState?.body}
                        onChange={(e) => setInitialState(prevState => ({ ...prevState, body: e.target.value }))}
                        autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                    <div>
                        {[...Array(totalStars)].map((_, index) => {
                            const currentRating = index + 1;
                            return (
                                <label key={index}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={currentRating}
                                        onChange={() => setInitialState(prevState => ({ ...prevState, rating: currentRating }))}
                                    />
                                    <span
                                        className="star"
                                        onClick={() => setInitialState(prevState => ({ ...prevState, rating: currentRating }))}
                                    >
                                    <svg style={{ marginTop: "15px" }} width="25" height="25" viewBox="0 0 16 16"
                                         fill={currentRating <= initialState.rating ? "#ffc107" : "#e4e5e9"} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.1199 14L11.0299 9.31401L14.6666 6.16268L9.87259 5.75134L7.99992 1.33334L6.12725 5.75134L1.33325 6.16268L4.96992 9.31401L3.87992 14L7.99992 11.5147L12.1199 14Z" />
                                    </svg>
                                </span>
                                </label>
                            );
                        })}
                    </div>

                    <Button type={"primary"} onClick={handleSend}>Send</Button>
                </>)}
            </Modal>

            <Modal title={`мои отзывы "${props?.dacha?.title}"`} visible={isMayModalOpen} onCancel={handleMayModalCancel}>
                {filter && filter.map((item, index) => {
                    const num = index + 1;
                    return (
                        <div className="leaveReview_item" key={index}>
                            <div className="leaveReview_Content">
                                <p>{num}</p>
                                <p className="review_body" style={{ marginTop: 0, marginLeft: '15px' }}>{item.title}</p>
                                <Button type="primary" onClick={() => {
                                    setEditBtn(prev => !prev);
                                    setEditData(prev => !prev ? {} : item);
                                }}>edit</Button>
                            </div>
                            {editBtn && item.id === editData.id && <div className="review_editContent">
                                <Input value={editData?.title} style={{ margin: '15px 0' }} onChange={(e) => setEditData(prevState => ({ ...prevState, title: e.target.value }))} />
                                <TextArea
                                    placeholder="Напишите свои впечатления"
                                    style={{ width: "100%" }}
                                    value={editData?.body}
                                    onChange={(e) => setEditData(prevState => ({ ...prevState, body: e.target.value }))}
                                    autoSize={{ minRows: 3, maxRows: 5 }}
                                />
                                <div>
                                    {[...Array(totalStars)].map((_, StarIndex) => {
                                        const currentRating = StarIndex + 1;
                                        return (
                                            <label key={StarIndex}>
                                                <input
                                                    type="radio"
                                                    name={`rating-${index}`} // Har bir tahrir qilingan sharh reytingi uchun mos ravishda foydalanuvchi nomi
                                                    value={currentRating}
                                                    onChange={() => setEditData(prevState => ({ ...prevState, rating: currentRating }))}
                                                    checked={currentRating === editData.rating}
                                                />
                                                <span
                                                    className="star"
                                                    onClick={() => setEditData(prevState => ({ ...prevState, rating: currentRating }))}
                                                >
                                        <svg style={{ marginTop: "15px" }} width="25" height="25" viewBox="0 0 16 16" fill={currentRating <= editData.rating ? "#ffc107" : "#e4e5e9"} xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.1199 14L11.0299 9.31401L14.6666 6.16268L9.87259 5.75134L7.99992 1.33334L6.12725 5.75134L1.33325 6.16268L4.96992 9.31401L3.87992 14L7.99992 11.5147L12.1199 14Z" />
                                        </svg>
                                    </span>
                                            </label>
                                        );
                                    })}
                                    <Button type={"primary"} style={{position:'absolute' , right:'30px' , marginTop:'10px'}}
                                    onClick={updateReview}
                                    > Update</Button>
                                </div>
                            </div>}
                        </div>
                    );
                })}
            </Modal>
        </div>
    );
};

export default LeaveReviews;
