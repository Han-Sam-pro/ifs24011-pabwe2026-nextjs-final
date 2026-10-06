import { describe, it, expect, vi } from "vitest";
import { asyncLogin, asyncRegister, asyncLogout } from "../action";
import * as authApi from "../../api/authApi";
import * as apiHelper from "@/helpers/apiHelper";

describe("auth actions", () => {
  it("asyncLogin menangani token, accessToken, dan fallback error tanpa message", async () => {
    // 1. Menggunakan response.data.accessToken
    vi.spyOn(authApi, "postLogin").mockResolvedValue({
      data: { accessToken: "jwt-alt" },
    } as any);
    const putSpy = vi.spyOn(apiHelper, "putAccessToken");
    const dispatch = vi.fn();

    await asyncLogin({ email: "a@b.com", password: "123" })(dispatch, () => ({}), undefined);
    expect(putSpy).toHaveBeenCalledWith("jwt-alt");

    // 2. Error tanpa message
    vi.spyOn(authApi, "postLogin").mockRejectedValue({});
    const failRes = await asyncLogin({ email: "a@b.com", password: "123" })(dispatch, () => ({}), undefined);
    expect(failRes.payload).toBe("Gagal melakukan autentikasi");
  });

  it("asyncRegister menangani sukses dan fallback error tanpa message", async () => {
    vi.spyOn(authApi, "postRegister").mockResolvedValue({ data: { id: 1 } } as any);
    const dispatch = vi.fn();
    const res = await asyncRegister({ name: "A", email: "a@b.com", password: "123" })(dispatch, () => ({}), undefined);
    expect(res.type).toBe("auth/register/fulfilled");

    vi.spyOn(authApi, "postRegister").mockRejectedValue({});
    const failRes = await asyncRegister({ name: "A", email: "a@b.com", password: "123" })(dispatch, () => ({}), undefined);
    expect(failRes.payload).toBe("Gagal melakukan registrasi");
  });

  it("asyncLogout memanggil removeAccessToken", async () => {
    const removeSpy = vi.spyOn(apiHelper, "removeAccessToken");
    const dispatch = vi.fn();
    await asyncLogout()(dispatch, () => ({}), undefined);
    expect(removeSpy).toHaveBeenCalled();
  });
});