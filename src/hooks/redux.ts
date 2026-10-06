import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store";

/**
 * Hook Dispatch yang sudah memiliki tipe AppDispatch
 */
export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Hook Selector yang sudah memiliki tipe RootState
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;