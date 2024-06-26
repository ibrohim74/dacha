import { useEffect, useState } from "react";
import { isEmptyObject } from "../helpers/isEmptyObj";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState({});
  const [emptyLocation, setEmptyLocation] = useState(true);
  const [error, setError] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          console.log(position);
          setUserLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
          });
          localStorage.setItem("userLocation", JSON.stringify(userLocation));
        },

        (error) => {
          setError(error);
          console.error("Error getting user location:", error);
        }
      );
      return userLocation;
    } else {
      setError({ message: "Geolocation is not supported by this browser." });
    }
  };

  console.log(userLocation);
  console.log(JSON.stringify(userLocation));
  console.log(localStorage.getItem("userLocation"));

  return { userLocation, emptyLocation, error, getUserLocation };
}

export default useUserLocation;
