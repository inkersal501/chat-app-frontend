import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../js/config";

const initialState = {
  isLogin : defaultState.auth.isLogin,
  isLoggedin : localStorage.getItem("isLoggedin") || defaultState.auth.isLoggedin,
  user : JSON.parse(localStorage.getItem("user")) || defaultState.auth.user,  
};

const authSlice = createSlice({
  name : "auth",
  initialState,
  reducers : {
    updateIsLogin : (state, action) => {
      state.isLogin = action.payload;
    },
    login : (state, action) => {
      state.user = {...state.user, ...action.payload};
      state.isLoggedin = true;
      localStorage.setItem("isLoggedin", JSON.stringify(state.isLoggedin));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout : (state) => {
      state.user = defaultState.auth.user;
      state.isLoggedin = defaultState.auth.isLoggedin; 
    }, 
  },
});
 
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectIsLoggedIn = (state) => state.auth.isLoggedin;
export const selectUser = (state) => state.auth.user;

export const { login, logout, updateIsLogin } = authSlice.actions;
export default authSlice.reducer; 
