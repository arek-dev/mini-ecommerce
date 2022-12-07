import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { CategoriesReducer } from "./appSlice";
import { ProductReducer } from "./productSlice";
import { CurrencyReducer } from "./currencySlice";


const rootReducer = combineReducers({
    categories: CategoriesReducer,
    product: ProductReducer,
    currency: CurrencyReducer,
  });


export default configureStore({
    reducer: {
        rootReducer,
    },
})

