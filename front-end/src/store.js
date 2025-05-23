import { configureStore } from "@reduxjs/toolkit"
import {
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers"
import { cartReducer } from "./reducers/cartReducers"
import { userLoginReducer } from "./reducers/userReducers"
import { userRegisterReducer } from "./reducers/userReducers"

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : []

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
}

export const store = configureStore({
  reducer: {
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
  },
  preloadedState: initialState,
})
