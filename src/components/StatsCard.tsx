import React from "react";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: "blue" | "green" | "amber" | "red" | "white" | "indigo";
  description?: string;
}

export default function StatsCard({
  title,
  value,
  icon: Icon,
  color,
  description,
}: StatsCardProps) {
  const themes = {
    blue: {
      border: "border-slate-200/80 hover:border-[#0D99FF]/40",
      glow: "hover:shadow-blue-500/5",
      iconBg: "bg-blue-50 text-[#0D99FF]",
      accent: "text-slate-800 group-hover:text-[#0D99FF]",
    },
    indigo: {
      border: "border-slate-200/80 hover:border-indigo-500/40",
      glow: "hover:shadow-indigo-500/5",
      iconBg: "bg-indigo-50 text-indigo-600",
      accent: "text-slate-800 group-hover:text-indigo-600",
    },
    green: {
      border: "border-slate-200/80 hover:border-emerald-500/40",
      glow: "hover:shadow-emerald-500/5",
      iconBg: "bg-emerald-50 text-emerald-600",
      accent: "text-slate-800 group-hover:text-emerald-600",
    },
    amber: {
      border: "border-slate-200/80 hover:border-amber-500/40",
      glow: "hover:shadow-amber-500/5",
      iconBg: "bg-amber-50 text-amber-600",
      accent: "text-slate-800 group-hover:text-amber-600",
    },
    red: {
      border: "border-slate-200/80 hover:border-red-500/40",
      glow: "hover:shadow-red-500/5",
      iconBg: "bg-red-50 text-red-650",
      accent: "text-slate-800 group-hover:text-red-600",
    },
    white: {
      border: "border-slate-200/80 hover:border-slate-300",
      glow: "hover:shadow-slate-500/5",
      iconBg: "bg-slate-50 text-slate-500",
      accent: "text-slate-800",
    },
  };

  const currentTheme = themes[color];

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-white border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(15,23,42,0.03)]",
        currentTheme.border,
        currentTheme.glow
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className={cn("p-3 rounded-2xl transition-all", currentTheme.iconBg)}>
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-5 flex items-baseline">
        <span className={cn("text-4xl sm:text-5xl font-black tracking-tight transition-colors", currentTheme.accent)}>
          {value.toLocaleString()}
        </span>
      </div>

      {description && (
        <p className="mt-3 text-xs sm:text-sm text-slate-450 font-medium">
          {description}
        </p>
      )}
    </div>
  );
}
