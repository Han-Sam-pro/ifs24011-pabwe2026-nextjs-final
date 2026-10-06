import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SidebarComponent from "../sidebarComponent";
import { renderWithProviders } from "@/test-utils";

describe("SidebarComponent", () => {
  it("menangani klik Semua Postingan dan tombol close mobile", () => {
    const handleClose = vi.fn();
    const handleFilter = vi.fn();

    renderWithProviders(
      <SidebarComponent
        isOpen={true}
        onClose={handleClose}
        activeFilter="all"
        onFilterChange={handleFilter}
      />
    );

    fireEvent.click(screen.getByText("Semua Postingan"));
    expect(handleFilter).toHaveBeenCalledWith("all");

    // Klik tombol X mobile
    const closeBtn = screen.getByText("Menu Utama").parentElement?.querySelector("button");
    if (closeBtn) fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});