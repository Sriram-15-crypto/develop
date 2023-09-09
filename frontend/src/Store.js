import { configureStore } from "@reduxjs/toolkit"
import formreducer from './Slice/UserSlice'
import userReducer from './Slice/adminSlice'; // Import your user reducer

export const store = configureStore({
    reducer: {
        Forms:formreducer,
        user: userReducer,

    }
})



