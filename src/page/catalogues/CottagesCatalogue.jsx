import React, { useEffect, useState } from "react";
import Catalogue from "../../components/catalogue/Catalogue";

export default function CottagesCatalogue() {
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    const fetchCottages = async () => {
      try {
        const url =
          "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/dachas";
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchCottages();
  }, []);

  return <Catalogue products={cottages} />;
}
