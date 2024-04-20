import React, { useContext, useState } from "react";
import styles from "./Filter.module.css";
import { Icons } from "../../assets/icons/icons";
import { LocationOnOutlined } from "@mui/icons-material";
import Button from "../Button/Button";
import { Slider } from "antd";
import { useTranslation } from "react-i18next";
import Tabs from "../tabs/Tabs";
import AccordionItem from "../accordion-item/AccordionItem";
import FilterServices from "../filter-services/FilterServices";
import { CatalogueContext } from "../../context/CatalogueContext";

export default function Filter({ priceRange, currentTab }) {
  const { t } = useTranslation();

  const [rangeValues, setRangeValues] = useState(priceRange);
  const { filterParams, updateFilter, resetAllFilters } =
    useContext(CatalogueContext);

  const [selectedTags, setSelectedTags] = useState(filterParams.tags || []);

  // console.log(priceRange);

  const handleLocationChange = (event) => {
    updateFilter({ locationName: event.target.value });
  };
  const handleRatingChange = (value) => {
    updateFilter({ minRating: value });
  };

  const handleTagChange = (tag) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((selectedTag) => selectedTag !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    updateFilter({ tags: newSelectedTags });
  };

  const handleRangeChange = (values) => {
    setRangeValues(values);
    updateFilter({ minPrice: values[0], maxPrice: values[1] });
  };

  const numberFormatter = (value) => {
    return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className={styles["filter-container"]}>
      <div className={styles["filter-wrapper"]}>
        <div className={styles["filter-item-location-box"]}>
          <input
            type="text"
            className={styles["filter-location-input"]}
            placeholder={t("filter_search_placeholder")}
            onChange={handleLocationChange}
          />
          <div className={styles["filter-location-output"]}>
            <LocationOnOutlined />
            Location
          </div>
        </div>

        <Tabs
          firstTab={t("hotels_title")}
          secondTab={t("cottages_title")}
          currentTab={currentTab}
          content={{
            firstTab: (
              <>
                <div className={styles["filter-item-box"]}>
                  <label htmlFor="priceRange">{t("filter_price")}</label>

                  <div className={styles["filter-range"]}>
                    <FilterBox>{rangeValues[0]}</FilterBox>
                    <Slider
                      range
                      min={rangeValues[0]}
                      max={rangeValues[1]}
                      defaultValue={rangeValues}
                      className={styles["filter-range-slider"]}
                      onChange={handleRangeChange}
                      tooltip={{ formatter: null }}
                    />
                    <FilterBox>{rangeValues[1]}</FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <label htmlFor="">{t("filter_rating")}</label>
                  <div className={styles["boxes-wrapper"]}>
                    <FilterBox onClick={() => handleRatingChange(1)}>
                      <Icons.Star /> <span>1</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(2)}>
                      <Icons.Star /> <span>2</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(3)}>
                      <Icons.Star /> <span>3</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(4)}>
                      <Icons.Star /> <span>4</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(5)}>
                      <Icons.Star /> <span>5</span>
                    </FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <label htmlFor="">{t("filter_distance")}</label>
                  <div className={styles["boxes-wrapper"]}>
                    <FilterBox> &lt;5{t("km")}</FilterBox>
                    <FilterBox>&lt;10{t("km")}</FilterBox>
                    <FilterBox>&lt;15{t("km")}</FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <AccordionItem
                    title={t("filter_services")}
                    content="lorem impusum"
                  />
                  <AccordionItem title=" Питание" content="lorem impusum" />
                </div>
              </>
            ),
            secondTab: (
              <>
                <div className={styles["filter-item-box"]}>
                  <label htmlFor="priceRange">{t("filter_price")}</label>
                  <div className={styles["filter-range"]}>
                    <FilterBox>{rangeValues[0]}</FilterBox>
                    <Slider
                      range
                      min={rangeValues[0]}
                      max={rangeValues[1]}
                      defaultValue={rangeValues}
                      className={styles["filter-range-slider"]}
                      onChange={handleRangeChange}
                      tooltip={{ formatter: null }}
                    />
                    <FilterBox>{rangeValues[1]}</FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <label htmlFor="">{t("filter_rating")}</label>
                  <div className={styles["boxes-wrapper"]}>
                    <FilterBox onClick={() => handleRatingChange(1)}>
                      <Icons.Star /> <span>1</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(2)}>
                      <Icons.Star /> <span>2</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(3)}>
                      <Icons.Star /> <span>3</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(4)}>
                      <Icons.Star /> <span>4</span>
                    </FilterBox>
                    <FilterBox onClick={() => handleRatingChange(5)}>
                      <Icons.Star /> <span>5</span>
                    </FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <label htmlFor="">{t("filter_distance")}</label>
                  <div className={styles["boxes-wrapper"]}>
                    <FilterBox> &lt;5{t("km")}</FilterBox>
                    <FilterBox>&lt;10{t("km")}</FilterBox>
                    <FilterBox>&lt;15{t("km")}</FilterBox>
                  </div>
                </div>

                <div className={styles["filter-item-box"]}>
                  <AccordionItem
                    title={t("filter_services")}
                    content={<FilterServices />}
                  />
                  <AccordionItem title="Питание" content="lorem impusum" />
                </div>
              </>
            ),
          }}
        />
      </div>
      <Button type="full-width-gray" onClick={resetAllFilters}>
        {t("filter_clear_btn")}
      </Button>
    </div>
  );
}

function FilterBox({ children, onClick }) {
  return (
    <div className={styles["filter-box"]} onClick={onClick}>
      {children}
    </div>
  );
}
