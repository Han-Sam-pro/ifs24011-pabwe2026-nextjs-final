"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/helpers/apiHelper";
import NavbarComponent from "@/features/posts/components/navbarComponents";
import SidebarComponent from "@/features/posts/components/sidebarComponent";

interface PostLayoutProps {
  children: React.ReactNode;
  activeFilter?: "all" | "me";
  onFilterChange?: (filter: "all" | "me") => void;
}

export default function PostLayout({
  children,
  activeFilter = "all",
  onFilterChange,
}: PostLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Route Guarding: Cek ketersediaan token sesi pengguna
  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <NavbarComponent onToggleSidebar={() => setSidebarOpen(true)} />

      <div className="flex flex-1">
        <SidebarComponent
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}