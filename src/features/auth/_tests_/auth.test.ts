import { describe, it, expect, beforeEach, vi } from "vitest";
import authReducer, { resetAuthState } from "../states/reducer";
import { asyncLogin, asyncRegister, asyncLogout } from "../states/action";

describe("Auth Redux Slice", () => {
  const initialState = {
    isAuthLogin: false,
    isAuthRegister: false,
    isAuthLogout: true,
    user: null,
    loading: false,
    error: null,
  };

  it("harus mengembalikan state awal saat action tidak dikenali", () => {
    expect(authReducer(undefined, { type: "UNKNOWN_ACTION" })).toEqual(initialState);
  });

  it("harus mereset state auth saat action resetAuthState dipanggil", () => {
    const modifiedState = {
      ...initialState,
      isAuthRegister: true,
      error: "Error dummy",
      loading: true,
    };
    const nextState = authReducer(modifiedState, resetAuthState());
    expect(nextState.isAuthRegister).toBe(false);
    expect(nextState.error).toBeNull();
    expect(nextState.loading).toBe(false);
  });

  it("harus menangani asyncLogin.fulfilled dengan benar", () => {
    const mockUser = { id: 1, name: "Johan", email: "johan@example.com" };
    const nextState = authReducer(
      initialState,
      asyncLogin.fulfilled({ user: mockUser, token: "jwt-token" } as any, "requestId", {})
    );

    expect(nextState.loading).toBe(false);
    expect(nextState.isAuthLogin).toBe(true);
    expect(nextState.isAuthLogout).toBe(false);
    expect(nextState.user).toEqual(mockUser);
  });

  it("harus menangani asyncLogout.fulfilled dengan mereset status sesi", () => {
    const loggedInState = {
      ...initialState,
      isAuthLogin: true,
      isAuthLogout: false,
      user: { name: "User" },
    };
    const nextState = authReducer(
      loggedInState,
      asyncLogout.fulfilled(true, "requestId")
    );

    expect(nextState.isAuthLogin).toBe(false);
    expect(nextState.isAuthLogout).toBe(true);
    expect(nextState.user).toBeNull();
  });
});