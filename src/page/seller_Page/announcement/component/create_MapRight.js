import React, {useState, useEffect, memo, useMemo, useCallback} from 'react';
import L from 'leaflet';
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { message} from "antd";

const customMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationMarker = ({locName}) => {
    const [position, setPosition] = useState(null);
    const [locationName, setLocationName] = useState("");
    useMemo(()=>{
        locName(locationName,position)
    },[locationName, position])
    const map = useMap();
    useEffect(() => {
        map.locate();
        map.on('locationfound', handleLocationFound);
        map.on('locationerror', handleLocationError);

        return () => {
            map.off('locationfound', handleLocationFound);
            map.off('locationerror', handleLocationError);
            map.stopLocate();
        };
    }, [map]);

    const handleLocationFound = (e) => {
        const userLocation = e.latlng;
        setPosition(userLocation);
        map.flyTo(userLocation, map.getZoom());
        localStorage.setItem('latlng',userLocation)
        fetchLocationName(userLocation.lat, userLocation.lng);
    };

    const handleLocationError = (err) => {
        console.error(err);
    };

    const handleMarkerDrag = (e) => {
        const newLocation = e.target.getLatLng();
        setPosition(newLocation);
        localStorage.setItem('latlng',newLocation)
        fetchLocationName(newLocation.lat, newLocation.lng);
    };

    const fetchLocationName = async (lat, lng) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
            const data = await response.json();
            const name = data.display_name;
            localStorage.setItem('location', name)
            setLocationName(name);
        } catch (error) {
            console.error("Error fetching location name:", error);
            message.error('err')
        }
    };

    const handleMapClick = (e) => {
        const clickedLocation = e.latlng;
        setPosition(clickedLocation);
        fetchLocationName(clickedLocation.lat, clickedLocation.lng);
    };

    const handleMarkerPlacement = () => {

        console.log("User placed the marker at:", position);
    };

    return (
        <>
            {position && (
                <Marker position={position} icon={customMarkerIcon} draggable={true}
                        eventHandlers={{dragend: handleMarkerDrag}}>
                    <Popup>
                        <p style={{fontSize: "10px"}}>{locationName}</p>

                    </Popup>
                </Marker>
            )}
            <div onClick={handleMapClick} onMouseUp={handleMarkerPlacement} style={{cursor: 'pointer'}}></div>
        </>
    );

};


export default memo(LocationMarker)