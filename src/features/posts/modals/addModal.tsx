"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncCreatePost } from "../states/action";
import { showSuccessDialog, showErrorDialog } from "@/helpers/toolsHelper";
import { FiPlus, FiX, FiLoader } from "react-icons/fi";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddModal({ isOpen, onClose, onSuccess }: AddModalProps) {
  const dispatch = useAppDispatch();
  const { isPostAdd } = useAppSelector((state) => state.posts);
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      showErrorDialog("Deskripsi postingan tidak boleh kosong!");
      return;
    }

    const result = await dispatch(asyncCreatePost({ description }));
    if (asyncCreatePost.fulfilled.match(result)) {
      setDescription("");
      onClose();
      await showSuccessDialog("Postingan berhasil dipublikasikan!", "Sukses");
      onSuccess();
    } else {
      showErrorDialog((result.payload as string) || "Gagal membuat postingan");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <FiPlus className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Buat Postingan Baru</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Isi Deskripsi Postingan
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bagikan pemikiran, wawasan, atau pengumuman Anda..."
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
              disabled={isPostAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
            >
              {isPostAdd ? <FiLoader className="animate-spin" /> : "Publikasikan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}