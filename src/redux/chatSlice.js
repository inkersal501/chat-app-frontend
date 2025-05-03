import { createSlice } from "@reduxjs/toolkit";

const initialState =  JSON.parse(localStorage.getItem("chatWindow")) || { activeTab : "chats", activeChat: {} };

const chatSlice = createSlice({
    name: "chatWindow",
    initialState, 
    reducers: {
        updateSidebarActiveTab: (state, action) => {
            state.activeTab = action.payload;
            localStorage.setItem("chatWindow", JSON.stringify(state));
        },
        updateActiveChat: (state, action) => {
            state.activeChat = { ...action.payload};
            localStorage.setItem("chatWindow", JSON.stringify(state));
        }
    }
});

export const sidebarActiveTab = (state) => state.chatWindow.activeTab;
export const activeChat = (state) => state.chatWindow.activeChat;

export const { updateSidebarActiveTab, updateActiveChat } = chatSlice.actions;
export default chatSlice.reducer;