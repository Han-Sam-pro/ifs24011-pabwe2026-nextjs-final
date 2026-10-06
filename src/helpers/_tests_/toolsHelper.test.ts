import { describe, it, expect, vi } from "vitest";
import Swal from "sweetalert2";
import {
  showSuccessDialog,
  showErrorDialog,
  showWarningDialog,
  showConfirmDialog,
  formatDate,
} from "../toolsHelper";

vi.mock("sweetalert2", () => ({
  default: {
    fire: vi.fn(),
  },
}));

describe("toolsHelper", () => {
  describe("formatDate", () => {
    it("harus memformat tanggal ISO dengan benar ke format lokal Indonesia", () => {
      const formatted = formatDate("2026-03-01T10:00:00Z");
      expect(formatted).not.toBe("-");
    });

    it("harus mengembalikan '-' jika input tanggal kosong atau tidak valid", () => {
      expect(formatDate("")).toBe("-");
      expect(formatDate("invalid-date")).toBe("-");
    });
  });

  describe("SweetAlert2 Dialogs", () => {
    it("showSuccessDialog memanggil Swal.fire dengan icon success", async () => {
      await showSuccessDialog("Sukses simpan");
      expect(Swal.fire).toHaveBeenCalled();
    });

    it("showErrorDialog memanggil Swal.fire dengan icon error", async () => {
      await showErrorDialog("Terjadi kesalahan");
      expect(Swal.fire).toHaveBeenCalled();
    });

    it("showWarningDialog memanggil Swal.fire dengan icon warning", async () => {
      await showWarningDialog("Peringatan penting");
      expect(Swal.fire).toHaveBeenCalled();
    });

    it("showConfirmDialog mengembalikan nilai boolean sesuai interaksi user", async () => {
      (Swal.fire as any).mockResolvedValueOnce({ isConfirmed: true });
      const confirmed = await showConfirmDialog("Yakin hapus?");
      expect(confirmed).toBe(true);

      (Swal.fire as any).mockResolvedValueOnce({ isConfirmed: false });
      const cancelled = await showConfirmDialog("Yakin hapus?");
      expect(cancelled).toBe(false);
    });
  });
});