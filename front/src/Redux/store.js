import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import chatSlice from "./chatSlice";

// Store global
const store = configureStore({
    reducer: {
        users: userSlice,
        chat: chatSlice,
        //aca puedo agregar mas reducers
    }
});

export default store