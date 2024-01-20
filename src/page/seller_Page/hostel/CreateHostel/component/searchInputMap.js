import React, {useEffect, useState} from "react";

import {Button, Divider, Input} from "antd";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import axios from "axios";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

export default function SearchInputMap(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    const [clicked , setClicked] = useState(false)
    const search = async ()=>{
        const params = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params).toString();
        try {

            const res = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`)
            setListPlace(res.data)
        }catch (e){
            console.log(e)}
    }
useEffect(()=>{
    search()
    if (clicked){
        setClicked(false)
    }
},[searchText])
    console.log(props)
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <Input
                        style={{ width: "100%" }}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                        placeholder={props?.placeholder}
                    />
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
                >

                </div>
            </div>
            <div>
                  <List component="nav" aria-label="main mailbox folders">
                    {listPlace.map((item) => {
                        return (
                            <div key={item?.place_id} >
                                <ListItem
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                        setClicked(true)
                                    }}
                                >
                                    <ListItemIcon>
                                        <img
                                            src={require("../../../../../assets/ava.png")}
                                            alt="Placeholder"
                                            style={{ width: 38, height: 38 }}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>

            </div>
        </div>
    );
}