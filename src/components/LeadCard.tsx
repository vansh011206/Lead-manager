"use client";

import { useRouter } from "next/navigation";
import { Lead } from "@prisma/client";
import { MapPin, Briefcase, Building, MessageSquare, Layers, ArrowRight } from "lucide-react";
import { getNameColor, getNameInitials, getStatusColor } from "@/lib/nameToColor";
import { cn, formatDate } from "@/lib/utils";

const LinkedinIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface LeadCardProps {
  lead: Lead;
  filterParams?: string;
}

export default function LeadCard({ lead, filterParams = "" }: LeadCardProps) {
  const router = useRouter();
  const gradient = getNameColor(lead.prospectFullName);
  const initials = getNameInitials(lead.prospectFullName);
  
  // Custom Status Pill Color Overrides for Light Theme
  const getLightStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "contacted":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "remarked":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "declined":
        return "bg-red-50 text-red-700 border-red-200";
      case "new":
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  const statusStyle = getStatusColor(lead.status);
  const lightStatusClass = getLightStatusStyle(lead.status);

  const formatLinkedinUrl = (url: string | null) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleCardClick = () => {
    const detailUrl = `/lead/${lead.id}${filterParams ? `?${filterParams}` : ""}`;
    router.push(detailUrl);
  };

  const handleLinkedinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200/80 cursor-pointer p-6 sm:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.04)]",
        lead.status === "contacted" && "hover:border-emerald-300 hover:shadow-[0_12px_32px_rgba(16,185,129,0.04)]",
        lead.status === "remarked" && "hover:border-amber-300 hover:shadow-[0_12px_32px_rgba(245,158,11,0.04)]",
        lead.status === "declined" && "hover:border-red-300 hover:shadow-[0_12px_32px_rgba(239,68,68,0.04)]"
      )}
    >
      {/* Horizontal Main Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
        
        {/* Left Side: Avatar + Main Prospect Info */}
        <div className="flex items-center space-x-6 flex-1 min-w-0">
          {/* Avatar with name gradient */}
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center font-extrabold text-white text-lg sm:text-2xl shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-102"
            style={{
              background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
            }}
          >
            {initials}
          </div>

          <div className="min-w-0 flex-1 space-y-2">
            {/* Prospect Name & LinkedIn Icon */}
            <div className="flex items-center space-x-3">
              <h3 className="font-bold text-xl sm:text-2xl text-slate-800 group-hover:text-[#0D99FF] transition-colors leading-tight truncate">
                {lead.prospectFullName}
              </h3>
              {lead.prospectLinkedin && (
                <a
                  href={formatLinkedinUrl(lead.prospectLinkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleLinkedinClick}
                  className="p-2 rounded-xl bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all animate-fade-in"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={14} className="fill-current" />
                </a>
              )}
            </div>

            {/* Job Title & Company */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm sm:text-base text-slate-500 font-medium">
              {lead.prospectJobTitle && (
                <div className="flex items-center">
                  <Briefcase size={15} className="mr-2 shrink-0 text-slate-400" />
                  <span className="truncate">{lead.prospectJobTitle}</span>
                </div>
              )}
              {lead.businessName && (
                <div className="flex items-center">
                  <Building size={15} className="mr-2 shrink-0 text-slate-400" />
                  <span className="truncate">{lead.businessName}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Side: Metadata (Location & NAICS Description) */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 shrink-0 md:px-4">
          {/* Location */}
          {(lead.businessCountry || lead.businessRegion) && (
            <div className="flex items-center text-sm sm:text-base text-slate-500 font-medium">
              <MapPin size={16} className="mr-2 text-slate-400 shrink-0" />
              <span className="truncate max-w-[180px]">
                {[lead.businessRegion, lead.businessCountry].filter(Boolean).join(", ")}
              </span>
            </div>
          )}
          {/* NAICS Industry */}
          {lead.businessNaicsDescription && (
            <div className="flex items-center text-sm sm:text-base text-slate-500 font-medium">
              <Layers size={16} className="mr-2 text-slate-400 shrink-0" />
              <span className="truncate max-w-[200px]" title={lead.businessNaicsDescription}>
                {lead.businessNaicsDescription}
              </span>
            </div>
          )}
        </div>

        {/* Right Side: Status Badge + Action Shortcut */}
        <div className="flex items-center justify-between md:justify-end gap-5 shrink-0 pt-4 md:pt-0 border-t border-slate-100 md:border-0">
          {/* Status Badge */}
          <span
            className={cn(
              "flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border",
              lightStatusClass
            )}
          >
            <span className={cn("w-2 h-2 rounded-full", statusStyle.dot)} />
            <span className="capitalize">{lead.status}</span>
          </span>

          {/* Quick Action details link */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-slate-400 group-hover:bg-[#0D99FF] group-hover:border-[#0D99FF] group-hover:text-white transition-all shadow-sm">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>

      {/* Remark Preview Block (Only if remarked, displayed full-width at the bottom of the row card) */}
      {lead.status === "remarked" && lead.remark && (
        <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-start space-x-3">
          <MessageSquare size={16} className="text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed italic">
            &quot;{lead.remark}&quot;
          </p>
        </div>
      )}

      {/* Action Timestamp Block */}
      {lead.status !== "new" && (
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          <div className="flex items-center space-x-1.5">
            <span className="capitalize font-semibold text-slate-500">{lead.status === "remarked" ? "Remarked" : lead.status === "contacted" ? "Contacted" : "Declined"} on:</span>
            <span className="text-slate-600 font-bold">{formatDate(lead.updatedAt)}</span>
          </div>
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Logged by Admin</span>
        </div>
      )}
    </div>
  );
}
