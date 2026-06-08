"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
      const res = await fetch("/api/leads/counts", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setSidebarCounts(data);
      }
    } catch (error) {
      console.error("Failed to fetch counts:", error);
    }
  };

  useEffect(() => {
    refreshCounts();

    // Poll counts every 5 seconds so sidebar badges stay in sync
    const interval = setInterval(() => {
      refreshCounts();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // If on login page, just render children without shell
  if (pathname === "/login") {
    return <>{children}</>;
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
