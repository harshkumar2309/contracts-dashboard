import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Check for existing token on app start
const token = localStorage.getItem("contractsapp_token");
if (token) {
  try {
    const userData = JSON.parse(
      localStorage.getItem("contractsapp_user") || "{}"
    );
    if (userData.username) {
      initialState.user = userData;
      initialState.isAuthenticated = true;
    }
  } catch (error) {
    localStorage.removeItem("contractsapp_token");
    localStorage.removeItem("contractsapp_user");
  }
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;

      // Store in localStorage
      localStorage.setItem("contractsapp_token", action.payload.token);
      localStorage.setItem("contractsapp_user", JSON.stringify(action.payload));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("contractsapp_token");
      localStorage.removeItem("contractsapp_user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;