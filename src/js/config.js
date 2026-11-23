import axios from "axios";

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;
const socketEndpoint = import.meta.env.VITE_SOCKET_BASE_URL;

axios.defaults.withCredentials = true;
axios.defaults.timeout = 15000;

const defaultState = {
    auth : {
        isLoggedin: false,
        user: null,
        isLogin : true
    },
    chatWindow : {
        activeTab : "chat", 
        activeChat: { id: null, username: null }, 
        refreshChatlist: false 
    }
};

export {apiEndpoint, socketEndpoint, defaultState};
