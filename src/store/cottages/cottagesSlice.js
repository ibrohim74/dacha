import { createSlice } from "@reduxjs/toolkit";

const dachasSlice = createSlice({
  name: "dachas",
  initialState: {
    allDachas: [],
    userDachas: [],
    selectedDacha: null,
    loading: false,
    error: null,
  },
  reducers: {
    dachasRequested: (state) => {
      state.loading = true; // Set loading state to true on API request
    },
    dachasFetched: (state, action) => {
      state.allDachas = action.payload;
      state.loading = false; // Reset loading state on successful fetch
      state.error = null; // Clear any previous errors
    },
    userDachasRequested: (state) => {
      state.loading = true;
    },
    userDachasFetched: (state, action) => {
      state.userDachas = action.payload;
      state.loading = false;
      state.error = null;
    },
    dachaFetched: (state, action) => {
      state.selectedDacha = action.payload;
      state.loading = false;
      state.error = null;
    },
    createDachaRequested: (state) => {
      state.loading = true;
    },
    createDachaSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Potentially update other state based on successful creation
    },
    createDachaFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Store the error object
    },
    updateDachaRequested: (state) => {
      state.loading = true;
    },
    updateDachaSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Update selectedDacha or other state based on update
    },
    updateDachaFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDachaRequested: (state) => {
      state.loading = true;
    },
    deleteDachaSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      // Potentially remove deleted dacha from state
    },
    deleteDachaFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    uploadDachaPhotoRequested: (state) => {
      state.loading = true;
    },
    uploadDachaPhotoSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Potentially update dacha data with uploaded photo info
    },
    uploadDachaPhotoFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDachaPhotoRequested: (state) => {
      state.loading = true;
    },
    deleteDachaPhotoSuccess: (state) => {
      state.loading = false;
      state.error = null;
      // Update dacha data to reflect deleted photo
    },
    deleteDachaPhotoFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { dachasFetched, userDachasFetched, dachaFetched } =
  dachasSlice.actions;
export default dachasSlice.reducer;
