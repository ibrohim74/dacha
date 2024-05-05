import { createContext, useState } from "react";
import { isEmptyObject } from "../helpers/isEmptyObj";

export const UserLocationContext = createContext();

const UserLocationProvider = ({ children }) => {
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

  if (!isEmptyObject(userLocation)) {
    // console.log("setting into local storage", userLocation);
    localStorage.setItem("userLocation", JSON.stringify(userLocation));
  }

  // console.log(localStorage.getItem("userLocation"));

  return (
    <UserLocationContext.Provider
      value={{
        userLocation,
        getUserLocation,
        error,
        emptyLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;
