"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/components/Providers";
import {
  Home,
  Users,
  PhoneCall,
  MessageSquare,
  XCircle,
  Upload,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarCounts, isSidebarOpen, setSidebarOpen } = useApp();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/leads", label: "New Leads", icon: Users, badge: sidebarCounts.new },
    { href: "/contacted", label: "Contacted", icon: PhoneCall, badge: sidebarCounts.contacted },
    { href: "/remarked", label: "Remarked", icon: MessageSquare, badge: sidebarCounts.remarked },
    { href: "/declined", label: "Declined", icon: XCircle, badge: sidebarCounts.declined },
    { href: "/uploads", label: "Upload CSV", icon: Upload },
  ];

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-50 flex flex-col w-64 bg-[#121A2E] border-r border-slate-800 text-slate-300 transition-transform duration-300 md:translate-x-0 md:static md:h-screen",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-850">
          <Link
            href="/"
            className="flex items-center space-x-2"
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-xl font-extrabold tracking-wider text-white">
              ForgeWeb
            </span>
            <span className="text-[10px] uppercase px-2 py-0.5 rounded-full bg-white/10 border border-white/20 text-white font-bold">
              Leads
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 md:hidden transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                  isActive
                    ? "bg-white/10 text-white border-l-4 border-white font-semibold shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5 border-l-4 border-transparent"
                )}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    size={18}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                    )}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-bold rounded-full transition-all",
                      isActive
                        ? "bg-white text-[#121A2E]"
                        : "bg-white/10 text-slate-200 group-hover:bg-white/20 group-hover:text-white"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

      </aside>
    </>
  );
}
