import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {id: 1, nombre: "Cesar", apellido: "Ausa"},
    {id: 2, nombre: "Nico", apellido: "Ausa"},
    {id: 3, nombre: "Leo", apellido: "Ausa"},
    {id: 4, nombre: "Karolina", apellido: "Villanueva"},
]

export const invitadosSlice = createSlice({
    //* Nombre
    name: "invitados",
    //* Estado Inicial
    initialState,
    //* Logica
    reducers: {
        //* actions
        agregarInvitado: (state, action) => {
            console.log(state);
            console.log(action);
        },
        quitarInvitado: (state, action) => {

        }
    }
});
//* invitadosSlice = { actions: { agregarInvitado, quitarInvitado }, reducer }
export const { agregarInvitado, quitarInvitado } = invitadosSlice.actions;
export default invitadosSlice.reducer;