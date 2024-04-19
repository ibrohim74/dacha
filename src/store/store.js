import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import { feauturedAPI } from "../servises/featuredAPI";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cottagesAPI } from "../servises/cottagesAPI";
import { bookingAPI } from "../servises/bookingsAPI";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [feauturedAPI.reducerPath]: feauturedAPI.reducer,
    [cottagesAPI.reducerPath]: cottagesAPI.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(feauturedAPI.middleware)
      .concat(cottagesAPI.middleware)
      .concat(bookingAPI.middleware),
});

setupListeners(store.dispatch);

export default store;
