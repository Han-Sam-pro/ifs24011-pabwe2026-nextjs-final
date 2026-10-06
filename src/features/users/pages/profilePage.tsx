"use client";

import React from "react";
import { useAppSelector } from "@/hooks/redux";
import { FiUser, FiMail, FiCalendar } from "react-icons/fi";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100">
          <div className="h-20 w-20 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-2xl shadow-inner">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FiUser />}
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-slate-900">{user?.name || "Nama Pengguna"}</h2>
            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <FiMail /> {user?.email || "email@delcom.org"}
            </p>
          </div>
        </div>

        <div className="pt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Informasi Akun</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block mb-1">Status Sesi</span>
              <span className="text-xs font-semibold text-emerald-600">Aktif & Terverifikasi</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[11px] text-slate-400 block mb-1">Peran Akun</span>
              <span className="text-xs font-semibold text-slate-700">Member Komunitas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}