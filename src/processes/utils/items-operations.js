import data from "../../assets/test-items.json";

export const SortItems = (inputIds, byProperty) => {
  let items = inputIds.map((id) => data.items.find((item) => item.id === id)); // The output items array
  items.sort((a, b) => b[byProperty] - a[byProperty]);
  return items.map((item) => item.id); //returns ids of items ordered by given property
};

export const FilterItems = (inputIds, byProperty, inputProperty) => {
  let items = inputIds.map((id) => data.items.find((item) => item.id === id)); // The output items array
  items = items.filter((item) => item[byProperty] === inputProperty);
  return items.map((item) => item.id); //returns ids of items filtered by given property;
};

export const GetItems = (inputIds) => {
  return inputIds.map((id) => data.items.find((item) => item.id === id)); //returns array of items with input ids
};
