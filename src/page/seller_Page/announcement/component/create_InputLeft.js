import React, {useEffect, useRef, useState, memo} from 'react';
import {Button, Input, message, Select, Upload} from "antd";
import "../assets/create_ann.css"
import '@splidejs/react-splide/css';
import TextArea from "antd/es/input/TextArea";
import Header_adminPage from "../../../../components/header_adminPage";
import MapsAnnouncement from "./mapsAnnouncement";


const CreateInputLeft = (props) => {
    const {inputLeft, setInputLeft} = props;
    const [selectPosition, setSelectPosition] = useState(null);
    const { Option } = Select;
    useEffect(() => {
        setInputLeft({
            ...inputLeft,
            display_name: selectPosition?.display_name,
            latitude: parseFloat(selectPosition?.lat),
            longitude:parseFloat(selectPosition?.lon),
            type:'UZS'
        })
    }, [selectPosition])

    const priceType=(val)=>{
        setInputLeft({...inputLeft, type:val})
    }

    const selectAfter = (
        <Select defaultValue="UZS" onChange={priceType}>
            <Option value="UZS">UZS</Option>
            <Option value="Y.E">Y.E</Option>
        </Select>
    );
    return (
        <div className="calendar-input">

            <div className="input">
                <label htmlFor="name">Укажите название*</label>
                <Input placeholder={"example: dacha , basen , zimniy basen"} size={"large"}
                       onChange={(e) => setInputLeft({...inputLeft, title: e.target.value})}/>
            </div>
            <div className="input">
                <label htmlFor="name">Описание*</label>
                <TextArea
                    value={inputLeft?.info}
                    onChange={(e) => setInputLeft({...inputLeft, info: e.target.value})}
                    placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание"
                    autoSize={{
                        minRows: 3,
                        maxRows: 5,
                    }}
                />
            </div>
            <div className="input">
                <label htmlFor="price">цена*</label>
                <Input addonAfter={selectAfter} defaultValue="UZS"
                       type={'number'}
                       onChange={(e) => setInputLeft({...inputLeft, price: e.target.value})}
                />

            </div>
            <div className="input">
                <MapsAnnouncement setSelectPosition={setSelectPosition} selectPosition={selectPosition}/>
            </div>
        </div>
    );
};

export default memo(CreateInputLeft);
