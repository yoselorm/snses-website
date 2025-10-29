import { configureStore } from "@reduxjs/toolkit";
import customerReducer from './redux/AuthSlice';
import productReducer from './redux/ProductSlice'




const store = configureStore({
    reducer:{
        customer: customerReducer,
        products: productReducer
    }
})

export default store;