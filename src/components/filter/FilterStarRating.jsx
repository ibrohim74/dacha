import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { CatalogueContext } from "../../context/CatalogueContext";
import styles from "./Filter.module.css";
import { FilterBox } from "./FilterBox";
import { Icons } from "../../assets/icons/icons";

export default function FilterStarRating() {
  const { t } = useTranslation();
  const [selectedRatings, setSelectedRatings] = useState([]);

  const { updateFilter } = useContext(CatalogueContext);

  const handleRatingChange = (value) => {
    const index = selectedRatings.indexOf(value);

    if (index === -1) {
      setSelectedRatings([...selectedRatings, value]);
    } else {
      const updatedRatings = selectedRatings.filter(
        (rating) => rating !== value
      );
      setSelectedRatings(updatedRatings);
    }
    updateFilter({ minRating: value });
  };

  return (
    <div className={styles["filter-item-box"]}>
      <label htmlFor="">{t("filter_rating")}</label>
      <div className={styles["boxes-wrapper"]}>
        <FilterBox
          onClick={() => handleRatingChange(1)}
          isSelected={selectedRatings.includes(1)}
        >
          <Icons.Star /> <span>1</span>
        </FilterBox>
        <FilterBox
          onClick={() => handleRatingChange(2)}
          isSelected={selectedRatings.includes(2)}
        >
          <Icons.Star /> <span>2</span>
        </FilterBox>
        <FilterBox
          onClick={() => handleRatingChange(3)}
          isSelected={selectedRatings.includes(3)}
        >
          <Icons.Star /> <span>3</span>
        </FilterBox>
        <FilterBox
          onClick={() => handleRatingChange(4)}
          isSelected={selectedRatings.includes(4)}
        >
          <Icons.Star /> <span>4</span>
        </FilterBox>
        <FilterBox
          onClick={() => handleRatingChange(5)}
          isSelected={selectedRatings.includes(5)}
        >
          <Icons.Star /> <span>5</span>
        </FilterBox>
      </div>
    </div>
  );
}
