import { describe, it, expect } from "vitest";
import usersReducer, { resetUsersState } from "../reducer";
import { asyncGetUsers, asyncGetUserProfile } from "../action";

describe("usersReducer", () => {
  const initial = { users: [], user: null, loading: false, error: null };

  it("resetUsersState mereset state", () => {
    const dirty = { users: [{ id: 1 } as any], user: { id: 1 } as any, loading: true, error: "Ada error" };
    const res = usersReducer(dirty, resetUsersState());
    expect(res.users).toEqual([]);
    expect(res.user).toBeNull();
    expect(res.error).toBeNull();
  });

  it("menangani asyncGetUsers (pending, fulfilled, rejected)", () => {
    let state = usersReducer(initial, { type: asyncGetUsers.pending.type });
    expect(state.loading).toBe(true);

    state = usersReducer(state, {
      type: asyncGetUsers.fulfilled.type,
      payload: [{ id: 1, name: "A" }],
    });
    expect(state.users.length).toBe(1);

    state = usersReducer(state, {
      type: asyncGetUsers.rejected.type,
      payload: "Gagal memuat",
    });
    expect(state.error).toBe("Gagal memuat");
  });

  it("menangani asyncGetUserProfile.fulfilled", () => {
    const state = usersReducer(initial, {
      type: asyncGetUserProfile.fulfilled.type,
      payload: { id: 1, name: "Saya" },
    });
    expect(state.user?.name).toBe("Saya");
  });
});