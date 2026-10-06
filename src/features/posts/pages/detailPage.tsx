"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  asyncGetPostById,
  asyncDeletePost,
  asyncToggleLikePost,
  asyncAddPostComment,
  asyncDeletePostComment,
} from "../states/action";
import {
  formatDate,
  showConfirmDialog,
  showSuccessDialog,
  showErrorDialog,
} from "@/helpers/toolsHelper";
import PostLayout from "../layouts/postLayout";
import ChangeModal from "../modals/changeModal";
import ChangeCoverModal from "../modals/changeCoverModal";
import {
  FiArrowLeft,
  FiHeart,
  FiMessageCircle,
  FiEdit3,
  FiImage,
  FiTrash2,
  FiSend,
  FiClock,
} from "react-icons/fi";

export default function DetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // ✅ AMAN DARI NULL & MENDUKUNG BAIK [id] MAUPUN [postId]
  const params = useParams();
  const id = (params?.postId || params?.id || "1") as string;

  const { post, isPost } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [commentText, setCommentText] = useState("");
  const [isChangeOpen, setIsChangeOpen] = useState(false);
  const [isCoverOpen, setIsCoverOpen] = useState(false);

  const fetchDetail = () => {
    if (id) dispatch(asyncGetPostById(id));
  };

  useEffect(() => {
    if (id) {
      fetchDetail();
    }
  }, [id]);

  // Cek kepemilikan postingan
  const isOwner =
    user && (user.id === post?.user_id || user.name === post?.author?.name);

  // Status Like pengguna saat ini
  const isLikedByMe =
    Array.isArray(post?.likes) &&
    post?.likes.some((likeId) => String(likeId) === String(user?.id));

  // Aksi Like / Unlike
  const handleToggleLike = async () => {
    if (!id) return;
    await dispatch(
      asyncToggleLikePost({ id, payload: { like: isLikedByMe ? 0 : 1 } })
    );
    fetchDetail();
  };

  // Aksi Tambah Komentar
  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !id) return;

    const result = await dispatch(
      asyncAddPostComment({ id, payload: { comment: commentText } })
    );

    if (asyncAddPostComment.fulfilled.match(result)) {
      setCommentText("");
      fetchDetail();
    } else {
      showErrorDialog(
        (result.payload as string) || "Gagal menambahkan komentar"
      );
    }
  };

  // Aksi Hapus Komentar
  const handleDeleteComment = async () => {
    if (!id) return;
    const confirmed = await showConfirmDialog(
      "Hapus komentar Anda?",
      "Konfirmasi Hapus"
    );
    if (confirmed) {
      const result = await dispatch(asyncDeletePostComment(id));
      if (asyncDeletePostComment.fulfilled.match(result)) {
        fetchDetail();
      }
    }
  };

  // Aksi Hapus Postingan
  const handleDeletePost = async () => {
    if (!id) return;
    const confirmed = await showConfirmDialog(
      "Apakah Anda yakin ingin menghapus postingan ini?",
      "Hapus Postingan",
      "Ya, Hapus",
      "Batal"
    );

    if (confirmed) {
      const result = await dispatch(asyncDeletePost(id));
      if (asyncDeletePost.fulfilled.match(result)) {
        await showSuccessDialog("Postingan telah dihapus.", "Sukses");
        router.replace("/");
      }
    }
  };

  if (isPost || !post) {
    return (
      <PostLayout>
        <div className="flex justify-center items-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
      </PostLayout>
    );
  }

  return (
    <PostLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigasi Kembali */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <FiArrowLeft className="text-base" />
          <span>Kembali ke Linimasa</span>
        </button>

        {/* Kartu Utama Detail Postingan */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {/* Cover Gambar */}
          {post.cover && (
            <div className="relative h-64 sm:h-96 w-full bg-slate-100">
              <Image
                src={post.cover}
                alt="Cover Postingan"
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-6">
            {/* Author Header & Aksi Pemilik */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base">
                  {post.author?.name
                    ? post.author.name.charAt(0).toUpperCase()
                    : "U"}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                    {post.author?.name || "Anonim"}
                  </h3>
                  <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                    <FiClock /> {formatDate(post.created_at)}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi jika postingan milik sendiri */}
              {isOwner && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsCoverOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                  >
                    <FiImage /> Cover
                  </button>
                  <button
                    onClick={() => setIsChangeOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                  >
                    <FiEdit3 /> Edit
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold"
                  >
                    <FiTrash2 /> Hapus
                  </button>
                </div>
              )}
            </div>

            {/* Isi Deskripsi */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line">
              {post.description}
            </p>

            {/* Tombol Interaksi Suka */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-4">
              <button
                onClick={handleToggleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isLikedByMe
                    ? "bg-red-50 text-red-600 border border-red-200 shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <FiHeart className={isLikedByMe ? "fill-red-600" : ""} />
                <span>
                  {Array.isArray(post.likes) ? post.likes.length : 0} Suka
                </span>
              </button>

              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <FiMessageCircle />
                <span>
                  {Array.isArray(post.comments) ? post.comments.length : 0}{" "}
                  Komentar
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bagian Komentar */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
            Komentar Komunitas
          </h4>

          {/* Form Kirim Komentar */}
          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tulis tanggapan atau komentar Anda..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold transition-all"
            >
              <FiSend />
              <span className="hidden sm:inline">Kirim</span>
            </button>
          </form>

          {/* Daftar Komentar */}
          <div className="space-y-3 pt-2">
            {post.my_comment && (
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-blue-900">
                    Komentar Anda
                  </p>
                  <p className="text-xs text-slate-700 mt-1">
                    {post.my_comment.comment}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {formatDate(post.my_comment.created_at)}
                  </span>
                </div>
                <button
                  onClick={handleDeleteComment}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Hapus komentar"
                >
                  <FiTrash2 className="text-sm" />
                </button>
              </div>
            )}

            {Array.isArray(post.comments) &&
              post.comments.length === 0 &&
              !post.my_comment && (
                <p className="text-xs text-slate-400 text-center py-4">
                  Belum ada komentar pada postingan ini.
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Modal Ubah Deskripsi */}
      <ChangeModal
        isOpen={isChangeOpen}
        postId={post.id}
        initialDescription={post.description}
        onClose={() => setIsChangeOpen(false)}
        onSuccess={fetchDetail}
      />

      {/* Modal Ubah Cover */}
      <ChangeCoverModal
        isOpen={isCoverOpen}
        postId={post.id}
        onClose={() => setIsCoverOpen(false)}
        onSuccess={fetchDetail}
      />
    </PostLayout>
  );
}