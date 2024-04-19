import { useEffect, useState } from "react";

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
    } else {
      setError({ message: "Geolocation is not supported by this browser." });
    }
    console.log(userLocation);
  };

  // useEffect(() => {
  //   const isEmptyLocation = Object.keys(userLocation).length === 0;

  //   if (!isEmptyLocation) {
  //     setEmptyLocation(false);
  //   }

  //   const storedLocation = localStorage.getItem("userLocation");

  //   if (storedLocation) {
  //     setUserLocation(JSON.parse(storedLocation));
  //     setEmptyLocation(false);
  //   }

  //   if (emptyLocation) {
  //     getUserLocation();
  //   }
  // }, [userLocation, emptyLocation]);

  console.log(emptyLocation);

  return { userLocation, emptyLocation, error, getUserLocation };
}

export default useUserLocation;
