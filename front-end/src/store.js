import { configureStore } from "@reduxjs/toolkit"
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
}

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
  preloadedState: initialState,
})
