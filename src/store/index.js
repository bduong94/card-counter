import { configureStore } from "@reduxjs/toolkit";
import cardCodesSlice from "./slice/CardSlice.js";

export default configureStore({
  reducer: {
    cards: cardCodesSlice,
  },
});
