import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import {
  LOGIN_ROUTE,
  REGISTER_ROUT,
  HOME_ROUTE,
} from "../../processes/utils/consts";
import styles from "./villas.module.css";
import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
// test json
import data from "../../assets/test-items.json";
import {
  SortItems,
  FilterItems,
  GetItems,
} from "../../processes/utils/items-operations";
import CottageCard from "../../components/cottages/CottageCard";
import Form from "../../components/form/Form";
import DatePicker from "../../components/date-picker/date-picker";
import Filter from "../../components/filter/Filter";

const Villas = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const [selectedMonth, setSelectedMonth] = useState(0); // January
  const [selectedType, setSelectedType] = useState(0); // types: 0 = "villa", 1 = "hotel", 2 = "restaurant"
  const [selectedSort, setSelectedSort] = useState(0); // sorts: 0 = "price", 1 = "score"
  const [filteredItems, setFilteredItems] = useState([]); // Use state for filteredItems
  const [products, setProducts] = useState([]);

  // Map type and sort to actual values
  const typeMap = ["villa", "hotel", "restaurant"];
  const sortMap = ["price", "score"];

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSortChange = (event) => {
    setSelectedSort(event.target.value);
  };

  useEffect(() => {
    const allItemIds = data.items.map((item) => item.id);
    const filteredItems = GetItems(
      SortItems(
        FilterItems(allItemIds, "type", typeMap[selectedType]),
        sortMap[selectedSort]
      )
    );
    setFilteredItems(filteredItems); // Update state using the setter function
  }, [selectedType, selectedSort]);

  //test operations on test-items.json
  const allItemIds = data.items.map((item) => item.id);

  // working with actual db:

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url =
          "https://ip-45-137-148-81-100178.vps.hosted-by-mvps.net/dachas";
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  return (
    <div className={styles["container-md"]}>
      <Header />

      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      <div className={styles["container-md"]}>
        <div className={styles["catalogue-layout"]}>
          <Filter />
          <div className={styles["catalogue-items"]}>
            {products.map((cottage) => (
              <CottageCard cottage={cottage} key={cottage.id} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Villas;
