import { useState } from "react";

function useUserLocation() {
  const [userLocation, setUserLocation] = useState(null);
  const [error, setError] = useState(null);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          setError(error);
          console.error("Error getting user location:", error);
        }
      );
    } else {
      setError({ message: "Geolocation is not supported by this browser." });
    }
  };

  return { userLocation, error, getUserLocation };
}

export default useUserLocation;
