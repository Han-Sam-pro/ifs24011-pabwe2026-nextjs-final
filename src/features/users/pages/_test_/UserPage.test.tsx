import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import UsersPage from "../UserPage";
import { renderWithProviders } from "@/test-utils";

describe("UsersPage", () => {
  it("merender judul Direktori Pengguna", () => {
    renderWithProviders(<UsersPage />);
    expect(screen.getByText("Direktori Pengguna")).toBeInTheDocument();
  });
});