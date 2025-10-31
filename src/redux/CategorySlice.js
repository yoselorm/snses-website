import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url_v1 } from "../utils/config";

// ✅ Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url_v1}/getCategories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        params: {
          _cb: new Date().getTime(), // prevent caching
        },
      });
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || "Failed to fetch categories"
        );
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ✅ Slice
const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
