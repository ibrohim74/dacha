import { useGetAllDachasQuery } from "./cottagesAPI";

function searchDachas(params) {
  const { title, minimum_price, maximum_price, location_name, tags } = params;

  const url = new URL("/dachas", BASE_URL);
  const searchParams = new URLSearchParams(url.search);

  if (title) {
    searchParams.append("like[title]", title);
  }
  if (minimum_price) {
    searchParams.append("minimum_price", minimum_price);
  }
  if (maximum_price) {
    searchParams.append("maximum_price", maximum_price);
  }
  if (location_name) {
    searchParams.append("location_name", location_name);
  }
  if (tags) {
    // Handle tags filtering based on your backend implementation
    // Here are two possible approaches:

    // Option 1: Assuming tags are stored as a comma-separated string in the dacha object
    searchParams.append("tags", tags.join(","));

    // Option 2: Assuming tags are stored as an array within the dacha object (more complex)
    // You might need to implement backend logic to search for dachas where the tags array includes any of the provided tags. This could involve a search query like "tags LIKE '%tag1%' OR tags LIKE '%tag2%' ..." for each tag in the provided list.

    // Choose the option that aligns with your backend data structure and search capabilities.
  }

  url.search = searchParams.toString();

  return useGetAllDachasQuery(url.toString());
}
