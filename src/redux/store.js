import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CategoriesReducer } from "./appSlice";
import { ProductReducer } from "./productSlice";
import { CurrencyReducer } from "./currencySlice";
import { CartReducer } from "./cartSlice";

const rootReducer = combineReducers({
  categories: CategoriesReducer,
  product: ProductReducer,
  currency: CurrencyReducer,
  cart: CartReducer,
});

export default configureStore({
  reducer: {
    rootReducer,
  },
});
