import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    // aca esta la data para el state global
];

// idtemporal
let id = 1;

export const userSlice = createSlice({
    // Nombre
    name: "users",
    // Estado inicial
    initialState,
    // Logica
    reducers: {
        // ACTIONS => objects que tiene un Type y un payload
        // Type: UserLogin     PayLoad: los datos de acceso del user
        UserLogin: (state, action) => {
            // logeando al user
            const newLogin = {
                ...action.payload,
                id: id++
            }
            // para este reducer el state es el array vacio
            state.push(newLogin);
        },
        quitarInvitado: (state, action) => {
            //logica quitarInvitado
            // el return es para establecer un new state
            return state.filter((user) => user.id !== action.payload); //action.paylod es el id del user
        }
    }

});
//* destructuro las actions de invitadosSlice y las exporto
export const { UserLogin, quitarInvitado } = userSlice.actions;
//* exporto el reducer de invitadosSlice
export default userSlice.reducer;
