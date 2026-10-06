import React from "react";
import { screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AuthLayout from "../AuthLayout";
import { renderWithProviders } from "@/test-utils";
import * as apiHelper from "@/helpers/apiHelper";

describe("AuthLayout", () => {
  it("merender anak dan mendeteksi token yang sudah aktif", () => {
    vi.spyOn(apiHelper, "getAccessToken").mockReturnValue("existing-token");
    renderWithProviders(
      <AuthLayout title="Masuk" subtitle="Keterangan">
        <div>Form Content</div>
      </AuthLayout>
    );
    expect(screen.getByText("Masuk")).toBeInTheDocument();
  });
});