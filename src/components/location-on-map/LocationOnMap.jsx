import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import marker from "../../assets/location-for-map.png";
import { Icon } from "leaflet";

const markerIcon = new Icon({
  iconUrl: marker,
  iconSize: [32, 32],
});

export default function LocationOnMap({ position }) {
  const fake_position = [41.397, 69.27];
  return (
    <MapContainer
      center={fake_position}
      zoom={13}
      style={{
        width: "100%",
        height: "600px",
        borderRadius: "30px",
      }}
    >
      <Circle center={fake_position} radius={2000} stroke={0} color="#007FFF" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={fake_position} icon={markerIcon}>
        <Popup>
          hello <br /> world
        </Popup>
      </Marker>
    </MapContainer>
  );
}
