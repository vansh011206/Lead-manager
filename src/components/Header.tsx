"use client";

import { Menu } from "lucide-react";
import { useApp } from "@/components/Providers";
import Link from "next/link";
import GlobalSearch from "@/components/GlobalSearch";

export default function Header() {
  const { setSidebarOpen } = useApp();

  return (
    <header className="relative flex items-center justify-between h-20 px-6 bg-white border-b border-slate-200 w-full shrink-0">
      <button
        onClick={() => setSidebarOpen(true)}
        className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors md:hidden"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
      
      <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center md:hidden">
        <img
          src="/forgeweb-logo.webp"
          alt="ForgeWeb Logo"
          className="h-8 w-auto object-contain"
        />
      </Link>

      <div className="md:flex-grow md:max-w-md md:mr-auto ml-auto md:ml-0">
        <GlobalSearch />
      </div>

      <div className="hidden md:flex w-8 h-8 rounded-full bg-[#0D99FF]/10 items-center justify-center text-xs font-bold text-[#0D99FF] shrink-0 ml-4">
        FW
      </div>
    </header>
  );
}
