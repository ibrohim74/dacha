import React, { useEffect, useState } from "react";
import Catalogue from "../../components/catalogue/Catalogue";

export default function HotelsCatalogue() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const url =
          "https://visitca.travel/api/hotels";
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
