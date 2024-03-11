import React, { useEffect, useRef, useState } from "react";
import style from "./place.module.css";
import Header from "../../components/header/Header";
import MapPlace from "./component/mapPlace";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { GetAllPlaces } from "../admin/placeMap/API/placeAdminAPI";
import { Input } from "antd";
import L from "leaflet";

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Place = () => {
  const [allPlace, setAllPlace] = useState([]);
  const [clickInfo, setClickInfo] = useState();
  const mapRef = useRef(null);
  useEffect(() => {
    GetAllPlaces().then((r) => {
      if (r?.status === 200) {
        setAllPlace(r.data);
      }
    });
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (map && clickInfo && clickInfo?.latitude && clickInfo?.longitude) {
      map.flyTo([clickInfo.latitude, clickInfo.longitude], map.getZoom());
    }
  }, [clickInfo]);

  console.log(clickInfo);
  return (
    <>
      <Header />
      <div className={style.placeContent}>
        <div className={style.placeSidebar}>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Location
          </h1>
          {allPlace &&
            allPlace.map((item) => {
              return (
                <div key={item.id} onClick={() => setClickInfo(item)}>
                  {item?.title}
                </div>
              );
            })}
        </div>
        <div className={style.placeMap} style={{ zIndex: 0 }}>
          <MapContainer
            zoom={8}
            ref={mapRef}
            center={[41.34557, 69.284599]}
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            <TileLayer
              attribution="by khasanov_ibroxim"
              url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
            />
            <TileLayer url="https://www.google.cn/maps/vt?lyrs=y@189&gl=cn&x={x}&y={y}&z={z}" />

            {allPlace &&
              allPlace.map((item) => {
                return (
                  <Marker
                    key={item.id}
                    position={[item?.latitude, item?.longitude]}
                    icon={customMarkerIcon}
                  >
                    <Popup style={{ width: "300px", height: "500px" }}>
                      {item?.title} <br />
                      {item.address}
                    </Popup>
                  </Marker>
                );
              })}
          </MapContainer>
        </div>
      </div>
    </>
  );
};

export default Place;
