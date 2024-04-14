import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  $authHost,
  $host,
  refreshToken,
} from "../../../src/processes/http/http";

export const addFavourite = createAsyncThunk(
  "auth/addFavourite",
  async (newFav, thunkAPI) => {
    const response = await $authHost.post("/add_featured", newFav, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    // console.log(response);

    if (response.status === 200) {
      const data = await response.data;

      return data;
    } else {
      throw new Error("Failed to add favourite");
    }
  }
);

export const getFavourite = createAsyncThunk(
  "auth/getFavourite",
  async (userId, thunkAPI) => {
    try {
      const response = await $authHost.get(`/user/${userId}/featured`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch favourites");
      }

      const data = await response.data;
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching favourites:", error);
      throw error;
    }
  }
);

export const removeFavourite = createAsyncThunk(
  "auth/removeFavourite",
  async (favouriteId, thunkAPI) => {
    try {
      console.log("here");
      const response = await $authHost.delete(`/featured/${favouriteId}`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
      throw new Error("Failed to remove favourite");
    }

    return favouriteId;
  }
);
