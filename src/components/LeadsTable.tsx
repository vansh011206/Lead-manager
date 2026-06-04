"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPin, Briefcase, Building, MessageSquare, Layers, ArrowRight, RotateCcw, Loader2 } from "lucide-react";
import { getNameColor, getNameInitials, getStatusColor } from "@/lib/nameToColor";
import { cn, formatDate, cleanContactInfo } from "@/lib/utils";
import { toast } from "sonner";

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

interface Lead {
  id: string;
  rowNum: number | null;
  prospectFullName: string;
  prospectJobTitle: string | null;
  prospectLinkedin: string | null;
  businessName: string | null;
  businessWebsite: string | null;
  businessNumberOfEmployees: string | null;
  businessYearlyRevenue: string | null;
  businessCountry: string | null;
  businessRegion: string | null;
  businessNaicsDescription: string | null;
  contactProfessionalEmail: string | null;
  contactEmails: string | null;
  contactMobilePhone: string | null;
  contactPhoneNumbers: string | null;
  status: string;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
}

interface LeadsTableProps {
  leads: Lead[];
  filterParams?: string;
  onRefresh: () => void;
}

export default function LeadsTable({ leads, filterParams = "", onRefresh }: LeadsTableProps) {
  const router = useRouter();
  const [loadingUndoId, setLoadingUndoId] = useState<string | null>(null);

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

  const formatLinkedinUrl = (url: string | null) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleUndo = async (e: React.MouseEvent, leadId: string, name: string) => {
    e.stopPropagation();
    try {
      setLoadingUndoId(leadId);
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "new", remark: null }),
      });

      if (!res.ok) {
        throw new Error("Failed to undo lead action");
      }

      toast.success(`Action undone: ${name} reverted to new status`);
      onRefresh();
    } catch (err: any) {
      console.error("Undo action error:", err);
      toast.error(err.message || "Failed to undo status change");
    } finally {
      setLoadingUndoId(null);
    }
  };

  return (
    <div className="w-full overflow-hidden border border-slate-200 bg-white rounded-3xl shadow-sm text-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold tracking-wider">
              <th className="px-5 py-4 font-bold text-center w-12">#</th>
              <th className="px-5 py-4 font-bold min-w-[200px]">Name & Company</th>
              <th className="px-5 py-4 font-bold min-w-[150px]">Job Title</th>
              <th className="px-3 py-4 font-bold text-center w-16">LinkedIn</th>
              <th className="px-5 py-4 font-bold min-w-[150px]">Location</th>
              <th className="px-5 py-4 font-bold min-w-[150px]">Industry</th>
              <th className="px-5 py-4 font-bold min-w-[180px]">Contact Info</th>
              <th className="px-5 py-4 font-bold w-28">Status</th>
              <th className="px-5 py-4 font-bold text-right min-w-[120px]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {leads.map((lead, idx) => {
              const gradient = getNameColor(lead.prospectFullName);
              const initials = getNameInitials(lead.prospectFullName);
              const isUndoLoading = loadingUndoId === lead.id;
              
              const statusStyle = getStatusColor(lead.status);
              const lightStatusClass = getLightStatusStyle(lead.status);

              // Check if name is generic (or was parsed from businessName)
              const hasCompanyAsName = lead.businessName && lead.prospectFullName === lead.businessName;

              return (
                <tr
                  key={lead.id}
                  onClick={() => router.push(`/lead/${lead.id}${filterParams ? `?${filterParams}` : ""}`)}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                >
                  {/* Serial Row Number */}
                  <td className="px-5 py-4 font-mono text-slate-400 text-center">
                    {lead.rowNum || idx + 1}
                  </td>

                  {/* Avatar + Name / Company */}
                  <td className="px-5 py-4 min-w-[200px]">
                    <div className="flex items-center space-x-3.5">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-white text-[10px] sm:text-xs shadow-sm shrink-0"
                        style={{
                          background: `linear-gradient(135deg, ${gradient.from}, ${gradient.to})`,
                        }}
                      >
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 text-sm truncate leading-tight group-hover:text-[#0D99FF] transition-colors">
                          {lead.prospectFullName}
                        </p>
                        {lead.businessName && !hasCompanyAsName && (
                          <p className="text-[10px] text-slate-450 mt-0.5 truncate flex items-center">
                            <Building size={10} className="mr-1 text-slate-400" />
                            {lead.businessName}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Job Title */}
                  <td className="px-5 py-4 text-slate-600 truncate max-w-[180px]">
                    {lead.prospectJobTitle ? (
                      <span className="flex items-center">
                        <Briefcase size={12} className="mr-1.5 text-slate-400 shrink-0" />
                        <span className="truncate">{lead.prospectJobTitle}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">N/A</span>
                    )}
                  </td>

                  {/* LinkedIn */}
                  <td className="px-3 py-4 text-center">
                    {lead.prospectLinkedin ? (
                      <a
                        href={formatLinkedinUrl(lead.prospectLinkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex p-1.5 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all"
                        title="LinkedIn Profile"
                      >
                        <LinkedinIcon size={12} className="fill-current" />
                      </a>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>

                  {/* Location */}
                  <td className="px-5 py-4 text-slate-600 truncate max-w-[150px]">
                    {(lead.businessCountry || lead.businessRegion) ? (
                      <span className="flex items-center">
                        <MapPin size={12} className="mr-1.5 text-slate-400 shrink-0" />
                        <span className="truncate">
                          {[lead.businessRegion, lead.businessCountry].filter(Boolean).join(", ")}
                        </span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">N/A</span>
                    )}
                  </td>

                  {/* Industry */}
                  <td className="px-5 py-4 text-slate-650 truncate max-w-[150px]" title={lead.businessNaicsDescription || ""}>
                    {lead.businessNaicsDescription ? (
                      <span className="flex items-center">
                        <Layers size={12} className="mr-1.5 text-slate-400 shrink-0" />
                        <span className="truncate">{lead.businessNaicsDescription}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic font-normal">N/A</span>
                    )}
                  </td>

                  {/* Contact Info */}
                  <td className="px-5 py-4 text-slate-600 space-y-1">
                    {(() => {
                      const emails = cleanContactInfo(lead.contactProfessionalEmail);
                      return emails.length > 0 ? (
                        <a
                          href={`mailto:${emails[0]}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block text-[#0D99FF] hover:text-[#0575E6] hover:underline font-semibold truncate max-w-[160px]"
                          title={emails[0]}
                        >
                          {emails[0]}
                        </a>
                      ) : (
                        <span className="text-slate-400 block italic font-normal">No email</span>
                      );
                    })()}
                    {(() => {
                      const phones = cleanContactInfo(lead.contactMobilePhone || lead.contactPhoneNumbers);
                      return phones.length > 0 ? (
                        <a
                          href={`tel:${phones[0]}`}
                          onClick={(e) => e.stopPropagation()}
                          className="block text-slate-500 hover:text-slate-700 text-[10px] font-semibold"
                        >
                          {phones[0]}
                        </a>
                      ) : null;
                    })()}
                  </td>

                  {/* Status Badge */}
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border capitalize",
                        lightStatusClass
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", statusStyle.dot)} />
                      <span>{lead.status}</span>
                    </span>
                  </td>

                  {/* Actions (View Profile + Undo) */}
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {/* Undo Button (Only shown if status is not new) */}
                      {lead.status !== "new" && (
                        <button
                          onClick={(e) => handleUndo(e, lead.id, lead.prospectFullName)}
                          disabled={isUndoLoading}
                          className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 hover:border-slate-300 text-slate-500 hover:text-slate-800 transition-all shadow-sm disabled:opacity-50"
                          title="Undo / Reset Status"
                        >
                          {isUndoLoading ? (
                            <Loader2 className="animate-spin text-slate-500" size={13} />
                          ) : (
                            <RotateCcw size={13} />
                          )}
                        </button>
                      )}

                      {/* View Profile Shortcut */}
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-450 group-hover:bg-[#0D99FF] group-hover:border-[#0D99FF] group-hover:text-white transition-all shadow-sm">
                        <ArrowRight size={13} />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
