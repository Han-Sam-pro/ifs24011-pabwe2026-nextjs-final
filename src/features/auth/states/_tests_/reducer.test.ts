import { describe, it, expect } from "vitest";
import authReducer, { resetAuthState } from "../reducer";
import { asyncLogin, asyncRegister, asyncLogout } from "../action";

describe("authReducer", () => {
  const initial = {
    isAuthLogin: false,
    isAuthRegister: false,
    isAuthLogout: true,
    user: null,
    loading: false,
    error: null,
  };

  it("mengembalikan initial state jika aksi tidak dikenali", () => {
    expect(authReducer(undefined, { type: "UNKNOWN" })).toEqual(initial);
  });

  it("resetAuthState mengembalikan flag registrasi dan error ke awal", () => {
    const dirty = { ...initial, isAuthRegister: true, error: "Ada error", loading: true };
    const res = authReducer(dirty, resetAuthState());
    expect(res.isAuthRegister).toBe(false);
    expect(res.error).toBeNull();
  });

  it("menangani asyncLogin (pending, fulfilled, rejected)", () => {
    let state = authReducer(initial, { type: asyncLogin.pending.type });
    expect(state.loading).toBe(true);

    state = authReducer(state, {
      type: asyncLogin.fulfilled.type,
      payload: { user: { name: "Tester" } },
    });
    expect(state.isAuthLogin).toBe(true);
    expect(state.user?.name).toBe("Tester");

    state = authReducer(state, {
      type: asyncLogin.rejected.type,
      payload: "Gagal login",
    });
    expect(state.loading).toBe(false);
    expect(state.error).toBe("Gagal login");
  });

  it("menangani asyncRegister (pending, fulfilled, rejected)", () => {
    let state = authReducer(initial, { type: asyncRegister.pending.type });
    expect(state.loading).toBe(true);

    state = authReducer(state, { type: asyncRegister.fulfilled.type });
    expect(state.isAuthRegister).toBe(true);

    state = authReducer(state, {
      type: asyncRegister.rejected.type,
      payload: "Email sudah dipakai",
    });
    expect(state.isAuthRegister).toBe(false);
    expect(state.error).toBe("Email sudah dipakai");
  });

  it("menangani asyncLogout.fulfilled", () => {
    const loggedIn = { ...initial, isAuthLogin: true, isAuthLogout: false, user: { name: "A" } };
    const state = authReducer(loggedIn, { type: asyncLogout.fulfilled.type });
    expect(state.isAuthLogin).toBe(false);
    expect(state.isAuthLogout).toBe(true);
    expect(state.user).toBeNull();
  });
});