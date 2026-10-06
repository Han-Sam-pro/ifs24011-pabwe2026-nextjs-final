"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncUploadPostCover } from "../states/action";
import { showSuccessDialog, showErrorDialog } from "@/helpers/toolsHelper";
import { FiImage, FiUploadCloud, FiX, FiLoader } from "react-icons/fi";

interface ChangeCoverModalProps {
  isOpen: boolean;
  postId: string | number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ChangeCoverModal({
  isOpen,
  postId,
  onClose,
  onSuccess,
}: ChangeCoverModalProps) {
  const dispatch = useAppDispatch();
  const { isPostChangeCover } = useAppSelector((state) => state.posts);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showErrorDialog("Ukuran berkas maksimal adalah 2 MB!");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showErrorDialog("Pilih berkas gambar cover terlebih dahulu!");
      return;
    }

    const result = await dispatch(
      asyncUploadPostCover({ id: postId, coverFile: selectedFile })
    );

    if (asyncUploadPostCover.fulfilled.match(result)) {
      handleClose();
      await showSuccessDialog("Cover postingan berhasil diperbarui!", "Berhasil");
      onSuccess();
    } else {
      showErrorDialog((result.payload as string) || "Gagal mengunggah cover");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <FiImage className="text-lg" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Ganti Cover Postingan</h3>
          </div>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
            <FiX className="text-xl" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl p-4 hover:border-blue-400 transition-colors relative">
            {previewUrl ? (
              <div className="relative h-44 w-full overflow-hidden rounded-xl">
                <Image
                  src={previewUrl}
                  alt="Preview Cover"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer py-6 w-full">
                <FiUploadCloud className="text-4xl text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700">Pilih berkas gambar</span>
                <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, JPEG (Maks. 2MB)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPostChangeCover || !selectedFile}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
            >
              {isPostChangeCover ? <FiLoader className="animate-spin" /> : "Unggah Cover"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}