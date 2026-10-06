/**
 * Konfigurasi konstanta aplikasi terpusat
 */
export const CONFIG = {
  DELCOM_BASEURL:
    process.env.NEXT_PUBLIC_DELCOM_BASEURL || "https://open-api.delcom.org",
  APP_PORT: parseInt(process.env.APP_PORT || "3000", 10),
} as const;

export const DELCOM_BASEURL = CONFIG.DELCOM_BASEURL;
export const APP_PORT = CONFIG.APP_PORT;