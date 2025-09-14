import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.js"
import contractsSlice from "./slices/contractsSlice.js";
import uiSlice from "./slices/uiSlice.js";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    contracts: contractsSlice,
    ui: uiSlice,
  },
});