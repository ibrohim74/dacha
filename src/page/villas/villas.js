import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "./villas.module.css";
// test json
import data from "../../assets/test-items.json";
import {
  SortItems,
  FilterItems,
  GetItems,
} from "../../processes/utils/items-operations";
import CottageCard from "../../components/cottages/CottageCard";
import Form from "../../components/form/Form";
import Filter from "../../components/filter/Filter";
import Button from "../../components/Button/Button";
import AppLayout from "../../components/appLayout/AppLayout";
import {GetAllDacha} from "../home/API/homeAPI";

const Villas = () => {
  const elementsRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");

  const [selectedMonth, setSelectedMonth] = useState(0); // January
  const [selectedType, setSelectedType] = useState(0); // types: 0 = "villa", 1 = "hotel", 2 = "restaurant"
  const [selectedSort, setSelectedSort] = useState(0); // sorts: 0 = "price", 1 = "score"
  const [filteredItems, setFilteredItems] = useState([]); // Use state for filteredItems
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

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


  useEffect(() => {
    GetAllDacha(page)
        .then(r => {
          setProducts(r.data);
        })
        .catch(err => {
          console.log(err);
        });
  }, [page]);



  return (
    <AppLayout elementsRef={elementsRef}>
      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      <div className={styles["catalogue-layout"]}>
        <Filter />
        <div className={styles["catalogue-items"]}>
          {products.map((cottage) => (
            <CottageCard cottage={cottage} key={cottage.id} />
          ))}
          <Button type="full-width-white" onClick={() => setPage(page + 1)}>Смотреть больше</Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default Villas;
