import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChangeCoverModal from "../changeCoverModal";
import { renderWithProviders } from "@/test-utils";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as actionModule from "../../states/action";

describe("ChangeCoverModal", () => {
  it("menangani seleksi gambar, validasi ukuran, dan unggah cover", async () => {
    const errorSpy = vi.spyOn(toolsHelper, "showErrorDialog").mockResolvedValue({} as any);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);
    const handleSuccess = vi.fn();

    vi.spyOn(actionModule, "asyncUploadPostCover").mockReturnValue({
      type: "posts/uploadPostCover/fulfilled",
      match: () => true,
    } as any);

    global.URL.createObjectURL = vi.fn().mockReturnValue("blob://preview");

    renderWithProviders(
      <ChangeCoverModal isOpen={true} postId={1} onClose={vi.fn()} onSuccess={handleSuccess} />
    );

    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;

    // File terlalu besar (> 2MB)
    const largeFile = new File(["x".repeat(3 * 1024 * 1024)], "large.png", { type: "image/png" });
    Object.defineProperty(largeFile, "size", { value: 3 * 1024 * 1024 });
    fireEvent.change(fileInput, { target: { files: [largeFile] } });
    expect(errorSpy).toHaveBeenCalledWith("Ukuran berkas maksimal adalah 2 MB!");

    // File valid
    const validFile = new File(["sample"], "valid.png", { type: "image/png" });
    Object.defineProperty(validFile, "size", { value: 500 * 1024 });
    fireEvent.change(fileInput, { target: { files: [validFile] } });

    // Submit unggah
    fireEvent.click(screen.getByRole("button", { name: /unggah cover/i }));

    await waitFor(() => {
      expect(successSpy).toHaveBeenCalled();
      expect(handleSuccess).toHaveBeenCalled();
    });
  });
});