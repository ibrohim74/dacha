import React, {useEffect, useState} from 'react';
import {GetAllPlaces} from "../API/placeAdminAPI";
import style from '../placeAdmin.module.css'


const ContentPlace = (props) => {
    const [data, setData] = useState([])
    const {selectPlace, setSelectPlace} = props

    const handleClickItem = (item) => {
        setSelectPlace(item)
    }
    useEffect(() => {
        GetAllPlaces().then(r => {
            if (r?.status === 200) {
                setData(r.data)
            }
        })
    }, [])

    return (
        <div className={style.contentPlace}>
            {data && data.map((item) => {
                return (<div key={item.id}
                             className={style.contentPlaceItem}
                             onClick={() => handleClickItem(item)}>

                    <p>title: {item?.title}</p>
                   <p>address: {item?.address}</p>
                </div>)
            })}
        </div>
    );
};

export default ContentPlace;