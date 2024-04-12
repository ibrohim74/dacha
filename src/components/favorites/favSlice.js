const initialState = { favourites: [], loading: false, error: null };

const favSlice = createSlice({
  name: "favs",
  initialState,
  reducers: {
    addFavourite(state, action) {
      const newItem = action.payload;
      return {
        ...state,
        newItem,
      };
    },
    removeFavourite(state, action) {
      const itemId = action.payload;
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== itemId),
      };
    },
    clearFavourites(state, action) {
      return { favourites: [] };
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
  },
});

export default favSlice.reducer;
