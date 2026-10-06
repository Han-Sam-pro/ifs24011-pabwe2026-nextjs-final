"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/helpers/apiHelper";
import { FiLock, FiShield } from "react-icons/fi";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      router.replace("/");
    }
  }, [router]);

  return (
    <main className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50 text-slate-800">
      {/* Banner Samping Responsif */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-white/10 backdrop-blur rounded-xl">
            <FiShield className="text-2xl text-blue-200" />
          </div>
          <span className="font-bold text-xl tracking-tight">Delcom Portal</span>
        </div>

        <div className="max-w-md space-y-4">
          <h2 className="text-3xl font-extrabold leading-tight">
            Akses Komprehensif Data & Komunitas Delcom
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Kelola kiriman artikel, bertukar wawasan, dan nikmati integrasi REST API Delcom secara aman dan terpadu.
          </p>
        </div>

        <p className="text-xs text-blue-200/80">
          &copy; {new Date().getFullYear()} Delcom Next.js Application. All rights reserved.
        </p>
      </div>

      {/* Form Container */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100 space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl mb-2">
              <FiLock className="text-xl" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h1>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </main>
  );
}