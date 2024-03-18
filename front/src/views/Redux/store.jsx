import { configureStore } from "@reduxjs/toolkit"
import invitadosSlice from "./invitadosSlice"

const store = configureStore({
    reducer: {
        invitados: invitadosSlice
    }
});

export default store;