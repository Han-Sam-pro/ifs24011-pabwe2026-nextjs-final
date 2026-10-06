import { useState, ChangeEvent } from "react";

type HTMLInputElementTypes =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement;

export interface UseInputReturn<T = string> {
  value: T;
  onChange: (e: ChangeEvent<HTMLInputElementTypes> | T) => void;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  reset: () => void;
  bind: {
    value: T;
    onChange: (e: ChangeEvent<HTMLInputElementTypes> | T) => void;
  };
}

/**
 * Custom Hook untuk mengelola state input form & two-way binding
 */
export function useInput<T = string>(initialValue: T): UseInputReturn<T> {
  const [value, setValue] = useState<T>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElementTypes> | T) => {
    if (e && typeof e === "object" && "target" in e) {
      setValue(e.target.value as unknown as T);
    } else {
      setValue(e as T);
    }
  };

  const reset = () => setValue(initialValue);

  return {
    value,
    onChange,
    setValue,
    reset,
    bind: {
      value,
      onChange,
    },
  };
}