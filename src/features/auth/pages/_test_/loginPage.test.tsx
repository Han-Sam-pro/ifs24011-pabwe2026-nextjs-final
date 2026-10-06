import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginPage from "../loginPage";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as actionModule from "../../states/action";

describe("LoginPage", () => {
  it("mencegah submit jika kolom kosong dan memanggil asyncLogin saat terisi", async () => {
    const errorSpy = vi.spyOn(toolsHelper, "showErrorDialog").mockResolvedValue({} as any);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);

    renderWithProviders(<LoginPage />);

    // 1. Submit kosong
    const submitBtn = screen.getByRole("button", { name: /masuk sekarang/i });
    fireEvent.click(submitBtn);
    expect(errorSpy).toHaveBeenCalled();

    // 2. Isi form & submit berhasil
    fireEvent.change(screen.getByPlaceholderText(/nama@email.com/i), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/••••••••/i), {
      target: { value: "password123" },
    });

    vi.spyOn(actionModule, "asyncLogin").mockReturnValue({
      type: "auth/login/fulfilled",
      match: () => true,
    } as any);

    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(successSpy).toHaveBeenCalled();
    });
  });
});