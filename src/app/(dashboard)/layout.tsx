import React from "react";
import PostLayout from "@/features/posts/layouts/postLayout";

export default function DashboardRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostLayout>{children}</PostLayout>;
}