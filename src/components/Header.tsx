"use client";

import { Menu } from "lucide-react";
import { useApp } from "@/components/Providers";
import Link from "next/link";

export default function Header() {
  const { setSidebarOpen } = useApp();

  return (
    <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200 md:hidden">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-lg font-extrabold tracking-wider text-[#0D99FF]">
          ForgeWeb
        </span>
      </Link>
      <div className="w-8 h-8 rounded-full bg-[#0D99FF]/10 flex items-center justify-center text-xs font-bold text-[#0D99FF]">
        FW
      </div>
    </header>
  );
}
