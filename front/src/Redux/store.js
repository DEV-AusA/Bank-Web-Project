import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

// Store global
const store = configureStore({
    reducer: {
        users: userSlice
        //aca puedo agregar mas reducers
    }
});

export default store