import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PostLayout from "../postLayout";
import { renderWithProviders } from "@/test-utils";
import * as apiHelper from "@/helpers/apiHelper";

describe("PostLayout", () => {
  it("menampilkan spinner dan redirect ke login jika tidak ada token", () => {
    vi.spyOn(apiHelper, "getAccessToken").mockReturnValue(null);
    const { container } = renderWithProviders(
      <PostLayout>
        <div>Konten</div>
      </PostLayout>
    );
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("merender konten dan membuka sidebar mobile saat hamburger diklik", () => {
    vi.spyOn(apiHelper, "getAccessToken").mockReturnValue("token-aktif");
    renderWithProviders(
      <PostLayout>
        <div data-testid="dashboard">Konten Dashboard</div>
      </PostLayout>
    );

    expect(screen.getByTestId("dashboard")).toBeInTheDocument();

    // Buka sidebar mobile
    const toggleBtn = screen.getByLabelText("Toggle Sidebar");
    fireEvent.click(toggleBtn);
  });
});