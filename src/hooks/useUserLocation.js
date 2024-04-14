import { useState } from "react";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState({});
  const [error, setError] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
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

  return { userLocation, error, getUserLocation };
}

export default useUserLocation;
