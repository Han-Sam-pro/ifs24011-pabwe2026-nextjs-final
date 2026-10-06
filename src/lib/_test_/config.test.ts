import { describe, it, expect } from "vitest";
import { CONFIG, DELCOM_BASEURL, APP_PORT } from "../config";

describe("lib/config", () => {
  it("harus mengekspor konstanta konfigurasi dengan tipe dan nilai yang valid", () => {
    expect(CONFIG).toBeDefined();
    expect(typeof DELCOM_BASEURL).toBe("string");
    expect(typeof APP_PORT).toBe("number");
    expect(DELCOM_BASEURL).toBe(CONFIG.DELCOM_BASEURL);
    expect(APP_PORT).toBe(CONFIG.APP_PORT);
  });
});