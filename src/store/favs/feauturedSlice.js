import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  featuredList: [],
  featuredDetail: null,
  loading: false,
  error: null,
};

const featuredSlice = createSlice({
  name: "featured",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.loading = false;
          switch (action.type) {
            case "api/createFeatured/fulfilled":
              break;
            case "api/getFeaturedById/fulfilled":
              state.featuredDetail = action.payload;
              break;
            case "api/deleteFeatured/fulfilled":
              break;
            case "api/getUserFeatured/fulfilled":
              state.featuredList = action.payload;
              break;
          }
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const selectFeaturedList = (state) => state.featured.featuredList;
export const selectFeaturedDetail = (state) => state.featured.featuredDetail;
export const selectFeaturedLoading = (state) => state.featured.loading;
export const selectFeaturedError = (state) => state.featured.error;

export default featuredSlice.reducer;
