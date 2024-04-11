import { createAsyncThunk } from "@reduxjs/toolkit";
import { $authHost, $host } from "../../../src/processes/http/http";

export const addFavourite = createAsyncThunk(
  "favs/addFavourite",
  async (favourite) => {
    const response = await $authHost.post("/add_featured", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favourite),
    });

    if (!response.ok) {
      throw new Error("Failed to add favourite");
    }

    const data = await response.json();
    return data;
  }
);

export const getFavourite = createAsyncThunk(
  "favs/getFavourite",
  async (featuredId) => {
    const response = await $authHost.get(`/featured/${featuredId}`);

    if (!response.ok) {
      throw new Error("Failed to get favourite");
    }

    const data = await response.json();
    return data;
  }
);

export const removeFavourite = createAsyncThunk(
  "favs/removeFavourite",
  async (favouriteId) => {
    const response = await $authHost.delete(`/featured/${favouriteId}`);

    if (!response.ok) {
      throw new Error("Failed to remove favourite");
    }

    const data = await response.json();
    console.log(data);
    return favouriteId;
  }
);
