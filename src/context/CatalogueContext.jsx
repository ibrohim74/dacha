import React, { createContext, useState } from "react";

export const CatalogueContext = createContext();

const CatalogueProvider = ({ children }) => {
  const [filterParams, setFilterParams] = useState({
    locationName: "",
    minPrice: null,
    maxPrice: null,
    minRating: null,
    tags: [],
  });

  const [searchParams, setSearchParams] = useState({
    locationName: "",
    startDate: null,
    endDate: null,
    guests: 1,
  });

  const updateFilter = (updatedParams) => {
    setFilterParams({ ...filterParams, ...updatedParams });
  };

  const updateSearch = (updatedParams) => {
    setSearchParams({ ...searchParams, ...updatedParams });
  };

  const resetAllFilters = () => {
    setFilterParams({
      locationName: "",
      minPrice: null,
      maxPrice: null,
      minRating: null,
      tags: [],
    });
  };

  const resetSearchParams = () => {
    setSearchParams({
      locationName: "",
      startDate: null,
      endDate: null,
      guests: 1,
    });
  };

  return (
    <CatalogueContext.Provider
      value={{
        filterParams,
        updateFilter,
        resetAllFilters,
        updateSearch,
        searchParams,
        resetSearchParams,
      }}
    >
      {children}
    </CatalogueContext.Provider>
  );
};

export default CatalogueProvider;
