import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useInput } from "../useInput";
import { ChangeEvent } from "react";

describe("useInput Hook", () => {
  it("harus menginisialisasi nilai awal dengan benar", () => {
    const { result } = renderHook(() => useInput("awal"));
    expect(result.current.value).toBe("awal");
  });

  it("harus mengubah nilai melalui event change", () => {
    const { result } = renderHook(() => useInput(""));
    act(() => {
      result.current.onChange({
        target: { value: "halo" },
      } as ChangeEvent<HTMLInputElement>);
    });
    expect(result.current.value).toBe("halo");
  });

  it("harus mengubah nilai secara langsung tanpa event object", () => {
    const { result } = renderHook(() => useInput(""));
    act(() => {
      result.current.onChange("langsung" as any);
    });
    expect(result.current.value).toBe("langsung");
  });

  it("harus mereset nilai kembali ke initial value", () => {
    const { result } = renderHook(() => useInput("default"));
    act(() => {
      result.current.setValue("berubah");
    });
    expect(result.current.value).toBe("berubah");

    act(() => {
      result.current.reset();
    });
    expect(result.current.value).toBe("default");
  });
});