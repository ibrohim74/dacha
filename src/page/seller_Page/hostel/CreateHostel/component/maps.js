import React, { useEffect } from "react";
import {Circle, MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import L from "leaflet";

const icon = L.icon({
    iconUrl: "./placeholder.png",
    iconSize: [38, 38],
});

const position = [41.311081, 69.240562];

function ResetCenterView(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
        if (selectPosition) {
            map.setView(
                L.latLng(selectPosition?.lat, selectPosition?.lon),
                map.getZoom(),
                {
                    animate: true
                }
            )
        }
    }, [selectPosition]);

    return null;
}

export default function Maps(props) {
    const { selectPosition } = props;
    const locationSelection = [selectPosition?.lat, selectPosition?.lon];

    const fillBlueOptions = { fillColor: 'blue' }
    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{width: '100%', height: '200px', overflow: 'hidden', borderRadius: '20px'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=ZCr6pxY0KImdWbol6HC0"
            />
            {selectPosition && (
                <Circle center={locationSelection} pathOptions={fillBlueOptions} radius={500} />
            )}
            <ResetCenterView selectPosition={selectPosition} />
        </MapContainer>
    );
}