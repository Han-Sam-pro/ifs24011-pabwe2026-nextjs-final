"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useInput } from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { asyncLogin } from "../states/action";
import { showErrorDialog, showSuccessDialog } from "@/helpers/toolsHelper";
import AuthLayout from "../layout/AuthLayout";
import { FiMail, FiLock, FiLoader } from "react-icons/fi";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);

  const emailInput = useInput("");
  const passwordInput = useInput("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput.value.trim() || !passwordInput.value.trim()) {
      showErrorDialog("Email/Username dan Kata Sandi wajib diisi!");
      return;
    }

    const result = await dispatch(
      asyncLogin({
        email: emailInput.value,
        password: passwordInput.value,
      })
    );

    if (asyncLogin.fulfilled.match(result)) {
      await showSuccessDialog("Selamat datang kembali!", "Login Berhasil");
      router.push("/");
    } else {
      showErrorDialog(
        (result.payload as string) || "Kredensial yang dimasukkan salah."
      );
    }
  };

  return (
    <AuthLayout
      title="Masuk ke Akun Anda"
      subtitle="Masukkan identitas Anda untuk melanjutkan."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Email / Username
          </label>
          <div className="relative flex items-center">
            <FiMail className="absolute left-3.5 text-slate-400 text-lg" />
            <input
              type="text"
              id="login-email-input"
              placeholder="nama@email.com atau username"
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
              id="login-password-input" 
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              {...passwordInput.bind}
            />
          </div>
        </div>

        <button
          type="submit"
          id="login-submit-button" 
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <FiLoader className="animate-spin text-lg" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk Sekarang</span>
          )}
        </button>

        <p className="text-center text-xs text-slate-500 pt-2">
          Belum memiliki akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-semibold hover:underline"
          >
            Daftar Sekarang
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}