import { createSlice } from "@reduxjs/toolkit";

let CategoryNameSlice = createSlice({
  name: "ProductSlice",
  initialState: {
    categoryName: ["all", "Men's Fashion", "Women's Fashion", "Electronics"],
    selectedCategory: "all"
  },
  reducers: {
    getCategoryName: (state, action) => {
      state.selectedCategory = action.payload;
    }
  }
});

export let { getCategoryName } = CategoryNameSlice.actions;

export default CategoryNameSlice.reducer;