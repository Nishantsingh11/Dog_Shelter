import { configureStore } from "@reduxjs/toolkit"
import { authSlice, dogSlice } from "./Slice"
const store = configureStore({
    reducer: {
        auth: authSlice,
        dogs: dogSlice
    }
})

export default store 