import React, { useEffect, useState } from "react";
import Catalogue from "../../components/catalogue/Catalogue";
import axios from "axios";

export default function CottagesCatalogue() {
  const [cottages, setCottages] = useState([]);

  useEffect(() => {
    const fetchCottages = async () => {
      try {
        const url = "https://visitca.travel/api/dachas";
        const response = await axios.get(url);
        setCottages(response.data);
        // console.log(cottages)
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchCottages();
  }, []);

  return <Catalogue products={cottages} />;
}
