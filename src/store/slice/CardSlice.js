import { createSlice } from "@reduxjs/toolkit";
import { searchColumnIndex, filterCards } from "../../hooks/excelReader";

const cardsTags = [
  "1t",
  "spare1t",
  "dana1t",
  "jacky1t",
  "pepega1t",
  "saka1t",
  "server1t",
  "souta1t",
  "eti1t",
];

export const cardSlice = createSlice({
  name: "cardCodes",
  initialState: {
    filteredCardsOne: [],
    filteredCardsTwo: [],
    cardsTags,
  },
  reducers: {
    downloadCards: (state, action) => {
      const { excelContentFileOne, excelContentFileTwo } = action.payload;

      const fileOneColumnIndexes = {
        code: searchColumnIndex(excelContentFileOne[0], "code"),
        tag: searchColumnIndex(excelContentFileOne[0], "tag"),
        wishlists: searchColumnIndex(excelContentFileOne[0], "wishlists"),
      };

      const fileTwoColumnIndexes = {
        code: searchColumnIndex(excelContentFileTwo[0], "code"),
        tag: searchColumnIndex(excelContentFileTwo[0], "tag"),
        wishlists: searchColumnIndex(excelContentFileTwo[0], "wishlists"),
      };

      const filteredCardsOne = filterCards(
        excelContentFileOne,
        state.cardsTags,
        fileOneColumnIndexes
      );

      const filteredCardsTwo = filterCards(
        excelContentFileTwo,
        state.cardsTags,
        fileTwoColumnIndexes
      );

      state.filteredCardsOne = filteredCardsOne;
      state.filteredCardsTwo = filteredCardsTwo;
    },
  },
});

// Actions for the Reducers
export const { downloadCards } = cardSlice.actions;
export default cardSlice.reducer;
