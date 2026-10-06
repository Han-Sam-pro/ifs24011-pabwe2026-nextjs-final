import { describe, it, expect, vi } from "vitest";
import { asyncLogin, asyncRegister, asyncLogout } from "../action";
import * as authApi from "../../api/authApi";
import * as apiHelper from "@/helpers/apiHelper";

describe("auth actions", () => {
  it("asyncLogin sukses menyimpan token", async () => {
    vi.spyOn(authApi, "postLogin").mockResolvedValue({
      data: { token: "token-jwt", user: { name: "User" } },
    } as any);
    const putSpy = vi.spyOn(apiHelper, "putAccessToken");

    const dispatch = vi.fn();
    const thunk = asyncLogin({ email: "a@b.com", password: "123" });
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(putSpy).toHaveBeenCalledWith("token-jwt");
    expect(result.type).toBe("auth/login/fulfilled");
  });

  it("asyncLogin gagal me-reject with value", async () => {
    vi.spyOn(authApi, "postLogin").mockRejectedValue(new Error("Login gagal"));
    const dispatch = vi.fn();
    const thunk = asyncLogin({ email: "a@b.com", password: "123" });
    const result = await thunk(dispatch, () => ({}), undefined);

    expect(result.type).toBe("auth/login/rejected");
    expect(result.payload).toBe("Login gagal");
  });

  it("asyncRegister sukses dan gagal menangani rejectWithValue", async () => {
    vi.spyOn(authApi, "postRegister").mockResolvedValue({ data: { user: { id: 1 } } } as any);
    const dispatch = vi.fn();
    const thunk = asyncRegister({ name: "A", email: "a@b.com", password: "123" });
    const resSuccess = await thunk(dispatch, () => ({}), undefined);
    expect(resSuccess.type).toBe("auth/register/fulfilled");

    vi.spyOn(authApi, "postRegister").mockRejectedValue(new Error("Email sudah terdaftar"));
    const resFail = await thunk(dispatch, () => ({}), undefined);
    expect(resFail.type).toBe("auth/register/rejected");
  });

  it("asyncLogout menghapus token", async () => {
    const removeSpy = vi.spyOn(apiHelper, "removeAccessToken");
    const dispatch = vi.fn();
    await asyncLogout()(dispatch, () => ({}), undefined);
    expect(removeSpy).toHaveBeenCalled();
  });
}); 