import { createSlice } from "@reduxjs/toolkit";
import { data } from "../assets/data";
import { selectWidgetData } from "./widgetSlice";
const initialState = {
  searchQuery: "",
  filteredResults: [],
  isSearching: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    performSearch(state) {
      if (state.searchQuery.trim() === "") {
        state.filteredResults = [];
        state.isSearching = false;
        return;
      }

      const query = state.searchQuery.toLowerCase();
      console.log(selectWidgetData);
      
      const filtered = selectWidgetData.map((category) => ({
        ...category,
        data: Object.fromEntries(
          Object.entries(category.data).filter(([key]) =>
            key.toLowerCase().includes(query)
          )
        ),
      }));

      const results = filtered.filter(
        (category) => Object.keys(category.data).length > 0
      );

      state.filteredResults = results;
      state.isSearching = true;
    },
    clearSearch(state) {
      state.searchQuery = "";
      state.filteredResults = [];
      state.isSearching = false;
    },
  },
});

export const { setSearchQuery, performSearch, clearSearch } =
  searchSlice.actions;

export default searchSlice.reducer;
