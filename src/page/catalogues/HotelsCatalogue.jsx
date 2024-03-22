import React, { useEffect, useState } from "react";
import Catalogue from "../../components/catalogue/Catalogue";

export default function HotelsCatalogue() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const url =
          "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/api/hotels";
        const response = await axios.get(url);
        setHotels(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchHotels();
  }, []);

  return <Catalogue products={hotels} />;
}
