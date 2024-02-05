import React, { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
  ZoomControl,
} from "react-leaflet";
import axios from "axios";
import { Divider, Input, message, Tooltip } from "antd";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import L from "leaflet";
import { InfoCircleOutlined } from "@ant-design/icons";
import "leaflet/dist/leaflet.css";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

const customMarkerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapsAnnouncement = (props) => {
  const { selectPosition, setSelectPosition } = props;
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);
  const [clicked, setClicked] = useState(false);

  const search = async () => {
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
      message.error("err");
    }
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
  useEffect(() => {
    search();

    if (clicked) {
      setClicked(false);
    }
    // map.flyTo(selectPosition?.lat, selectPosition?.lon, map.getZoom())
  }, [searchText, selectPosition, clicked]);

  return (
    <>
      <MapContainer
        zoom={9}
        center={{ lat: 41.34557, lng: 69.284599 }}
        style={{
          width: "100%",
          height: "200px",
          overflow: "hidden",
          borderRadius: "20px",
        }}
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
              suffix={
                <Tooltip title="Shaxar nomini yozib tanlang">
                  <InfoCircleOutlined
                    style={{
                      color: "rgba(0,0,0,.45)",
                    }}
                  />
                </Tooltip>
              }
              style={{ width: "100%", marginTop: "10px" }}
              value={searchText}
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
              placeholder={selectPosition?.display_name}
            />
          </div>
        </div>
        <div>
          <List component="nav" aria-label="main mailbox folders">
            {searchText &&
              listPlace.map((item) => {
                return (
                  <div key={item?.place_id}>
                    <ListItem
                      button
                      onClick={() => {
                        setSelectPosition(item);
                        setSearchText(null);
                      }}
                    >
                      <ListItemIcon>
                        <AddLocationAltIcon />
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

export default MapsAnnouncement;
