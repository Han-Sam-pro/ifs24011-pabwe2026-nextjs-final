"use client";

import React from "react";
import { FiUsers, FiUserCheck } from "react-icons/fi";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <FiUsers className="text-2xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900">Direktori Pengguna</h1>
          <p className="text-xs text-slate-500">Temukan teman dan anggota komunitas Delcom</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-500 text-sm shadow-xs">
        <FiUserCheck className="text-3xl text-slate-400 mx-auto mb-2" />
        Daftar anggota komunitas Delcom akan dimuat di sini.
      </div>
    </div>
  );
}