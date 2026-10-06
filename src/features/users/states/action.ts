import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, getUserProfile } from "../api/userApi";

export const asyncGetUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUsers();
      return response.data || [];
    } catch (err: any) {
      return rejectWithValue(err.message || "Gagal mengambil daftar pengguna");
    }
  }
);

export const asyncGetUserProfile = createAsyncThunk(
  "users/getUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserProfile();
      return response.data || null;
    } catch (err: any) {
      return rejectWithValue(err.message || "Gagal mengambil profil");
    }
  }
);