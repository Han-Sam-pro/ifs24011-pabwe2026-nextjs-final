import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AddModal from "../addModal";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as actionModule from "../../states/action";

describe("AddModal", () => {
  it("menangani input deskripsi dan submit berhasil", async () => {
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);
    const handleSuccess = vi.fn();
    const handleClose = vi.fn();

    vi.spyOn(actionModule, "asyncCreatePost").mockReturnValue({
      type: "posts/createPost/fulfilled",
      match: () => true,
    } as any);

    renderWithProviders(
      <AddModal isOpen={true} onClose={handleClose} onSuccess={handleSuccess} />
    );

    const textarea = screen.getByPlaceholderText(/bagikan pemikiran/i);
    fireEvent.change(textarea, { target: { value: "Postingan Baru Test" } });

    fireEvent.click(screen.getByRole("button", { name: /publikasikan/i }));

    await waitFor(() => {
      expect(successSpy).toHaveBeenCalled();
      expect(handleSuccess).toHaveBeenCalled();
      expect(handleClose).toHaveBeenCalled();
    });
  });
});