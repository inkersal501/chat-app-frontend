import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {...state.user, ...action.payload};
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }, 
  },
});
 
export const selectUser = (state) => state.auth.user;

export const { login, logout } = authSlice.actions;
export default authSlice.reducer; 
