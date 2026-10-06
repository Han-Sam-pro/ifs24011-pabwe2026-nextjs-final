import { describe, it, expect, vi } from "vitest";
import * as apiHelper from "@/helpers/apiHelper";
import { postLogin, postRegister } from "../authApi";

describe("authApi", () => {
  it("postLogin memanggil /auth/login dengan method POST", async () => {
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue({ success: true } as any);
    await postLogin({ email: "a@b.com", password: "123" });
    expect(spy).toHaveBeenCalledWith("/auth/login", expect.objectContaining({ method: "POST" }));
  });

  it("postRegister memanggil /auth/register dengan method POST", async () => {
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue({ success: true } as any);
    await postRegister({ name: "User", email: "a@b.com", password: "123" });
    expect(spy).toHaveBeenCalledWith("/auth/register", expect.objectContaining({ method: "POST" }));
  });
});