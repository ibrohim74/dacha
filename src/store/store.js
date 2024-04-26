import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { feauturedAPI } from "../servises/featuredAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cottagesAPI } from "../servises/cottagesAPI";
import { bookingAPI } from "../servises/bookingsAPI";
import { tagsAPI } from "../servises/tagsAPI";
import { reviewsAPI } from "../servises/reviewsAPI";
import { hotelsAPI } from "../servises/hotelsAPI";
import { usersAPI } from "../servises/usersAPI";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [feauturedAPI.reducerPath]: feauturedAPI.reducer,
    [cottagesAPI.reducerPath]: cottagesAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [tagsAPI.reducerPath]: tagsAPI.reducer,
    [reviewsAPI.reducerPath]: reviewsAPI.reducer,
    [hotelsAPI.reducerPath]: hotelsAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(feauturedAPI.middleware)
      .concat(cottagesAPI.middleware)
      .concat(bookingAPI.middleware)
      .concat(tagsAPI.middleware)
      .concat(reviewsAPI.middleware)
      .concat(hotelsAPI.middleware)
      .concat(usersAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
