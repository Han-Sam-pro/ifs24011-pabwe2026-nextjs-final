import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  uploadPostCover,
  deletePost,
  toggleLikePost,
  addPostComment,
  deletePostComment,
  deleteAllPosts,
} from "../api/postApi";
import {
  PostQueryParams,
  CreatePostPayload,
  UpdatePostPayload,
  AddLikePayload,
  AddCommentPayload,
} from "../types";

// 1. Mengambil seluruh daftar postingan
export const asyncGetPosts = createAsyncThunk(
  "posts/getPosts",
  async (params: PostQueryParams | undefined, { rejectWithValue }) => {
    try {
      const response = await getPosts(params);
      return response.data?.posts || [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal memuat daftar postingan");
    }
  }
);

// 2. Mengambil detail postingan berdasarkan ID
export const asyncGetPostById = createAsyncThunk(
  "posts/getPostById",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await getPostById(id);
      return response.data?.post || null;
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal memuat detail postingan");
    }
  }
);

// 3. Menambahkan postingan baru
export const asyncCreatePost = createAsyncThunk(
  "posts/createPost",
  async (payload: CreatePostPayload, { rejectWithValue }) => {
    try {
      const response = await createPost(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal menambahkan postingan");
    }
  }
);

// 4. Memperbarui deskripsi postingan
export const asyncUpdatePost = createAsyncThunk(
  "posts/updatePost",
  async (
    { id, payload }: { id: string | number; payload: UpdatePostPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await updatePost(id, payload);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal memperbarui postingan");
    }
  }
);

// 5. Mengunggah atau mengganti cover postingan
export const asyncUploadPostCover = createAsyncThunk(
  "posts/uploadPostCover",
  async (
    { id, coverFile }: { id: string | number; coverFile: File | FormData },
    { rejectWithValue }
  ) => {
    try {
      const response = await uploadPostCover(id, coverFile);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal mengunggah cover postingan");
    }
  }
);

// 6. Menghapus postingan tertentu
export const asyncDeletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await deletePost(id);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal menghapus postingan");
    }
  }
);

// 7. Memberikan / membatalkan suka (like/unlike)
export const asyncToggleLikePost = createAsyncThunk(
  "posts/toggleLikePost",
  async (
    { id, payload }: { id: string | number; payload: AddLikePayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await toggleLikePost(id, payload);
      return { id, like: payload.like, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal memproses suka postingan");
    }
  }
);

// 8. Menambahkan komentar pada postingan
export const asyncAddPostComment = createAsyncThunk(
  "posts/addPostComment",
  async (
    { id, payload }: { id: string | number; payload: AddCommentPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await addPostComment(id, payload);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal menambahkan komentar");
    }
  }
);

// 9. Menghapus komentar pengguna
export const asyncDeletePostComment = createAsyncThunk(
  "posts/deletePostComment",
  async (id: string | number, { rejectWithValue }) => {
    try {
      const response = await deletePostComment(id);
      return { id, message: response.message };
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal menghapus komentar");
    }
  }
);

// 10. Menghapus seluruh postingan milik pengguna
export const asyncDeleteAllPosts = createAsyncThunk(
  "posts/deleteAllPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await deleteAllPosts();
      return response.message;
    } catch (error: any) {
      return rejectWithValue(error.message || "Gagal menghapus semua postingan");
    }
  }
);