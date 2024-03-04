import React, {useEffect, useState, useRef} from 'react';
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import axios from "axios";
import L from "leaflet";
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ReactDOMServer from 'react-dom/server';
import {DeletePlaceAPI, GetAllPlaces, UpdatePlace} from "../API/placeAdminAPI";
import {Button, Input, message} from "antd";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const customCreateMarkerIcon = new L.Icon({
    iconUrl: require("../../../../assets/marker-32.png"),
    iconSize: [30, 30],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});
const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});


const MapPlaceAdmin = (props) => {
    const {selectPosition, setSelectPosition} = props;
    const [clicked, setClicked] = useState(false);
    const [allPlace , setAllPlace] = useState([])
    const mapRef = useRef(null);
    const [popupRef, setPopupRef] = useState(null);
    const [refReady, setRefReady] = useState(false);


    const search = async () => {
        const params = {
            q: props.searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 0,
        };
        const queryString = new URLSearchParams(params).toString();
        try {
            const res = await axios.get(`${NOMINATIM_BASE_URL}${queryString}`);
            props.setListPlace(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const fetchLocationName = async (lat, lng) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
            );
            const data = await response.json();
            const name = data.display_name;
            return name;
        } catch (error) {
            console.error("Error fetching location name:", error);
            alert('error: ' + error)
        }
    };

    const handleMarkerDragPlace = (e, item) => {
        const newLocation = e.target.getLatLng();
        fetchLocationName(newLocation.lat, newLocation.lng).then((r) => {
            UpdatePlace({address: r, latitude: newLocation.lat, longitude: newLocation.lng}, item.id).then(r =>{
                if (r?.status === 200 ){
                    message.success("updated")
                    window.location.reload()
                }
            }).catch(e=>{message.error(e)});
        });
    };

    const handleMarkerDrag = (e) => {
        const newLocation = e.target.getLatLng();
        fetchLocationName(newLocation.lat, newLocation.lng).then((r) => {
            setSelectPosition({
                ...selectPosition,
                display_name: r,
                lat: newLocation.lat,
                lon: newLocation.lng,
            });
        });
    };

    const deletePlace = (item)=>{
        DeletePlaceAPI(item).then(r=>{
            if (r?.status === 200){
                message.success('deleted')
                window.location.reload()
            }
        }).catch(e=>{message.error(e)})
    }


    useEffect(() => {
        search();
        if (clicked) {
            setClicked(false);
        }
        GetAllPlaces().then(r => {
            if (r?.status === 200){
                setAllPlace(r.data)
            }
        })
    }, [props.searchText, selectPosition, clicked]);


        useEffect(() => {
        const map = mapRef.current;
        if (refReady && popupRef && props.selectPlace) { // props.selectPlace mavjud bo'lsa Popup ochiladi
            popupRef.openPopup();
        }
        if (map && selectPosition && selectPosition?.lat && selectPosition?.lon) {
            map.flyTo([selectPosition.lat, selectPosition.lon], map.getZoom());
        } else if (map && props.selectPlace?.latitude && props.selectPlace?.longitude) {
            map.flyTo([props.selectPlace.latitude, props.selectPlace.longitude], map.getZoom());
        }
    }, [selectPosition, props.selectPlace]);

    return (
        <MapContainer
            ref={mapRef}
            zoom={props.zoom ? props.zoom : 9}
            center={props.selectPlace ? [props.selectPlace?.latitude, props.selectPlace?.longitude] :
                selectPosition ? [selectPosition.lat, selectPosition.lon] : props.lat_long }
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden"
            }}
        >
            <TileLayer
                attribution="by khasanov_ibroxim"
                url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}"/>

            {selectPosition && selectPosition.lat && selectPosition.lon && (
                <Marker
                    position={[selectPosition.lat, selectPosition.lon]}
                    icon={customCreateMarkerIcon}
                    draggable={true}
                    eventHandlers={{dragend: handleMarkerDrag}}
                />
            )}
            {
                allPlace && allPlace.map((item) => {
                    return (
                        <Marker
                            key={item.id}
                            position={[item?.latitude, item?.longitude]}
                            icon={customMarkerIcon}
                            draggable={true}
                            eventHandlers={{dragend:(e)=> handleMarkerDragPlace(e , item)}}
                        >
                                <Popup style={{width:'300px' , height:'500px'}}>
                                    <div >
                                        <p style={{fontSize:'14px'}}>Title: {item.title}</p>
                                        <p style={{fontSize:'14px'}}>Address: {item.address}</p>
                                    </div>
                                    <div>
                                        <Button onClick={()=>deletePlace(item)}> Delete</Button>
                                    </div>
                                </Popup>
                        </Marker>
                    );
                })
            }
        </MapContainer>
    );
};

export default MapPlaceAdmin;
