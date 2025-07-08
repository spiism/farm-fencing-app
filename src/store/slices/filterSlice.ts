import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProductCategory } from "../../types/product";

interface FilterState {
  searchTerm: string;
  selectedCategory: ProductCategory;
}

const initialState: FilterState = {
  searchTerm: "",
  selectedCategory: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setSelectedCategory(state, action: PayloadAction<ProductCategory>) {
      state.selectedCategory = action.payload;
    },
    clearFilters(state) {
      state.searchTerm = "";
      state.selectedCategory = "all";
    },
  },
});

export const { setSearchTerm, setSelectedCategory, clearFilters } =
  filterSlice.actions;
export default filterSlice.reducer;
