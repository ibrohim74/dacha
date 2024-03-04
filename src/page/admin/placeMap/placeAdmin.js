import React, {useState} from 'react';
import style from './placeAdmin.module.css'
import {Input} from "antd";
import MapPlaceAdmin from "./component/mapPlaceAdmin";
import CreatePlaceContent from "./component/createPlaceContent";
import ContentPlace from "./component/contentPlace";

const PlaceAdmin = () => {
    const [createBtn, setCreateBtn] = useState(false)
    const [placeBtn, setPlaceBtn] = useState(true)
    const [selectPosition, setSelectPosition] = useState(null);
    const [searchText, setSearchText] = useState('')
    const [listPlace, setListPlace] = useState([])
    const [selectPlace , setSelectPlace] = useState()
    return (
        <div className={style.placeContainer}>
            <div className={style.placeContent}>
                <div className={style.placeSidebar}>
                    <h1 style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>Location</h1>
                    <div className="adminMapBtn">
                        <button onClick={() => {
                            setCreateBtn(false)
                            setPlaceBtn(true)
                        } }>Place</button>

                        <button onClick={() => {
                            setCreateBtn(true)
                            setPlaceBtn(false)
                        }}>Create</button>

                    </div>

                    <div className={style.createPlaceContent}>
                        {createBtn && <CreatePlaceContent
                            selectPosition={selectPosition}
                            setSelectPosition={setSelectPosition}
                            searchText={searchText}
                            listPlace={listPlace}
                            setListPlace={setListPlace}
                            setSearchText={setSearchText}
                            style={style}
                        />}

                        {placeBtn && <ContentPlace selectPlace={selectPlace} setSelectPlace={setSelectPlace}/>       }
                    </div>
                </div>
                <div className={style.placeMap}>
                    <MapPlaceAdmin
                        selectPlace={selectPlace}
                        selectPosition={selectPosition}
                        setSelectPosition={setSelectPosition}
                        searchText={searchText}
                        listPlace={listPlace}
                        setListPlace={setListPlace}
                        zoom={9}
                        lat_long={[41.34557, 69.284599]}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlaceAdmin;