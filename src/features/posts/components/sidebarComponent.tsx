"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiGrid, FiUserCheck, FiUsers, FiUser, FiX } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilter?: string;
  onFilterChange?: (filter: "all" | "me") => void;
}

export default function SidebarComponent({
  isOpen,
  onClose,
  activeFilter = "all",
  onFilterChange,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Backdrop Drawer Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer / Sidebar Shell */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 border-r border-slate-200 bg-white p-4 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile Header Sidebar */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 lg:hidden mb-4">
          <span className="font-bold text-slate-800 text-sm">Menu Utama</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
          >
            <FiX className="text-xl" />
          </button>
        </div>

        {/* Menu Navigasi */}
        <nav className="space-y-1.5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Postingan
          </p>

          <button
            type="button"
            onClick={() => {
              onFilterChange?.("all");
              onClose();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
              pathname === "/" && activeFilter === "all"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FiGrid className="text-base" />
            <span>Semua Postingan</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onFilterChange?.("me");
              onClose();
            }}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all ${
              pathname === "/" && activeFilter === "me"
                ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <FiUserCheck className="text-base" />
            <span>Postingan Saya</span>
          </button>

          <div className="pt-4">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Jaringan & Profil
            </p>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <FiUsers className="text-base" />
              <span>Daftar Pengguna</span>
            </Link>

            <Link
              href="/"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <FiUser className="text-base" />
              <span>Profil Saya</span>
            </Link>
          </div>
        </nav>
      </aside>
    </>
  );
}