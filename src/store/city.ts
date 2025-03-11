import { createSlice } from "@reduxjs/toolkit";

const initialState: CITY_STATE = {
    bookingID: null
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setBookingID: (state, action) => {
      state.bookingID = action.payload;
    },
  },
});

export const {
  setBookingID
} = citySlice.actions;
export default citySlice.reducer;