// import { createSlice } from "@reduxjs/toolkit";
// import { data } from "../assets/data";

// const initialState = {
//   categories: data,
//   searchQuery: "",
//   filteredResults: [],
//   isSearching: false,
// };

// const combinedSlice = createSlice({
//   name: "combined",
//   initialState,
//   reducers: {
//     setSearchQuery(state, action) {
//       state.searchQuery = action.payload;
//     },
//     performSearch(state) {
//       if (state.searchQuery.trim() === "") {
//         state.filteredResults = [];
//         state.isSearching = false;
//         return;
//       }

//       const query = state.searchQuery.toLowerCase();
//       const filtered = state.categories.map((category) => ({
//         ...category,
//         data: Object.fromEntries(
//           Object.entries(category.data).filter(([key]) =>
//             key.toLowerCase().includes(query)
//           )
//         ),
//       }));

//       const results = filtered.filter(
//         (category) => Object.keys(category.data).length > 0
//       );

//       state.filteredResults = results;
//       state.isSearching = true;
//     },
//     clearSearch(state) {
//       state.searchQuery = "";
//       state.filteredResults = [];
//       state.isSearching = false;
//     },
//     addWidget(state, action) {
//       const { categoryName, widgetName, widgetData } = action.payload;
//       state.categories = state.categories.map((category) =>
//         category.name === categoryName
//           ? {
//               ...category,
//               data: { ...category.data, [widgetName]: widgetData },
//             }
//           : category
//       );
//     },
//     removeWidget(state, action) {
//       const { categoryName, widgetName } = action.payload;
//       state.categories = state.categories.map((category) =>
//         category.name === categoryName
//           ? {
//               ...category,
//               data: Object.fromEntries(
//                 Object.entries(category.data).filter(
//                   ([key]) => key !== widgetName
//                 )
//               ),
//             }
//           : category
//       );
//       // Dispatch search action separately if needed
//     },
//   },
// });

// export const {
//   setSearchQuery,
//   performSearch,
//   clearSearch,
//   addWidget,
//   removeWidget,
// } = combinedSlice.actions;

// export default combinedSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { data } from "../assets/data";

const initialState = {
  categories: data,
  searchQuery: "",
  filteredResults: [],
  isSearching: false,
};

const combinedSlice = createSlice({
  name: "combined",
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
      const filtered = state.categories.map((category) => ({
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
    addWidget(state, action) {
      const { categoryName, widgetName, widgetData } = action.payload;
      state.categories = state.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              data: { ...category.data, [widgetName]: widgetData },
            }
          : category
      );
    },
    removeWidget(state, action) {
      const { categoryName, widgetName } = action.payload;
      state.categories = state.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              data: Object.fromEntries(
                Object.entries(category.data).filter(
                  ([key]) => key !== widgetName
                )
              ),
            }
          : category
      );
      // Dispatch search action separately if needed
    },
  },
});

export const {
  setSearchQuery,
  performSearch,
  clearSearch,
  addWidget,
  removeWidget,
} = combinedSlice.actions;

export default combinedSlice.reducer;
