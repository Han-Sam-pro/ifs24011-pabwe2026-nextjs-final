import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/types";
import { asyncGetUsers, asyncGetUserProfile } from "./action";

export interface UsersState {
  users: User[];
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  user: null,
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsersState: (state) => {
      state.users = [];
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncGetUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(asyncGetUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(asyncGetUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(asyncGetUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { resetUsersState } = usersSlice.actions;
export default usersSlice.reducer;