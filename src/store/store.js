import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
// import favsReducer from "../components/favorites/favSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // favs: favsReducer,
  },
});

export default store;
