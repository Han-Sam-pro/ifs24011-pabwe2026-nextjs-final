import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types";
import { asyncLogin, asyncRegister, asyncLogout } from "./action";

const initialState: AuthState = {
  isAuthLogin: false,
  isAuthRegister: false,
  isAuthLogout: true,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.isAuthRegister = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthLogin = true;
        state.isAuthLogout = false;
        state.user = action.payload?.user || null;
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // REGISTER
    builder
      .addCase(asyncRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthRegister = false;
      })
      .addCase(asyncRegister.fulfilled, (state) => {
        state.loading = false;
        state.isAuthRegister = true;
      })
      .addCase(asyncRegister.rejected, (state, action) => {
        state.loading = false;
        state.isAuthRegister = false;
        state.error = action.payload as string;
      });

    // LOGOUT
    builder.addCase(asyncLogout.fulfilled, (state) => {
      state.isAuthLogin = false;
      state.isAuthLogout = true;
      state.user = null;
    });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;