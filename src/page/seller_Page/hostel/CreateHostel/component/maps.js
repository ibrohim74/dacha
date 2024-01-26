import React, {useEffect, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvent, ZoomControl} from "react-leaflet";
import axios from "axios";
import {Divider, Input, message} from "antd";
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import L from "leaflet";



const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});


const Maps = () => {
    const [selectPosition, setSelectPosition] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);
    const [clicked , setClicked] = useState(false)
    const [markerPos , setMarkerPos] = useState([])
    const [mapPos , setMapPos] = useState({lat: 41.311081, lng: 69.240562})
    const map = useMap();
    console.log(selectPosition)
    const search = async ()=>{
        const params = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params).toString();
        try {
            const res = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`);
            setListPlace(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
            // Handle error, e.g., set an error state or show an error message.
        }

    }

    const fetchLocationName = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            const name = data.display_name;
            return name
        } catch (error) {
            console.error("Error fetching location name:", error);
            message.error('err')
        }
    };
    const handleMarkerDrag = (e) => {
        const newLocation = e.target.getLatLng();
        fetchLocationName(newLocation.lat, newLocation.lng).then(r =>{
            setSelectPosition({...selectPosition,display_name:r , lat: newLocation.lat, lon: newLocation.lng })
        })
    };
    useEffect(() => {
        search();

        if (clicked) {
            setClicked(false);
        }
        map.flyTo(selectPosition?.lat, selectPosition?.lon, map.getZoom())
    }, [searchText, selectPosition, clicked, map]);


    console.log(mapPos)
    return (
        <>
            <MapContainer
                zoom={8}
                center={{lat: 41.311081, lng: 69.240562}}
                style={{ width: '100%', height: '200px', overflow: 'hidden', borderRadius: '20px' }}
            >
                <TileLayer
                    attribution="Dacha.uz"
                    url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
                />
                <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />
                {selectPosition !== null && (
                    <Marker
                        position={[selectPosition.lat, selectPosition.lon]}
                        icon={customMarkerIcon}
                        draggable={true}
                        eventHandlers={{ dragend: handleMarkerDrag }}
                    />
                )}

            </MapContainer>

            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex" }}>
                    <div style={{ flex: 1 }}>
                        <Input
                            style={{ width: "100%" }}
                            value={searchText}
                            onChange={(event) => {
                                setSearchText(event.target.value);
                            }}
                            // placeholder={props?.placeholder}
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
                                            setClicked((prevClicked) => !prevClicked);
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

        </>
    );
};

export default Maps;