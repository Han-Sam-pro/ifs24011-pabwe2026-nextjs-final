import { Post, User } from "./index";

// === Auth Payloads ===
export interface LoginPayload {
  email?: string;
  username?: string;
  password?: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AuthSuccessPayload {
  token: string;
  user: User;
}

// === Posts Payloads ===
export interface CreatePostPayload {
  description: string;
}

export interface UpdatePostPayload {
  description: string;
}

export interface ToggleLikePayload {
  like: 1 | 0;
}

export interface AddCommentPayload {
  comment: string;
}

export interface UploadCoverPayload {
  id: string | number;
  coverFile: File | FormData;
}

// === Action Result Wrapper ===
export interface AsyncActionResult<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}