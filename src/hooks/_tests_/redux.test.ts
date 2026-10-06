import { describe, it, expect, vi } from "vitest";
import * as reactRedux from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux";

describe("redux typed hooks", () => {
  it("useAppDispatch harus mereferensikan useDispatch dari react-redux", () => {
    expect(useAppDispatch).toBe(reactRedux.useDispatch);
  });

  it("useAppSelector harus mereferensikan useSelector dari react-redux", () => {
    expect(useAppSelector).toBe(reactRedux.useSelector);
  });
});