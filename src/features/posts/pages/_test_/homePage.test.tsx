import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import HomePage from "../homePage";
import { renderWithProviders } from "@/test-utils";
import * as apiHelper from "@/helpers/apiHelper";
import * as toolsHelper from "@/helpers/toolsHelper";
import * as postApi from "../../api/postApi";
import * as actionModule from "../../states/action";

describe("HomePage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("menangani pencarian, buka modal tambah, dan hapus semua postingan", async () => {
    vi.spyOn(apiHelper, "getAccessToken").mockReturnValue("valid-token");
    const confirmSpy = vi.spyOn(toolsHelper, "showConfirmDialog").mockResolvedValue(true);
    const successSpy = vi.spyOn(toolsHelper, "showSuccessDialog").mockResolvedValue({} as any);

    const mockPosts = [
      {
        id: 1,
        description: "Postingan 1",
        author: { name: "Penulis" },
        likes: [],
        comments: [],
        created_at: "2026-03-01T00:00:00Z",
      },
    ];

    vi.spyOn(postApi, "getPosts").mockResolvedValue({
      status: "success",
      data: { posts: mockPosts },
    } as any);

    vi.spyOn(actionModule, "asyncDeleteAllPosts").mockReturnValue({
      type: "posts/deleteAllPosts/fulfilled",
      match: () => true,
    } as any);

    renderWithProviders(<HomePage />, {
      preloadedState: {
        posts: {
          posts: mockPosts,
          isPost: false,
        } as any,
      },
    });

    expect(await screen.findByText("Postingan 1")).toBeInTheDocument();

    // 1. Live search
    const searchInput = screen.getByPlaceholderText(/cari postingan/i);
    fireEvent.change(searchInput, { target: { value: "Postingan 1" } });
    expect(screen.getByText("Postingan 1")).toBeInTheDocument();

    // 2. Klik Tambah Postingan
    fireEvent.click(screen.getByText("Tambah Postingan"));
    expect(screen.getByText("Buat Postingan Baru")).toBeInTheDocument();

    // 3. Tab Postingan Saya & Hapus Semua
    fireEvent.click(screen.getByText("Postingan Saya"));
    const deleteBtn = await screen.findByText("Hapus Semua");
    fireEvent.click(deleteBtn);

    await waitFor(() => {
      expect(confirmSpy).toHaveBeenCalled();
      expect(successSpy).toHaveBeenCalled();
    });
  });
});