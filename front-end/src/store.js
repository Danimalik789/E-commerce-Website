import { configureStore } from "@reduxjs/toolkit";
import { productListReducer } from "./reducers/productReducers";

export const store = configureStore({
    reducer: {
        productList: productListReducer 
    }
}) 

