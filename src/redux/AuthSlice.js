import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_url_v1 } from '../utils/config';

// Async thunk for adding a customer
export const addCustomer = createAsyncThunk(
  'customer/addCustomer',
  async (customerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api_url_v1}/addCustomer`, customerData);
      if (response.data.data.token) {
        localStorage.setItem('snsesCustomerToken', response?.data.data.token);
        localStorage.setItem('snsesUserId',response?.data.data.customerInfo.id)
      }
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Failed to add customer' }
      );
    }
  }
);

// Async thunk for customer login
export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api_url_v1}/customerLogin`, loginData);
      if (response.data.data.token) {
        localStorage.setItem('snsesCustomerToken', response?.data.data.token);
        localStorage.setItem('snsesUserId',response?.data.data.customerInfo.id)
      }

      
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: 'Login failed' }
      );
    }
  }
);

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers: [],
    currentUser: null,
    token: localStorage.getItem('snsesCustomerToken') || null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCustomerState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    logoutCustomer: (state) => {
      state.currentUser = null;
      state.token = null;
      localStorage.removeItem('snsesCustomerToken');
      localStorage.removeItem('snsesUserId')
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Customer
      .addCase(addCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Something went wrong';
      })
      // Login Customer
      .addCase(loginCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload.customerInfo;
        state.token = action.payload.token || null;
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      });
  },
});

export const { resetCustomerState, logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;