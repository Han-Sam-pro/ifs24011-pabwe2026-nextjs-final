import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DetailPage from "../detailPage";
import { renderWithProviders } from "@/test-utils";
import * as apiHelper from "@/helpers/apiHelper";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as postApi from "../../api/postApi";
import * as actionModule from "../../states/action";

describe("DetailPage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  const mockPost = {
    id: "1",
    user_id: 1,
    cover: "https://example.com/cover.jpg",
    description: "Deskripsi Detail Postingan",
    author: { name: "Penulis Delcom" },
    likes: [1],
    comments: [{ id: 1, comment: "Komentar lain", created_at: "2026-03-01T00:00:00Z" }],
    my_comment: { id: 2, comment: "Komentar Saya", created_at: "2026-03-01T00:00:00Z" },
    created_at: "2026-03-01T00:00:00Z",
    updated_at: "2026-03-01T00:00:00Z",
  };

  it("merender dan mengeksekusi seluruh interaksi (Like, Komentar, Edit, Cover, Hapus Postingan)", async () => {
    vi.spyOn(apiHelper, "getAccessToken").mockReturnValue("valid-token");
    vi.spyOn(toolsHelper, "showConfirmDialog").mockResolvedValue(true);
    vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);

    vi.spyOn(postApi, "getPostById").mockResolvedValue({
      status: "success",
      data: { post: mockPost },
    } as any);

    vi.spyOn(actionModule, "asyncToggleLikePost").mockReturnValue({
      type: "posts/toggleLikePost/fulfilled",
      match: () => true,
    } as any);

    vi.spyOn(actionModule, "asyncAddPostComment").mockReturnValue({
      type: "posts/addPostComment/fulfilled",
      match: () => true,
    } as any);

    vi.spyOn(actionModule, "asyncDeletePostComment").mockReturnValue({
      type: "posts/deletePostComment/fulfilled",
      match: () => true,
    } as any);

    vi.spyOn(actionModule, "asyncDeletePost").mockReturnValue({
      type: "posts/deletePost/fulfilled",
      match: () => true,
    } as any);

    renderWithProviders(<DetailPage />, {
      preloadedState: {
        posts: {
          post: mockPost,
          posts: [],
          isPost: false,
        } as any,
        auth: {
          user: { id: 1, name: "Penulis Delcom" },
        } as any,
      },
    });

    expect(await screen.findByText("Deskripsi Detail Postingan")).toBeInTheDocument();

    // 1. Klik Like
    const likeBtn = screen.getByText(/Suka/i);
    fireEvent.click(likeBtn);

    // 2. Kirim Komentar
    const commentInput = screen.getByPlaceholderText(/tulis tanggapan/i);
    fireEvent.change(commentInput, { target: { value: "Komentar Baru" } });
    fireEvent.click(screen.getByRole("button", { name: /kirim/i }));

    // 3. Hapus Komentar Sendiri
    const deleteCommentBtn = screen.getByTitle("Hapus komentar");
    fireEvent.click(deleteCommentBtn);

    // 4. Buka Modal Edit & Modal Cover
    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    fireEvent.click(screen.getByRole("button", { name: /cover/i }));

    // 5. Klik Tombol Kembali
    fireEvent.click(screen.getByText("Kembali ke Linimasa"));

    // 6. Klik Hapus Postingan
    fireEvent.click(screen.getByRole("button", { name: /^hapus$/i }));

    await waitFor(() => {
      expect(toolsHelper.showConfirmDialog).toHaveBeenCalled();
      expect(toolsHelper.showSuccessDialog).toHaveBeenCalled();
    });
  });
});