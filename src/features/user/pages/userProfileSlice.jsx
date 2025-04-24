import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

export const userSlice = createSlice({
  name: "UserDetails",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
