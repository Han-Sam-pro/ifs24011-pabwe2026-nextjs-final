import { describe, it, expect, vi } from "vitest";
import { asyncGetUsers, asyncGetUserProfile } from "../action";
import * as userApi from "../../api/userApi";

describe("users action thunks", () => {
  it("asyncGetUsers menangani sukses dan gagal", async () => {
    vi.spyOn(userApi, "getUsers").mockResolvedValue({ data: [{ id: 1, name: "User" }] } as any);
    const dispatch = vi.fn();
    const res = await asyncGetUsers()(dispatch, () => ({}), undefined);
    expect(res.type).toBe("users/getUsers/fulfilled");

    vi.spyOn(userApi, "getUsers").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncGetUsers()(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("users/getUsers/rejected");
  });

  it("asyncGetUserProfile menangani sukses dan gagal", async () => {
    vi.spyOn(userApi, "getUserProfile").mockResolvedValue({ data: { id: 1, name: "Me" } } as any);
    const dispatch = vi.fn();
    const res = await asyncGetUserProfile()(dispatch, () => ({}), undefined);
    expect(res.type).toBe("users/getUserProfile/fulfilled");

    vi.spyOn(userApi, "getUserProfile").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncGetUserProfile()(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("users/getUserProfile/rejected");
  });

  it("menangani fallback pesan error default jika err.message kosong", async () => {
    const dispatch = vi.fn();

    vi.spyOn(userApi, "getUsers").mockRejectedValue({});
    const r1 = await asyncGetUsers()(dispatch, () => ({}), undefined);
    expect(r1.payload).toBe("Gagal mengambil daftar pengguna");

    vi.spyOn(userApi, "getUserProfile").mockRejectedValue({});
    const r2 = await asyncGetUserProfile()(dispatch, () => ({}), undefined);
    expect(r2.payload).toBe("Gagal mengambil profil");
  });
});