import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import NavbarComponent from "../navbarComponents";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";

describe("NavbarComponent", () => {
  it("membuka dropdown dan memproses konfirmasi logout", async () => {
    const confirmSpy = vi.spyOn(toolsHelper, "showConfirmDialog").mockResolvedValue(true);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);

    renderWithProviders(<NavbarComponent onToggleSidebar={vi.fn()} />, {
      preloadedState: {
        auth: { user: { name: "User Sesi", email: "test@mail.com" } } as any,
      },
    });

    // Buka dropdown profil
    const profileBtn = screen.getByText("User Sesi").closest("button");
    fireEvent.click(profileBtn!);

    // Klik tombol Keluar
    const logoutBtn = screen.getByText("Keluar Akun");
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled();
      expect(successSpy).toHaveBeenCalled();
    });
  });
});