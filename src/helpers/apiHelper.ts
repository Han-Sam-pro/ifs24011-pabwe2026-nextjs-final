const TOKEN_KEY = "DELCOM_ACCESS_TOKEN";
const BASE_URL =
  process.env.NEXT_PUBLIC_DELCOM_BASEURL || "https://open-api.delcom.org";

/**
 * Mengambil token autentikasi dari localStorage
 */
export const getAccessToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Menyimpan token autentikasi ke localStorage
 */
export const putAccessToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Menghapus token autentikasi dari localStorage
 */
export const removeAccessToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
};

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  requiresAuth?: boolean;
}

export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  data?: T;
  [key: string]: any;
}

/**
 * Wrapper HTTP Fetch untuk REST API Delcom
 */
export const apiFetch = async <T = any>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<ApiResponse<T>> => {
  const { params, requiresAuth = true, headers = {}, ...customOptions } = options;

  // 1. Bangun URL dengan Query Parameters
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = new URL(`${BASE_URL}${normalizedEndpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // 2. Siapkan Request Headers & Bearer Token Otomatis
  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...(headers as Record<string, string>),
  };

  // Set default Content-Type jika bukan FormData
  if (!(customOptions.body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  // 3. Eksekusi Request
  try {
    const response = await fetch(url.toString(), {
      ...customOptions,
      headers: requestHeaders,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage =
        data.message || `Request gagal dengan status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data as ApiResponse<T>;
  } catch (error: any) {
    throw new Error(error.message || "Terjadi kesalahan jaringan.");
  }
};