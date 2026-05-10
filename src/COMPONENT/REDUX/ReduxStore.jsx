import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./CartSlice"
import CategoryNameSlice from "./ProductSlice"


export let reduxStore = configureStore({

    reducer : {
        cartSlice,
        CategoryNameSlice
    }



})

