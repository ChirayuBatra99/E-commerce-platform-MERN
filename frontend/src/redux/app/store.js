import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cartSlice";

// create store
const store = configureStore({
    reducer:{
        allCart:cartSlice
    }
})

export default  store