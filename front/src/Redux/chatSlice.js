import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messagesAI: []
};

export const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        sendMessage: (state, action) => {
            return {
                ...state,
                messagesAI: [
                    ...state.messagesAI,
                    {
                        text: action.payload.text,
                        sender: 'user',
                    }
                ]
            };
        },
        receiveMessage: (state, action) => {
            return {
                ...state,
                messagesAI: [
                    ...state.messagesAI,
                    {
                        text: action.payload.text,
                        sender: 'server',
                    }
                ]
            };
        }
    }
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;