import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url_v1 } from "../utils/config";

// ✅ Fetch all blogs
export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url_v1}/getBlogs`, {
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
        return rejectWithValue(error.response.data.message || "Failed to fetch blogs");
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ✅ Fetch a single blog by ID (POST request with ID in body)
export const fetchSingleBlog = createAsyncThunk(
  "blogs/fetchSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url_v1}/getSingleBlog`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to fetch blog");
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);

// ✅ Slice
const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSingleBlog: (state) => {
      state.singleBlog = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single blog
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSingleBlog } = blogSlice.actions;
export default blogSlice.reducer;
