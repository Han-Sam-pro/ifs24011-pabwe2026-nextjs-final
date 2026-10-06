import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  asyncGetPosts,
  asyncGetPostById,
  asyncCreatePost,
  asyncUpdatePost,
  asyncUploadPostCover,
  asyncDeletePost,
  asyncToggleLikePost,
  asyncAddPostComment,
  asyncDeletePostComment,
  asyncDeleteAllPosts,
} from "../action";
import * as postApi from "../../api/postApi";

describe("posts async thunks", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("asyncGetPosts menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "getPosts").mockResolvedValue({ data: { posts: [{ id: 1 } as any] } } as any);
    const dispatch = vi.fn();
    const res = await asyncGetPosts(undefined)(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/getPosts/fulfilled");

    vi.spyOn(postApi, "getPosts").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncGetPosts(undefined)(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/getPosts/rejected");
  });

  it("asyncGetPostById menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "getPostById").mockResolvedValue({ data: { post: { id: 1 } as any } } as any);
    const dispatch = vi.fn();
    const res = await asyncGetPostById(1)(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/getPostById/fulfilled");

    vi.spyOn(postApi, "getPostById").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncGetPostById(1)(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/getPostById/rejected");
  });

  it("asyncCreatePost menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "createPost").mockResolvedValue({ data: { post_id: 1 } } as any);
    const dispatch = vi.fn();
    const res = await asyncCreatePost({ description: "Halo" })(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/createPost/fulfilled");

    vi.spyOn(postApi, "createPost").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncCreatePost({ description: "Halo" })(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/createPost/rejected");
  });

  it("asyncUpdatePost menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "updatePost").mockResolvedValue({ message: "Sukses" } as any);
    const dispatch = vi.fn();
    const res = await asyncUpdatePost({ id: 1, payload: { description: "Baru" } })(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/updatePost/fulfilled");

    vi.spyOn(postApi, "updatePost").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncUpdatePost({ id: 1, payload: { description: "Baru" } })(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/updatePost/rejected");
  });

  it("asyncUploadPostCover menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "uploadPostCover").mockResolvedValue({ message: "Sukses" } as any);
    const dispatch = vi.fn();
    const res = await asyncUploadPostCover({ id: 1, coverFile: new File([], "c.jpg") })(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/uploadPostCover/fulfilled");

    vi.spyOn(postApi, "uploadPostCover").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncUploadPostCover({ id: 1, coverFile: new File([], "c.jpg") })(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/uploadPostCover/rejected");
  });

  it("asyncDeletePost menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "deletePost").mockResolvedValue({ message: "Sukses" } as any);
    const dispatch = vi.fn();
    const res = await asyncDeletePost(1)(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/deletePost/fulfilled");

    vi.spyOn(postApi, "deletePost").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncDeletePost(1)(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/deletePost/rejected");
  });

  it("asyncToggleLikePost menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "toggleLikePost").mockResolvedValue({ message: "Sukses" } as any);
    const dispatch = vi.fn();
    const res = await asyncToggleLikePost({ id: 1, payload: { like: 1 } })(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/toggleLikePost/fulfilled");

    vi.spyOn(postApi, "toggleLikePost").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncToggleLikePost({ id: 1, payload: { like: 1 } })(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/toggleLikePost/rejected");
  });

  it("asyncAddPostComment dan asyncDeletePostComment menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "addPostComment").mockResolvedValue({ message: "Sukses" } as any);
    const dispatch = vi.fn();
    const resAdd = await asyncAddPostComment({ id: 1, payload: { comment: "Keren" } })(dispatch, () => ({}), undefined);
    expect(resAdd.type).toBe("posts/addPostComment/fulfilled");

    vi.spyOn(postApi, "addPostComment").mockRejectedValue(new Error("Gagal"));
    const failAdd = await asyncAddPostComment({ id: 1, payload: { comment: "Keren" } })(dispatch, () => ({}), undefined);
    expect(failAdd.type).toBe("posts/addPostComment/rejected");

    vi.spyOn(postApi, "deletePostComment").mockResolvedValue({ message: "Sukses" } as any);
    const resDel = await asyncDeletePostComment(1)(dispatch, () => ({}), undefined);
    expect(resDel.type).toBe("posts/deletePostComment/fulfilled");

    vi.spyOn(postApi, "deletePostComment").mockRejectedValue(new Error("Gagal"));
    const failDel = await asyncDeletePostComment(1)(dispatch, () => ({}), undefined);
    expect(failDel.type).toBe("posts/deletePostComment/rejected");
  });

  it("asyncDeleteAllPosts menangani sukses dan gagal", async () => {
    vi.spyOn(postApi, "deleteAllPosts").mockResolvedValue({ message: "Semua dihapus" } as any);
    const dispatch = vi.fn();
    const res = await asyncDeleteAllPosts()(dispatch, () => ({}), undefined);
    expect(res.type).toBe("posts/deleteAllPosts/fulfilled");

    vi.spyOn(postApi, "deleteAllPosts").mockRejectedValue(new Error("Gagal"));
    const failRes = await asyncDeleteAllPosts()(dispatch, () => ({}), undefined);
    expect(failRes.type).toBe("posts/deleteAllPosts/rejected");

  });
  it("menangani fallback pesan error default pada setiap thunk jika error.message kosong", async () => {
    const dispatch = vi.fn();

    vi.spyOn(postApi, "getPosts").mockRejectedValue({});
    const r1 = await asyncGetPosts(undefined)(dispatch, () => ({}), undefined);
    expect(r1.payload).toBe("Gagal memuat daftar postingan");

    vi.spyOn(postApi, "getPostById").mockRejectedValue({});
    const r2 = await asyncGetPostById(1)(dispatch, () => ({}), undefined);
    expect(r2.payload).toBe("Gagal memuat detail postingan");

    vi.spyOn(postApi, "createPost").mockRejectedValue({});
    const r3 = await asyncCreatePost({ description: "x" })(dispatch, () => ({}), undefined);
    expect(r3.payload).toBe("Gagal menambahkan postingan");

    vi.spyOn(postApi, "updatePost").mockRejectedValue({});
    const r4 = await asyncUpdatePost({ id: 1, payload: { description: "x" } })(dispatch, () => ({}), undefined);
    expect(r4.payload).toBe("Gagal memperbarui postingan");

    vi.spyOn(postApi, "uploadPostCover").mockRejectedValue({});
    const r5 = await asyncUploadPostCover({ id: 1, coverFile: new File([], "c.jpg") })(dispatch, () => ({}), undefined);
    expect(r5.payload).toBe("Gagal mengunggah cover postingan");

    vi.spyOn(postApi, "deletePost").mockRejectedValue({});
    const r6 = await asyncDeletePost(1)(dispatch, () => ({}), undefined);
    expect(r6.payload).toBe("Gagal menghapus postingan");

    vi.spyOn(postApi, "toggleLikePost").mockRejectedValue({});
    const r7 = await asyncToggleLikePost({ id: 1, payload: { like: 1 } })(dispatch, () => ({}), undefined);
    expect(r7.payload).toBe("Gagal memproses suka postingan");

    vi.spyOn(postApi, "addPostComment").mockRejectedValue({});
    const r8 = await asyncAddPostComment({ id: 1, payload: { comment: "x" } })(dispatch, () => ({}), undefined);
    expect(r8.payload).toBe("Gagal menambahkan komentar");

    vi.spyOn(postApi, "deletePostComment").mockRejectedValue({});
    const r9 = await asyncDeletePostComment(1)(dispatch, () => ({}), undefined);
    expect(r9.payload).toBe("Gagal menghapus komentar");

    vi.spyOn(postApi, "deleteAllPosts").mockRejectedValue({});
    const r10 = await asyncDeleteAllPosts()(dispatch, () => ({}), undefined);
    expect(r10.payload).toBe("Gagal menghapus semua postingan");
  });
});