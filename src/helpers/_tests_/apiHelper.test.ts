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

  it("menangani kondisi jika window bernilai undefined (SSR)", () => {
    const originalWindow = global.window;
    // @ts-ignore
    delete global.window;

    expect(getAccessToken()).toBeNull();
    putAccessToken("token");
    removeAccessToken();

    global.window = originalWindow;
  });

  it("menangani storage normal di lingkungan browser", () => {
    expect(getAccessToken()).toBeNull();
    putAccessToken("token-123");
    expect(getAccessToken()).toBe("token-123");
    removeAccessToken();
    expect(getAccessToken()).toBeNull();
  });

  it("melakukan fetch dengan query params, token, dan tanpa token", async () => {
    // 1. Dengan token
    putAccessToken("auth-token");
    const mockData = { status: "success", data: [] };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const res = await apiFetch("posts", {
      params: { search: "test", page: 1, empty: "" },
    });
    expect(res).toEqual(mockData);

    // 2. Tanpa token di storage
    removeAccessToken();
    await apiFetch("/posts");
  });

  it("mendukung body FormData dan FormData tanpa authorization", async () => {
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

  it("melempar error jika response not ok dengan dan tanpa pesan json", async () => {
    // Dengan pesan
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: "Pesan error API" }),
    });
    await expect(apiFetch("/fail")).rejects.toThrow("Pesan error API");

    // Tanpa pesan (status fallback)
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({}),
    });
    await expect(apiFetch("/fail500")).rejects.toThrow("Request gagal dengan status 500");
  });

  it("melempar error jika terjadi exception jaringan tanpa error.message", async () => {
    global.fetch = vi.fn().mockRejectedValue({});
    await expect(apiFetch("/error")).rejects.toThrow("Terjadi kesalahan jaringan.");
  });
});