"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Toaster } from "sonner";
import { SidebarCounts } from "@/types";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface AppContextType {
  sidebarCounts: SidebarCounts;
  refreshCounts: () => Promise<void>;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [sidebarCounts, setSidebarCounts] = useState<SidebarCounts>({
    all: 0,
    new: 0,
    contacted: 0,
    remarked: 0,
    declined: 0,
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const refreshCounts = async () => {
    try {
      const res = await fetch("/api/leads/counts");
      if (res.ok) {
        const data = await res.json();
        setSidebarCounts(data);
      }
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/login") {
      router.push("/login");
    }
  }, [status, pathname, router]);

  useEffect(() => {
    if (status === "authenticated") {
      refreshCounts();
    }
  }, [status]);

  // Show nothing while checking auth status
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-[#0D99FF]/20 border-t-[#0D99FF] rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If on login page, just render children without shell
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // If not authenticated, don't render anything (redirect will happen via useEffect)
  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F8FAFC]">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-3 border-[#0D99FF]/20 border-t-[#0D99FF] rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-400">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        sidebarCounts,
        refreshCounts,
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      <Toaster theme="dark" position="top-right" closeButton richColors />
      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8FAFC]">
            {children}
          </main>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within Providers");
  }
  return context;
}
