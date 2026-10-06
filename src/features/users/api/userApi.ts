import { apiFetch } from "@/helpers/apiHelper";
import { User, ApiResult } from "@/types";

export const getUsers = async (): Promise<ApiResult<User[]>> => {
  return await apiFetch<User[]>("/users", { method: "GET" });
};

export const getUserProfile = async (): Promise<ApiResult<User>> => {
  return await apiFetch<User>("/users/me", { method: "GET" });
};