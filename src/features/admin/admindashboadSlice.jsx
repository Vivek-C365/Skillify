import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Data: null,
};

export const adminDashboard = createSlice({
  name: "Data",
  initialState,
  reducers: {
    setCoursesData: (state, action) => {
      state.Data = action.payload;
    },
    clearCoursesData: (state) => {
      state.Data = null;
    },
  },
});

export const { setCoursesData, clearCoursesData } = adminDashboard.actions;

export default adminDashboard.reducer;
