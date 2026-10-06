import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getAccessToken,
  putAccessToken,
  removeAccessToken,
  apiFetch,
} from "../apiHelper";

describe("apiHelper", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("menangani storage saat window tersedia", () => {
    expect(getAccessToken()).toBeNull();
    putAccessToken("token-123");
    expect(getAccessToken()).toBe("token-123");
    removeAccessToken();
    expect(getAccessToken()).toBeNull();
  });

  it("berhasil melakukan fetch dengan query params dan bearer token", async () => {
    putAccessToken("auth-token");
    const mockData = { status: "success", data: [] };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const res = await apiFetch("/posts", {
      params: { search: "test", page: 1, empty: "" },
    });

    expect(res).toEqual(mockData);
  });

  it("mendukung body bertipe FormData tanpa Content-Type json", async () => {
    const fd = new FormData();
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ status: "success" }),
    });

    await apiFetch("/posts/1/cover", {
      method: "POST",
      body: fd,
      requiresAuth: false,
    });

    const callArgs = (global.fetch as any).mock.calls[0][1];
    expect(callArgs.headers["Content-Type"]).toBeUndefined();
  });

  it("melempar error jika response not ok", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: "Request bermasalah" }),
    });

    await expect(apiFetch("/fail")).rejects.toThrow("Request bermasalah");
  });

  it("melempar error jaringan umum jika json gagal diparse", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Network Error"));
    await expect(apiFetch("/error")).rejects.toThrow("Network Error");
  });
});