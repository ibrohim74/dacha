import React, {useEffect, useState} from 'react';
import {Button, Input, message} from "antd";
import style from "../placeAdmin.module.css";
import TextArea from "antd/es/input/TextArea";
import {jwtDecode} from "jwt-decode";
import {CreatePlace} from "../API/placeAdminAPI";

const CreatePlaceContent = (props) => {
    const JWT = jwtDecode(localStorage.getItem('token'))
    const [initialState, setInitialState] = useState({
        title: "",
        info: "",
        latitude: 0,
        longitude: 0,
        address: "",
        type: "string",
        tags: ['test'],
        creator_id: JWT.userId
    })
    useEffect(() => {
        setInitialState({
            ...initialState,
            latitude: parseFloat(props.selectPosition?.lat),
            longitude: parseFloat(props.selectPosition?.lon),
            address: props.selectPosition?.display_name
        })
    }, [props.selectPosition])

    const sendData = ()=>{
        if (initialState.info && initialState.title){
            CreatePlace(initialState).then(r => {
                if (r?.status === 200){
                    message.success('created')
                    setTimeout(()=>{window.location.reload()},3000)
                }
            })
        }
    }
    return (
        <div>
            <>
                <Input type="text"
                       className={style.searchText}
                       value={props.searchText} onChange={(e) => props.setSearchText(e.target.value)}/>


                {props.listPlace && props.searchText ? props.listPlace.map((item) => {
                    return (

                        <div className={style.listItem}
                             onClick={() => {
                                 props.setSelectPosition(item);
                                 props.setSearchText('');
                             }}>
                            {item.display_name}
                        </div>

                    )
                }) : !props.selectPosition?.display_name && 'no data'}

                {props.selectPosition && (
                    <div className={style.cardPosition}>

                        <Input placeholder={'title'}

                               onChange={e => setInitialState({...initialState, title: e.target.value})}/>

                        <TextArea
                            style={{
                                marginTop:'10px'
                            }}
                            value={initialState?.info}
                            onChange={(e) => setInitialState({...initialState, info: e.target.value})}
                            placeholder="info"
                            autoSize={{
                                minRows: 3,
                                maxRows: 5,
                            }}
                        />

                        <Button type={"primary"} onClick={sendData}
                                style={{
                                    marginTop:'10px'
                                }}>Send</Button>
                    </div>
                )}
            </>
        </div>
    );
};

export default CreatePlaceContent;