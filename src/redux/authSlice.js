import { createSlice } from "@reduxjs/toolkit";
import { defaultState } from "../js/config";

const initialState = {
  isLogin : defaultState.auth.isLogin,
  isLoggedin : false,
  user : null,
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
    },
    logout : (state) => {
      state.user = defaultState.auth.user;
      state.isLoggedin = defaultState.auth.isLoggedin; 
      localStorage.removeItem("isLoggedin");
      localStorage.removeItem("user");
    }, 
  },
});
 
export const selectIsLogin = (state) => state.auth.isLogin;
export const selectIsLoggedIn = (state) => state.auth.isLoggedin;
export const selectUser = (state) => state.auth.user;

export const { login, logout, updateIsLogin } = authSlice.actions;
export default authSlice.reducer; 
