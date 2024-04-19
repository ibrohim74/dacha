import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "../appLayout/AppLayout";
import Filter from "../filter/Filter";
import AccomodationCard from "../cottages/AccomodationCard";
import Button from "../Button/Button";
import styles from "./Catalogue.module.css";
import { useTranslation } from "react-i18next";
import Form from "../form/Form";
import { Icons } from "../../assets/icons/icons";
import { FilterContext } from "../../context/CatalogueFilterContext";

export default function Catalogue({ products, isLoading, currentTab }) {
  const { t } = useTranslation();
  const elementsRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const { filterParams } = useContext(FilterContext);

  function findMinMaxPrice(cottages) {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    for (const cottage of cottages) {
      if (!isNaN(cottage.price)) {
        minPrice = Math.min(minPrice, cottage.price);
        maxPrice = Math.max(maxPrice, cottage.price);
      }
    }
    const data = [minPrice, maxPrice];
    return data;
  }

  const priceRange = useMemo(() => {
    if (!isLoading && products) {
      return findMinMaxPrice(products);
    }
    return undefined;
  }, [isLoading, products]);

  const filteredProducts = React.useMemo(() => {
    return products?.filter((cottage) => {
      // Filter by location name
      if (
        filterParams.locationName &&
        !cottage.location_name
          .toLowerCase()
          .includes(filterParams.locationName.toLowerCase())
      ) {
        return false;
      }

      // Filter by price range
      if (filterParams.minPrice && cottage.price < filterParams.minPrice) {
        return false;
      }
      if (filterParams.maxPrice && cottage.price > filterParams.maxPrice) {
        return false;
      }

      // Filter by rating
      if (filterParams.minRating && cottage.rating < filterParams.minRating) {
        return false;
      }

      // Filter by tags
      if (
        filterParams.tags.length > 0 &&
        !filterParams.tags.every(
          (tag) => cottage.tags && cottage.tags.includes(tag)
        )
      ) {
        return false;
      }

      return true;
    });
  }, [products, filterParams]);

  return (
    <AppLayout elementsRef={elementsRef}>
      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles["catalogue-layout"]}>
          <Filter priceRange={priceRange} currentTab={currentTab} />
          {filteredProducts?.length ? (
            <div className={styles["catalogue-items"]}>
              {filteredProducts?.map((product) => (
                <AccomodationCard accommodation={product} key={product.id} />
              ))}
              <Button type="full-width-white">{t("view_more")}</Button>
            </div>
          ) : (
            <div className={styles["catalogue-items-empty"]}>
              <Icons.EmptyPagePlaceholder />
              <p>Try to reload</p>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
