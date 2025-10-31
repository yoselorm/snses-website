import { configureStore } from "@reduxjs/toolkit";
import customerReducer from './redux/AuthSlice';
import productReducer from './redux/ProductSlice'
import categoryReducer from "./redux/CategorySlice";
import blogReducer from './redux/BlogSlice'





const store = configureStore({
    reducer:{
        customer: customerReducer,
        products: productReducer,
        categories: categoryReducer,
        blogs: blogReducer
    }
})

export default store;