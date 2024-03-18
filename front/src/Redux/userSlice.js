import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // aca esta la data para el state global
    userDataLogin: {},
    userDataAppointments: [],
    usersData: [],
    usersAppointments: []
};

export const userSlice = createSlice({
    // Nombre del reducer del store
    name: "users",
    // Estado inicial
    initialState,
    // Logica
    reducers: {
        // ACTIONS => objects que tiene un Type y un payload
        // Type: UserLogin     PayLoad: los datos de acceso del user
        UserLogin: (state, action) => {
            // ACTION = {type: UserLogin, payload: {...}}
            state.userDataLogin = action.payload;
        },
        //* LO QUE LLEGA en el action SIEMPRE ES UN OBJECT y DENTRO ESTAN LAS PROPIEDADES type y payload
        UserAppointments: (state, action) => {
            // ACTION = {type: UserAppointments, payload: {...}}
            state.userDataAppointments = action.payload;
        },
        UsersData: (state, action) => {
            state.usersData = action.payload;
        },
        AppointmentsData: (state, action) => {
            state.usersAppointments = action.payload;
        }
    }

});
//* destructuro las actions de invitadosSlice y las exporto
export const { UserLogin, UserAppointments, UsersData, AppointmentsData } = userSlice.actions;
//* exporto el reducer de invitadosSlice
export default userSlice.reducer;
