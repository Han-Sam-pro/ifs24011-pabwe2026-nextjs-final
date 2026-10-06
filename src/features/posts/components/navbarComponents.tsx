"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncLogout } from "@/features/auth/states/action";
import { showConfirmDialog, showSuccessDialog } from "@/helpers/toolsHelper";
import { FiMenu, FiLogOut, FiUser, FiChevronDown, FiShield } from "react-icons/fi";

interface NavbarProps {
  onToggleSidebar: () => void;
}

export default function NavbarComponent({ onToggleSidebar }: NavbarProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    setDropdownOpen(false);
    const confirmed = await showConfirmDialog(
      "Apakah Anda yakin ingin keluar dari aplikasi?",
      "Konfirmasi Logout",
      "Ya, Keluar",
      "Batal"
    );

    if (confirmed) {
      await dispatch(asyncLogout());
      await showSuccessDialog("Anda telah berhasil keluar.", "Sampai Jumpa");
      router.replace("/login");
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 sm:px-6 backdrop-blur">
      {/* Kiri: Tombol Menu Mobile & Logo */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <FiMenu className="text-2xl" />
        </button>

        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg text-slate-800 tracking-tight">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <FiShield className="text-xl" />
          </div>
          <span>Delcom<span className="text-blue-600">Posts</span></span>
        </Link>
      </div>

      {/* Kanan: Profil & Dropdown Logout */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-3 rounded-full p-1.5 hover:bg-slate-100 transition-colors focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-sm ring-2 ring-blue-500/20">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
          </div>
          <div className="hidden text-left sm:block pr-1">
            <p className="text-xs font-semibold text-slate-800 leading-tight">
              {user?.name || "Pengguna Aktif"}
            </p>
            <p className="text-[11px] text-slate-500">{user?.email || "Delcom Member"}</p>
          </div>
          <FiChevronDown className="hidden sm:block text-slate-400 text-sm" />
        </button>

        {dropdownOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setDropdownOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-100 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-100 sm:hidden">
                <p className="text-xs font-semibold text-slate-800">{user?.name || "Pengguna"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <FiLogOut className="text-base" />
                <span>Keluar Akun</span>
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}