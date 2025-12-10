import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api_url_v1 } from "../utils/config";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url_v1}/createPaymentIntent`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("snsesCustomerToken")}`,
          },
        }
      );
      return response.data.data || response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to create order");
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
    "order/fetchUserOrders",
    async (customerId, { rejectWithValue }) => {
      try {
        const response = await axios.post(
          `${api_url_v1}/getCustomerOrders`,
          { customerId }, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("snsesCustomerToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        return response.data.data || response.data;
      } catch (error) {
        if (error.response?.data) {
          return rejectWithValue(
            error.response.data.message || "Failed to fetch orders"
          );
        }
        return rejectWithValue(error.message || "Network error");
      }
    }
  );

// ✅ Fetch a single order by ID (POST request with ID in body)
export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url_v1}/getOrderDetails`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("snsesCustomerToken")}`,
          },
        }
      );
      return response.data.data || response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to fetch order");
      }
      return rejectWithValue(error.message || "Network error");
    }
  }
);



const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    singleOrder: null,
    orderCreated: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearSingleOrder: (state) => {
      state.singleOrder = null;
    },
    clearOrderCreated: (state) => {
      state.orderCreated = null;
      state.success = false;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.orderCreated = action.payload;
        state.orders.unshift(action.payload); // Add to beginning of orders list
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch all user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch single order
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.singleOrder = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export const { clearSingleOrder, clearOrderCreated, clearOrderError } = orderSlice.actions;
export default orderSlice.reducer;