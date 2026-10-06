import { describe, it, expect, vi, beforeEach } from "vitest";
import * as apiHelper from "@/helpers/apiHelper";
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
} from "../postApi";

describe("features/posts/api/postApi", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("getPosts harus memanggil apiFetch GET dengan query params is_me", async () => {
    const mockRes = { status: "success", data: { posts: [] } };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes);

    const result = await getPosts({ is_me: 1 });
    expect(spy).toHaveBeenCalledWith("/posts", {
      method: "GET",
      params: { is_me: 1 },
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("getPostById harus memanggil apiFetch GET dengan ID yang tepat", async () => {
    const mockRes = { status: "success", data: { post: { id: 5 } } };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await getPostById(5);
    expect(spy).toHaveBeenCalledWith("/posts/5", {
      method: "GET",
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("createPost harus mengirimkan POST dengan payload JSON description", async () => {
    const payload = { description: "Deskripsi postingan" };
    const mockRes = { status: "success", data: { post_id: 6 } };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await createPost(payload);
    expect(spy).toHaveBeenCalledWith("/posts", {
      method: "POST",
      body: JSON.stringify(payload),
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("updatePost harus mengirimkan PUT dengan payload JSON description", async () => {
    const payload = { description: "Deskripsi diedit" };
    const mockRes = { status: "success", message: "Berhasil mengubah data" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await updatePost(6, payload);
    expect(spy).toHaveBeenCalledWith("/posts/6", {
      method: "PUT",
      body: JSON.stringify(payload),
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("uploadPostCover harus mendukung parameter berupa instance File", async () => {
    const mockFile = new File(["dummy content"], "cover.jpg", { type: "image/jpeg" });
    const mockRes = { status: "success", message: "Berhasil mengubah cover" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await uploadPostCover(1, mockFile);
    expect(spy).toHaveBeenCalledWith("/posts/1/cover", {
      method: "POST",
      body: expect.any(FormData),
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("uploadPostCover harus mendukung parameter berupa instance FormData langsung", async () => {
    const formData = new FormData();
    formData.append("cover", new File(["test"], "test.png", { type: "image/png" }));
    const mockRes = { status: "success", message: "Berhasil mengubah cover" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await uploadPostCover(1, formData);
    expect(spy).toHaveBeenCalledWith("/posts/1/cover", {
      method: "POST",
      body: formData,
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("deletePost harus memanggil DELETE /posts/:id", async () => {
    const mockRes = { status: "success", message: "Berhasil menghapus data" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await deletePost(1);
    expect(spy).toHaveBeenCalledWith("/posts/1", {
      method: "DELETE",
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("toggleLikePost harus memanggil POST /posts/:id/likes dengan payload like", async () => {
    const payload = { like: 1 as const };
    const mockRes = { status: "success", message: "Berhasil mengubah status suka" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await toggleLikePost(1, payload);
    expect(spy).toHaveBeenCalledWith("/posts/1/likes", {
      method: "POST",
      body: JSON.stringify(payload),
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("addPostComment harus memanggil POST /posts/:id/comments dengan payload comment", async () => {
    const payload = { comment: "Keren sekali!" };
    const mockRes = { status: "success", message: "Berhasil memberikan komentar" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await addPostComment(1, payload);
    expect(spy).toHaveBeenCalledWith("/posts/1/comments", {
      method: "POST",
      body: JSON.stringify(payload),
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("deletePostComment harus memanggil DELETE /posts/:id/comments", async () => {
    const mockRes = { status: "success", message: "Berhasil menghapus komentar" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await deletePostComment(1);
    expect(spy).toHaveBeenCalledWith("/posts/1/comments", {
      method: "DELETE",
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });

  it("deleteAllPosts harus memanggil DELETE /posts", async () => {
    const mockRes = { status: "success", message: "Berhasil menghapus semua data postingan" };
    const spy = vi.spyOn(apiHelper, "apiFetch").mockResolvedValue(mockRes as any);

    const result = await deleteAllPosts();
    expect(spy).toHaveBeenCalledWith("/posts", {
      method: "DELETE",
      requiresAuth: true,
    });
    expect(result).toEqual(mockRes);
  });
});