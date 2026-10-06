import { createAsyncThunk } from "@reduxjs/toolkit";
import { postLogin, postRegister } from "../api/authApi";
import { LoginPayload, RegisterPayload } from "../types";
import { putAccessToken, removeAccessToken } from "@/helpers/apiHelper";

export const asyncLogin = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await postLogin(payload);
      const token = response.data?.token || response.data?.accessToken;
      if (token) {
        putAccessToken(token);
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal melakukan autentikasi");
    }
  }
);

export const asyncRegister = createAsyncThunk(
  "auth/register",
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const response = await postRegister(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal melakukan registrasi");
    }
  }
);

export const asyncLogout = createAsyncThunk("auth/logout", async () => {
  removeAccessToken();
  return true;
});