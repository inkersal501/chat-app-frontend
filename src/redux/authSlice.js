import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLogin : true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateIsLogin : (state, action) => {
      state.isLogin = action.payload;
    },
    login: (state, action) => {
      state.user = {...state.user, ...action.payload};
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      state.chatWindow = null;
      localStorage.removeItem("user");
      localStorage.removeItem("chatWindow");
    }, 
  },
});
 
export const selectUser = (state) => state.auth.user;
export const selectIsLogin = (state) => state.auth.isLogin;
export const { login, logout, updateIsLogin } = authSlice.actions;
export default authSlice.reducer; 
