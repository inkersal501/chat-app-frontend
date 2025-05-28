import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../js/config";

let initialState;

const savedState = localStorage.getItem("chatWindow");
if (savedState) {
  initialState = JSON.parse(savedState);
} else {
  initialState = { ...defaultState.chatWindow };
  localStorage.setItem("chatWindow", JSON.stringify(initialState));
}
const chatSlice = createSlice({
    name : "chatWindow",
    initialState, 
    reducers : {
        updateSidebarActiveTab : (state, action) => {
            state.activeTab = action.payload;
            localStorage.setItem("chatWindow", JSON.stringify(state));
        },
        updateActiveChat : (state, action) => {
            state.activeChat = { ...action.payload};
            localStorage.setItem("chatWindow", JSON.stringify(state));
        },
        updateRefreshChatlist : (state, action) => {
            state.refreshChatlist = action.payload;
            localStorage.setItem("chatWindow", JSON.stringify(state));
        }, 
        resetDefault : (state) => {
            state.activeTab = defaultState.chatWindow.activeTab;
            state.activeChat = defaultState.chatWindow.activeChat;
            state.refreshChatlist = defaultState.chatWindow.refreshChatlist; 
            localStorage.setItem("chatWindow", JSON.stringify(state));
            return state;
        }
    }
});

export const sidebarActiveTab = (state) => state.chatWindow.activeTab;
export const activeChat = (state) => state.chatWindow.activeChat;
export const refreshChatlist = (state) => state.chatWindow.refreshChatlist;

export const { updateSidebarActiveTab, updateActiveChat, updateRefreshChatlist, resetDefault } = chatSlice.actions;
export default chatSlice.reducer;