"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0F1C] text-slate-400">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-3 border-[#0D99FF]/20 border-t-[#0D99FF] rounded-full animate-spin" />
        <p className="text-sm font-semibold">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
