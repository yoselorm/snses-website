import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { api_url_v1 } from '../utils/config';

const token = localStorage?.getItem('snsesCustomerToken');

// Get all products
export const getProducts = createAsyncThunk(
  'products/getProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url_v1}/getProducts`, {
        headers: { 'Content-Type': 'application/json' },
        params: { _cb: new Date().getTime() }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const getBestsellers = createAsyncThunk(
  'products/getBestsellers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url_v1}/bestSellers`, {
        headers: { 'Content-Type': 'application/json' },
        params: { _cb: new Date().getTime() }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Get products by category
export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api_url_v1}/getProducts?category=${categoryId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        params: {
          _cb: Date.now(), 
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products by category');
    }
  }
);

// Add to wishlist
export const addToWishlist = createAsyncThunk(
  'products/addToWishlist',
  async ({ customerId, productToken }, { rejectWithValue }) => {
    try {
      const customerToken = localStorage.getItem('snsesCustomerToken');
      const response = await axios.post(`${api_url_v1}/addWishlist`, 
        { customerId, productToken },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customerToken}`,
          }
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to wishlist');
    }
  }
);

// ✅ Get wishlist
export const getWishlist = createAsyncThunk(
  'products/getWishlist',
  async (_,{ rejectWithValue }) => {
    try {
      const customerToken = localStorage.getItem('snsesCustomerToken');
      const customerId = localStorage.getItem('snsesUserId')
      const response = await axios.post(`${api_url_v1}/getWishlist`,{customerId}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${customerToken}`,
        },
        params: {
          _cb: Date.now(), // cache buster
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

// ✅ Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'products/removeFromWishlist',
  async ({ wishId }, { rejectWithValue }) => {
    try {
      const customerToken = localStorage.getItem('snsesCustomerToken');
      const response = await axios.post(`${api_url_v1}/deleteWishlist`, 
        {wishId},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customerToken}`,
          }
        }
      );
      return wishId; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from wishlist');
    }
  }
);

export const getProductByToken = createAsyncThunk(
  'products/getProductByToken',
  async (productToken, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${api_url_v1}/getProductData`,{productToken}
      );
      return response.data.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch product'
      );
    }
  }
);

// Initial state
const initialState = {
  products: [],
  filteredProducts: [],
  bestSellers:[],
  selectedProduct: null,
  loading: false,
  error: null,
  success: false,
  message: '',

  // Wishlist
  wishlist: [],
  wishlistLoading: false,
  wishlistSuccess: false,
  wishlistError: null,

};

// Create slice
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.wishlistError = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = '';
      state.wishlistSuccess = false;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    filterProducts: (state, action) => {
      const { searchTerm, status, category } = action.payload;
      
      state.filteredProducts = state.products?.filter(product => {
        const productName = product.productName || product.name || '';
        const productCategory = product.category?.category || product.category || '';
        
        const matchesSearch = searchTerm
          ? productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            productCategory.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        
        const matchesStatus = status && status !== 'all'
          ? product.status === status
          : true;
        
        const matchesCategory = category && category !== 'all'
          ? productCategory === category
          : true;
        
        return matchesSearch && matchesStatus && matchesCategory;
      });
    },
    resetFilteredProducts: (state) => {
      state.filteredProducts = state.products;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all products
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //Get all best sellers
      .addCase(getBestsellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBestsellers.fulfilled, (state, action) => {
        state.loading = false;
        state.bestSellers = action.payload;
        state.bestSellers = action.payload;
        state.error = null;
      })
      .addCase(getBestsellers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get products by category
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
        state.error = null;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add to wishlist
      .addCase(addToWishlist.pending, (state) => {
        state.wishlistLoading = true;
        state.wishlistError = null;
        state.wishlistSuccess = false;
      })
      .addCase(addToWishlist.fulfilled, (state,action) => {
        state.wishlistLoading = false;
        state.wishlistSuccess = true;
        state.message = 'Added to wishlist successfully';
        state.wishlistError = null;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistError = action.payload;
        state.wishlistSuccess = false;
      })

      // ✅ Get wishlist
      .addCase(getWishlist.pending, (state) => {
        state.wishlistLoading = true;
        state.wishlistError = null;
      })
      .addCase(getWishlist.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.wishlist = action.payload;
        state.wishlistError = null;
      })
      .addCase(getWishlist.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistError = action.payload;
      })

      // ✅ Remove from wishlist
      .addCase(removeFromWishlist.pending, (state) => {
        state.wishlistLoading = true;
        state.wishlistError = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlistLoading = false;
        state.wishlist = state.wishlist.filter(
          item => item.wishId !== action.payload
        );
        state.message = 'Removed from wishlist successfully';
        state.wishlistSuccess = true;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.wishlistLoading = false;
        state.wishlistError = action.payload;
        state.wishlistSuccess = false;
      })
      .addCase(getProductByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(getProductByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const {
  clearError,
  clearSuccess,
  setSelectedProduct,
  filterProducts,
  resetFilteredProducts
} = productSlice.actions;

export default productSlice.reducer;
