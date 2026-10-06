import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChangeModal from "../changeModal";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as actionModule from "../../states/action";

describe("ChangeModal", () => {
  it("menangani pembaruan deskripsi berhasil dan gagal jika kosong", async () => {
    const errorSpy = vi.spyOn(toolsHelper, "showErrorDialog").mockResolvedValue({} as any);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);
    const handleSuccess = vi.fn();

    vi.spyOn(actionModule, "asyncUpdatePost").mockReturnValue({
      type: "posts/updatePost/fulfilled",
      match: () => true,
    } as any);

    renderWithProviders(
      <ChangeModal
        isOpen={true}
        postId={1}
        initialDescription="Awal"
        onClose={vi.fn()}
        onSuccess={handleSuccess}
      />
    );

    const textarea = screen.getByDisplayValue("Awal");

    // 1. Kosongkan & submit
    fireEvent.change(textarea, { target: { value: "" } });
    fireEvent.click(screen.getByRole("button", { name: /simpan perubahan/i }));
    expect(errorSpy).toHaveBeenCalled();

    // 2. Isi & submit sukses
    fireEvent.change(textarea, { target: { value: "Edit Berhasil" } });
    fireEvent.click(screen.getByRole("button", { name: /simpan perubahan/i }));

    await waitFor(() => {
      expect(successSpy).toHaveBeenCalled();
      expect(handleSuccess).toHaveBeenCalled();
    });
  });
});