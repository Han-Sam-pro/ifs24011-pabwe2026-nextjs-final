"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncUpdatePost } from "../states/action";
import { showSuccessDialog, showErrorDialog } from "@/helpers/toolsHelper";
import { FiEdit3, FiX, FiLoader } from "react-icons/fi";

interface ChangeModalProps {
  isOpen: boolean;
  postId: string | number;
  initialDescription: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangeModal({
  isOpen,
  postId,
  initialDescription,
  onClose,
  onSuccess,
}: ChangeModalProps) {
  const dispatch = useAppDispatch();
  const { isPostChange } = useAppSelector((state) => state.posts);
  const [description, setDescription] = useState(initialDescription);

  useEffect(() => {
    setDescription(initialDescription);
  }, [initialDescription]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showErrorDialog("Deskripsi tidak boleh kosong!");
      return;
    }

    const result = await dispatch(
      asyncUpdatePost({ id: postId, payload: { description } })
    );

    if (asyncUpdatePost.fulfilled.match(result)) {
      onClose();
      await showSuccessDialog("Deskripsi postingan berhasil diperbarui!", "Berhasil");
      onSuccess();
    } else {
      showErrorDialog((result.payload as string) || "Gagal mengubah postingan");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
              <FiEdit3 className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Ubah Deskripsi Postingan</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPostChange}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
            >
              {isPostChange ? <FiLoader className="animate-spin" /> : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}