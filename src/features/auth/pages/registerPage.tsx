"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInput } from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncRegister } from "../states/action";
import { showErrorDialog, showSuccessDialog } from "@/helpers/toolsHelper";
import AuthLayout from "../layout/AuthLayout";
import { FiUser, FiMail, FiLock, FiLoader } from "react-icons/fi";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const nameInput = useInput("");
  const emailInput = useInput("");
  const passwordInput = useInput("");
  const confirmPasswordInput = useInput("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameInput.value.trim() || !emailInput.value.trim() || !passwordInput.value) {
      showErrorDialog("Semua kolom formulir wajib diisi!");
      return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
      showErrorDialog("Konfirmasi kata sandi tidak cocok!");
      return;
    }

    const result = await dispatch(
      asyncRegister({
        name: nameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      })
    );

    if (asyncRegister.fulfilled.match(result)) {
      await showSuccessDialog(
        "Akun Anda berhasil dibuat. Silakan login untuk melanjutkan.",
        "Pendaftaran Berhasil"
      );
      router.push("/login");
    } else {
      showErrorDialog(
        (result.payload as string) || "Gagal membuat akun pengguna baru."
      );
    }
  };

  return (
    <AuthLayout
      title="Buat Akun Baru"
      subtitle="Lengkapi data di bawah untuk bergabung."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Nama Lengkap
          </label>
          <div className="relative flex items-center">
            <FiUser className="absolute left-3.5 text-slate-400 text-lg" />
            <input
              type="text"
              placeholder="Nama Lengkap Anda"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              {...nameInput.bind}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email
          </label>
          <div className="relative flex items-center">
            <FiMail className="absolute left-3.5 text-slate-400 text-lg" />
            <input
              type="email"
              placeholder="nama@email.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              {...emailInput.bind}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Kata Sandi
          </label>
          <div className="relative flex items-center">
            <FiLock className="absolute left-3.5 text-slate-400 text-lg" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              {...passwordInput.bind}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Konfirmasi Kata Sandi
          </label>
          <div className="relative flex items-center">
            <FiLock className="absolute left-3.5 text-slate-400 text-lg" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              {...confirmPasswordInput.bind}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Mendaftarkan...</span>
            </>
          ) : (
            <span>Daftar Akun</span>
          )}
        </button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Sudah memiliki akun?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Masuk di Sini
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}