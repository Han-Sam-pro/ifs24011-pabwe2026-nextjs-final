import { describe, it, expect, vi } from "vitest";
import * as apiHelper from "@/helpers/apiHelper";
import { getUsers, getUserProfile } from "../userApi";

describe("userApi", () => {
  it("getUsers memanggil GET /users", async () => {
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue({ data: [] } as any);
    await getUsers();
    expect(spy).toHaveBeenCalledWith("/users", { method: "GET" });
  });

  it("getUserProfile memanggil GET /users/me", async () => {
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue({ data: {} } as any);
    await getUserProfile();
    expect(spy).toHaveBeenCalledWith("/users/me", { method: "GET" });
  });
});