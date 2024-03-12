import React, {useEffect, useState} from 'react';
import {Button, Modal} from "antd";
import {GetReviewByDachaId} from "./API/reviewAPI";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination  , Navigation} from 'swiper/modules';
import styles from './assets/review.module.css'
import './assets/review.css'

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import Score from "../score/score";
const Review = (props) => {
    const [reviews , setReviews] = useState([])
    useEffect(()=>{
        if (props.dachaId){
            GetReviewByDachaId(parseInt(props.dachaId)).then(r => {
                if (r.status === 200){
                    setReviews(r.data)
                }
            })
        }
    },[props.dachaId])
    return (
        <div style={props.style}>
            <Swiper
                direction={"horizontal"}
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                Mousewheel={true}
                pagination={{
                    type: 'fraction',
                }}
                modules={[Pagination, Navigation]}
            >

                {reviews ? reviews.map((item)=>{
                    return (
                            <SwiperSlide >
                                <p>{item.title}</p>

                                <div className="review_body">
                                    {item.body}
                                </div>
                                <div className="review_footer">
                                    <Score score={item.rating}/>
                                </div>
                            </SwiperSlide>
                    )
                })  : 'нет никакого отзыва'}
            </Swiper>
        </div>
    );
};

export default Review;