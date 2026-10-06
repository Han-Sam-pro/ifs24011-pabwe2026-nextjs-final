import { describe, it, expect } from "vitest";
import { store } from "./store";

describe("Redux Store Terpusat", () => {
  it("memiliki reducer auth, users, dan posts", () => {
    const state = store.getState();
    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("users");
    expect(state).toHaveProperty("posts");
  });
});