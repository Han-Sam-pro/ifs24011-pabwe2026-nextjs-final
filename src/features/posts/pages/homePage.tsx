"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncGetPosts, asyncDeleteAllPosts } from "../states/action";
import { formatDate, showConfirmDialog, showSuccessDialog, showErrorDialog } from "@/helpers/toolsHelper";
import PostLayout from "../layouts/postLayout";
import AddModal from "../modals/addModal";
import { FiPlus, FiSearch, FiHeart, FiMessageCircle, FiTrash2, FiClock } from "react-icons/fi";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { posts, isPost } = useAppSelector((state) => state.posts);

  const [activeFilter, setActiveFilter] = useState<"all" | "me">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchPosts = () => {
    dispatch(asyncGetPosts(activeFilter === "me" ? { is_me: 1 } : undefined));
  };

  useEffect(() => {
    fetchPosts();
  }, [activeFilter]);

  const handleDeleteAll = async () => {
    const confirmed = await showConfirmDialog(
      "Apakah Anda yakin ingin menghapus SEMUA postingan milik Anda?",
      "Hapus Semua Postingan",
      "Ya, Hapus Semua",
      "Batal"
    );

    if (confirmed) {
      const result = await dispatch(asyncDeleteAllPosts());
      if (asyncDeleteAllPosts.fulfilled.match(result)) {
        await showSuccessDialog("Seluruh postingan Anda telah dihapus.", "Sukses");
        fetchPosts();
      } else {
        showErrorDialog((result.payload as string) || "Gagal menghapus postingan");
      }
    }
  };

  // Filter pencarian live (client-side)
  const filteredPosts = posts.filter(
    (post) =>
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PostLayout activeFilter={activeFilter} onFilterChange={setActiveFilter}>
      {/* Kontrol Atas: Filter Tab, Search, & Tombol Tambah */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
          <input
            type="text"
            placeholder="Cari postingan atau penulis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {activeFilter === "me" && posts.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-red-200 text-red-600 bg-red-50/50 hover:bg-red-100 text-xs font-semibold transition-colors"
            >
              <FiTrash2 />
              <span>Hapus Semua</span>
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm transition-all"
          >
            <FiPlus className="text-base" />
            <span>Tambah Postingan</span>
          </button>
        </div>
      </div>

      {/* Daftar Postingan / Timeline Grid */}
      {isPost ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-slate-200/70 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-400 text-sm">Tidak ada postingan yang ditemukan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all overflow-hidden"
            >
              {/* Cover Gambar */}
              <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                {post.cover ? (
                  <Image
                    src={post.cover}
                    alt="Cover"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-400 text-xs font-medium">
                    Tanpa Cover
                  </div>
                )}
              </div>

              {/* Konten Card */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="h-7 w-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                      {post.author?.name ? post.author.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight">
                        {post.author?.name || "Anonim"}
                      </h4>
                      <p className="text-[10px] text-slate-400 flex items-center gap-1">
                        <FiClock className="text-[9px]" />
                        {formatDate(post.created_at)}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mt-2">
                    {post.description}
                  </p>
                </div>

                {/* Footer Card: Likes & Comments */}
                <div className="flex items-center gap-4 pt-4 mt-2 border-t border-slate-100 text-slate-500 text-xs font-medium">
                  <span className="flex items-center gap-1.5">
                    <FiHeart className="text-sm text-red-500" />
                    {Array.isArray(post.likes) ? post.likes.length : 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FiMessageCircle className="text-sm text-blue-500" />
                    {Array.isArray(post.comments) ? post.comments.length : 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Modal Tambah Postingan */}
      <AddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchPosts}
      />
    </PostLayout>
  );
}