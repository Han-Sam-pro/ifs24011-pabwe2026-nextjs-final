import { apiFetch } from "@/helpers/apiHelper";
import { LoginPayload, RegisterPayload, UserProfile } from "../types";

export interface AuthResponse {
  token?: string;
  accessToken?: string;
  user?: UserProfile;
  [key: string]: any;
}

/**
 * Endpoint login pengguna: POST /auth/login
 */
export const postLogin = async (payload: LoginPayload) => {
  return await apiFetch<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: false,
  });
};

/**
 * Endpoint registrasi pengguna baru: POST /auth/register
 */
export const postRegister = async (payload: RegisterPayload) => {
  return await apiFetch<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: false,
  });
};