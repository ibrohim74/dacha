import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $authHost } from "../../processes/http/http";

const initialState = { favourites: [], loading: false, error: null };

export const addFavourite = createAsyncThunk(
  "favs/addFavourite",
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

export const getAllFavourites = createAsyncThunk(
  "favs/allFavs",
  async () => {}
);

const favSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    // addFavourite(state, action) {
    //   const { accommodation_id, accommodation_type } = action.payload;
    //   const newFavourite = { accommodation_id, accommodation_type };
    //   return {
    //     ...state,
    //     favourites: [...state.favourites, newFavourite],
    //   };
    // },
    removeFavourite(state, action) {
      const itemId = action.payload;
      return {
        ...state,
        favourites: state.favourites.filter((item) => item.id !== itemId),
      };
    },
    clearFavourites(state, action) {
      return { favourites: [] };
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addFavourite.fulfilled, (state, action) => {
      // console.log(action.payload);
      const { accommodation_id, accommodation_type } = action.payload;
      const newFavourite = { accommodation_id, accommodation_type };
      return {
        ...state,
        favourites: [...state.favourites, newFavourite],
      };
    });
  },
});

export const { removeFavourite } = favSlice.actions;

export default favSlice.reducer;
