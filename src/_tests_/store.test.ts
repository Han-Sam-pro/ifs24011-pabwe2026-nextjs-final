import { describe, it, expect } from "vitest";
import { store } from "../store";

describe("Redux Central Store", () => {
  it("harus memiliki reducer auth, users, dan posts yang terdaftar", () => {
    const state = store.getState();

    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("users");
    expect(state).toHaveProperty("posts");
  });

  it("harus dapat mengeksekusi dispatch aksi", () => {
    expect(typeof store.dispatch).toBe("function");
  });
});