import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import AppLayout from "../appLayout/AppLayout";
import Filter from "../filter/Filter";
import AccomodationCard from "../cottages/AccomodationCard";
import Button from "../Button/Button";
import styles from "./Catalogue.module.css";
import { useTranslation } from "react-i18next";
import Form from "../form/Form";
import { Icons } from "../../assets/icons/icons";
import { CatalogueContext } from "../../context/CatalogueContext";
import useSearch from "../../hooks/useSearch";
import Loader from "../loader/Loader";
import { getAccommodationTags } from "../../servises/tagsAPI";

export default function Catalogue({ products, isLoading, currentTab }) {
  const elementsRef = useRef(null);

  const { t } = useTranslation();
  const { isValidBooking } = useSearch();
  const [cottageTags, setCottageTags] = useState(null);
  const [loadingTags, setLoadingTags] = useState(false);
  const { filterParams, searchParams } = useContext(CatalogueContext);

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

  useMemo(() => {
    setLoadingTags(true);

    const fetchCottageTags = async () => {
      try {
        const allPromises = products.map(async (product) => {
          const tags = await getAccommodationTags(product.id, product.type);
          // console.log(product.type);
          return { id: product.id, tags };
        });

        const allTags = await Promise.all(allPromises);
        setCottageTags(allTags);
        setLoadingTags(false);
        // console.log("everything is okay");
      } catch (error) {
        console.error("Error fetching cottage tags:", error);
      }
    };

    fetchCottageTags();
  }, [products]);

  const priceRange = useMemo(() => {
    if (!isLoading && products) {
      return findMinMaxPrice(products);
    }
    return undefined;
  }, [isLoading, products]);

  const filteredProducts = useMemo(() => {
    return products?.filter((cottage) => {
      if (
        filterParams.locationName &&
        !cottage.location_name
          .toLowerCase()
          .includes(filterParams.locationName.toLowerCase())
      ) {
        return false;
      }

      if (filterParams.minPrice && cottage.price < filterParams.minPrice) {
        return false;
      }

      if (filterParams.maxPrice && cottage.price > filterParams.maxPrice) {
        return false;
      }

      if (filterParams.minRating && cottage.rating < filterParams.minRating) {
        return false;
      }

      if (!cottageTags) return false;
      const cottageData = cottageTags.find((data) => data.id === cottage.id);
      if (!cottageData) return false;

      if (filterParams.tags.length !== 0) {
        return filterParams.tags.every((tag) => cottageData.tags.includes(tag));
      }

      return true;
    });
  }, [products, filterParams, cottageTags]);

  const searchResults = useMemo(() => {
    return searchParams.locationName
      ? filteredProducts?.filter((cottage) => {
          if (
            searchParams.locationName &&
            !cottage.location_name
              .toLowerCase()
              .includes(searchParams.locationName.toLowerCase())
          ) {
            return false;
          }

          return true;
        })
      : filteredProducts;
  }, [filteredProducts, searchParams]);

  const validSearchResults = useMemo(() => {
    return searchResults?.filter((cottage) => isValidBooking(cottage));
  }, [searchResults, isValidBooking]);

  return (
    <AppLayout elementsRef={elementsRef}>
      <div className={styles["form-wrapper"]}>
        <Form />
      </div>

      {isLoading || loadingTags ? (
        <Loader />
      ) : (
        <div className={styles["catalogue-layout"]}>
          <Filter priceRange={priceRange} currentTab={currentTab} />

          {validSearchResults?.length ? (
            <div className={styles["catalogue-items"]}>
              {validSearchResults?.map((product) => (
                <AccomodationCard accommodation={product} key={product.id} />
              ))}
              <Button type="full-width-white">{t("view_more")}</Button>
            </div>
          ) : (
            <div className={styles["catalogue-items-empty"]}>
              <Icons.EmptyPagePlaceholder />
              <p>{t("params_not_found")}</p>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
