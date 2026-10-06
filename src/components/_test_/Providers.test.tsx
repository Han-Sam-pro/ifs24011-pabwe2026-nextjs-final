import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Providers from "../providers";
import "@testing-library/jest-dom/vitest"; 

describe("Providers Component", () => {
  it("harus merender children di dalam Provider Redux", () => {
    render(
      <Providers>
        <div data-testid="child-element">Konten Uji Coba</div>
      </Providers>
    );

    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Konten Uji Coba")).toBeInTheDocument();
  });
});