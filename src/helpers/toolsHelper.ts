import Swal from "sweetalert2";

/**
 * Menampilkan dialog notifikasi sukses
 */
export const showSuccessDialog = async (
  message: string,
  title: string = "Berhasil!"
) => {
  return Swal.fire({
    icon: "success",
    title,
    text: message,
    confirmButtonColor: "#2563eb", // Tailwind blue-600
  });
};

/**
 * Menampilkan dialog notifikasi error
 */
export const showErrorDialog = async (
  message: string,
  title: string = "Gagal!"
) => {
  return Swal.fire({
    icon: "error",
    title,
    text: message,
    confirmButtonColor: "#ef4444", // Tailwind red-500
  });
};

/**
 * Menampilkan dialog notifikasi peringatan
 */
export const showWarningDialog = async (
  message: string,
  title: string = "Perhatian!"
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text: message,
    confirmButtonColor: "#f59e0b", // Tailwind amber-500
  });
};

/**
 * Menampilkan dialog konfirmasi interaktif
 */
export const showConfirmDialog = async (
  message: string,
  title: string = "Konfirmasi Tindakan",
  confirmButtonText: string = "Ya, Lanjutkan",
  cancelButtonText: string = "Batal"
): Promise<boolean> => {
  const result = await Swal.fire({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#2563eb",
    cancelButtonColor: "#64748b",
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
  });

  return result.isConfirmed;
};

/**
 * Memformat string ISO / timestamp tanggal menjadi format lokal Indonesia
 */
export const formatDate = (
  dateInput: string | number | Date,
  options?: Intl.DateTimeFormatOptions
): string => {
  if (!dateInput) return "-";

  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "-";

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  return new Intl.DateTimeFormat("id-ID", defaultOptions).format(date);
};