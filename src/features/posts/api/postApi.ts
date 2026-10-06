import { apiFetch } from "@/helpers/apiHelper";
import {
  Post,
  PostQueryParams,
  CreatePostPayload,
  UpdatePostPayload,
  AddLikePayload,
  AddCommentPayload,
  PostApiResponse,
} from "../types";

/**
 * 1. Mengambil seluruh daftar postingan (GET /posts)
 *    Mendukung filter is_me=1 untuk postingan sendiri.
 */
export const getPosts = async (
  params?: PostQueryParams
): Promise<PostApiResponse<{ posts: Post[] }>> => {
  return await apiFetch<{ posts: Post[] }>("/posts", {
    method: "GET",
    params: params as Record<string, string | number | boolean | undefined | null>,
    requiresAuth: true,
  });
};

/**
 * 2. Mengambil detail postingan berdasarkan ID (GET /posts/:id)
 */
export const getPostById = async (
  id: string | number
): Promise<PostApiResponse<{ post: Post }>> => {
  return await apiFetch<{ post: Post }>(`/posts/${id}`, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 3. Menambahkan postingan baru (POST /posts)
 */
export const createPost = async (
  payload: CreatePostPayload
): Promise<PostApiResponse<{ post_id: number | string }>> => {
  return await apiFetch<{ post_id: number | string }>("/posts", {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

/**
 * 4. Memperbarui isi deskripsi postingan (PUT /posts/:id)
 */
export const updatePost = async (
  id: string | number,
  payload: UpdatePostPayload
): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

/**
 * 5. Mengunggah atau mengganti gambar cover postingan (POST /posts/:id/cover)
 */
export const uploadPostCover = async (
  id: string | number,
  coverFile: File | FormData
): Promise<PostApiResponse<null>> => {
  let body: FormData;

  if (coverFile instanceof FormData) {
    body = coverFile;
  } else {
    body = new FormData();
    body.append("cover", coverFile);
  }

  return await apiFetch<null>(`/posts/${id}/cover`, {
    method: "POST",
    body,
    requiresAuth: true,
  });
};

/**
 * 6. Menghapus postingan tertentu (DELETE /posts/:id)
 */
export const deletePost = async (
  id: string | number
): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>(`/posts/${id}`, {
    method: "DELETE",
    requiresAuth: true,
  });
};

/**
 * 7. Memberikan (1) atau membatalkan (0) suka/like (POST /posts/:id/likes)
 */
export const toggleLikePost = async (
  id: string | number,
  payload: AddLikePayload
): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>(`/posts/${id}/likes`, {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

/**
 * 8. Menambahkan komentar pada postingan (POST /posts/:id/comments)
 */
export const addPostComment = async (
  id: string | number,
  payload: AddCommentPayload
): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>(`/posts/${id}/comments`, {
    method: "POST",
    body: JSON.stringify(payload),
    requiresAuth: true,
  });
};

/**
 * 9. Menghapus komentar pengguna pada postingan tertentu (DELETE /posts/:id/comments)
 */
export const deletePostComment = async (
  id: string | number
): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>(`/posts/${id}/comments`, {
    method: "DELETE",
    requiresAuth: true,
  });
};

/**
 * 10. Menghapus seluruh postingan milik pengguna (DELETE /posts)
 */
export const deleteAllPosts = async (): Promise<PostApiResponse<null>> => {
  return await apiFetch<null>("/posts", {
    method: "DELETE",
    requiresAuth: true,
  });
};