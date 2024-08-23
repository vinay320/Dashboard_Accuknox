import { createSlice } from "@reduxjs/toolkit";
import { data } from "../assets/data";

const initialState = {
  categories: data,
};

const widgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    addWidget: (state, action) => {
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
    removeWidget: (state, action) => {
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
    },
  },
});

export const { addWidget, removeWidget } = widgetSlice.actions;

// Selector to get widget data
export const selectWidgetData = (state) => state.widget.categories;

export default widgetSlice.reducer;



