import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RegisterPage from "../registerPage";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as actionModule from "../../states/action";

describe("RegisterPage", () => {
  it("menangani validasi kosong, validasi password tidak cocok, dan registrasi sukses", async () => {
    const errorSpy = vi.spyOn(toolsHelper, "showErrorDialog").mockResolvedValue({} as any);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);

    renderWithProviders(<RegisterPage />);
    const submitBtn = screen.getByRole("button", { name: /daftar akun/i });

    // Kosong
    fireEvent.click(submitBtn);
    expect(errorSpy).toHaveBeenCalledWith("Semua kolom formulir wajib diisi!");

    // Isi tidak cocok
    fireEvent.change(screen.getByPlaceholderText(/nama lengkap anda/i), { target: { value: "Budi" } });
    fireEvent.change(screen.getByPlaceholderText(/nama@email.com/i), { target: { value: "budi@mail.com" } });
    const pwds = screen.getAllByPlaceholderText(/••••••••/i);
    fireEvent.change(pwds[0], { target: { value: "123456" } });
    fireEvent.change(pwds[1], { target: { value: "654321" } });

    fireEvent.click(submitBtn);
    expect(errorSpy).toHaveBeenCalledWith("Konfirmasi kata sandi tidak cocok!");

    // Sukses
    fireEvent.change(pwds[1], { target: { value: "123456" } });
    vi.spyOn(actionModule, "asyncRegister").mockReturnValue({
      type: "auth/register/fulfilled",
      match: () => true,
    } as any);

    fireEvent.click(submitBtn);
    await waitFor(() => {
      expect(successSpy).toHaveBeenCalled();
    });
  });
});