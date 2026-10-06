import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ProfilePage from "../profilePage";
import { renderWithProviders } from "@/test-utils";

describe("ProfilePage", () => {
  it("merender profil dengan data fallback jika user null", () => {
    renderWithProviders(<ProfilePage />, {
      preloadedState: {
        auth: { user: null } as any,
      },
    });
    expect(screen.getByText("Nama Pengguna")).toBeInTheDocument();
    expect(screen.getByText("email@delcom.org")).toBeInTheDocument();
  });
});