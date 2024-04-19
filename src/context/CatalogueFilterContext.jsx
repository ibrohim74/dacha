import React, { createContext, useState } from "react";

export const FilterContext = createContext();

const FilterProvider = ({ children }) => {
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

  return (
    <FilterContext.Provider
      value={{ filterParams, updateFilter, resetAllFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
