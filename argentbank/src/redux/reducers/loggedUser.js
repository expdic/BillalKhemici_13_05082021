
import { createSlice } from "@reduxjs/toolkit";

const userParDefault = { token: "", isAuthenticated: false };
let userStateValue = userParDefault;
if (JSON.parse(localStorage.getItem("token"))) {
  userStateValue = {
    token: JSON.parse(localStorage.getItem("token")).token,
    isAuthenticated: JSON.parse(localStorage.getItem("token")).isAuthenticated,
  };
}

const userSlice = createSlice({
  name: "userStatus",
  initialState: {
    value: userStateValue,
  },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = userParDefault;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;