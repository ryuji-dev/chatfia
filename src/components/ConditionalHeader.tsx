"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  return !isAuthPage ? <Header /> : null;
}
