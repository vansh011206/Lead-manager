"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Briefcase, Building, MessageSquare, Layers, ArrowRight, RotateCcw, Loader2, Trash2, Calendar, Clock } from "lucide-react";
import { getNameColor, getNameInitials, getStatusColor } from "@/lib/nameToColor";
import { cn, formatDate, cleanContactInfo, getWhatsappLink } from "@/lib/utils";
import { toast } from "sonner";
import ScheduleMeetingModal from "@/components/ScheduleMeetingModal";

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

const WhatsappIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    width={size}
    height={size}
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.062 5.248 5.835 0 12.928 0c3.437.002 6.671 1.34 9.1 3.77 2.43 2.43 3.765 5.666 3.764 9.103-.005 6.965-5.78 12.213-12.871 12.213-.005 0-.01 0-.014 0-2.007-.001-3.98-.513-5.732-1.488L0 24zm6.076-4.542l.363.216c1.714 1.018 3.69 1.554 5.717 1.556 5.89 0 10.684-4.512 10.688-10.058.002-2.686-1.043-5.212-2.943-7.115-1.9-1.9-4.43-2.946-7.118-2.947-5.9 0-10.69 4.515-10.694 10.061-.001 2.032.532 4.02 1.54 5.762l.24.412-1.01 3.694 3.784-.992zm11.286-5.187c-.31-.156-1.839-.907-2.121-1.01-.28-.104-.486-.156-.69.156-.203.312-.787 1.01-.966 1.217-.177.208-.356.233-.666.078-.31-.156-1.307-.48-2.49-1.536-.919-.82-1.54-1.834-1.72-2.145-.18-.313-.018-.482.137-.636.14-.138.31-.363.466-.545.156-.18.208-.31.31-.52.105-.207.052-.39-.026-.546-.078-.156-.69-1.66-.944-2.274-.25-.6-.525-.52-.72-.53l-.612-.01c-.28 0-.738.105-1.124.522-.387.417-1.477 1.442-1.477 3.513 0 2.07 1.51 4.07 1.72 4.35.207.28 2.972 4.538 7.198 6.36 1.005.433 1.79.69 2.4.883 1.01.32 1.93.276 2.658.168.812-.122 2.502-1.023 2.85-2.01.348-.99.348-1.838.244-2.01-.104-.173-.38-.277-.69-.434z" />
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
  rawData?: string | null;
  uploadBatch?: { id: string; fileName: string; uploadedAt: string } | null;
  meetings?: any[];
}

interface LeadsTableProps {
  leads: Lead[];
  filterParams?: string;
  onRefresh: () => void;
}

export default function LeadsTable({ leads, filterParams = "", onRefresh }: LeadsTableProps) {
  const router = useRouter();
  const [loadingUndoId, setLoadingUndoId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [hoveredLead, setHoveredLead] = useState<Lead | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedLeadForMeeting, setSelectedLeadForMeeting] = useState<Lead | null>(null);
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);

  const handleSelectLead = (id: string) => {
    setSelectedLeadIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllGroup = (groupLeads: Lead[]) => {
    const groupIds = groupLeads.map((l) => l.id);
    const allSelected = groupIds.every((id) => selectedLeadIds.includes(id));
    
    if (allSelected) {
      setSelectedLeadIds((prev) => prev.filter((id) => !groupIds.includes(id)));
    } else {
      setSelectedLeadIds((prev) => {
        const unique = new Set([...prev, ...groupIds]);
        return Array.from(unique);
      });
    }
  };

  const handleBulkStatusChange = async (status: string, remark?: string) => {
    try {
      const res = await fetch("/api/leads/bulk", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedLeadIds,
          status,
          remark: remark || null,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to bulk update status");
      }

      toast.success(`Successfully updated status for ${selectedLeadIds.length} leads!`);
      setSelectedLeadIds([]);
      onRefresh();
    } catch (err: any) {
      console.error("Bulk status change error:", err);
      toast.error(err.message || "Failed to bulk update leads");
    }
  };

  const handleBulkRemark = async () => {
    const remark = window.prompt("Enter remark for selected leads:");
    if (remark === null) return; // cancelled
    await handleBulkStatusChange("remarked", remark);
  };

  const handleBulkDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete ${selectedLeadIds.length} leads?`);
    if (!confirmed) return;

    try {
      const res = await fetch("/api/leads/bulk", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: selectedLeadIds,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to bulk delete leads");
      }

      toast.success(`Successfully deleted ${selectedLeadIds.length} leads!`);
      setSelectedLeadIds([]);
      onRefresh();
    } catch (err: any) {
      console.error("Bulk delete error:", err);
      toast.error(err.message || "Failed to bulk delete leads");
    }
  };

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

  const handleDelete = async (e: React.MouseEvent, leadId: string, name: string) => {
    e.stopPropagation();
    const confirmed = window.confirm(`Are you sure you want to delete lead "${name}" completely?`);
    if (!confirmed) return;

    try {
      setDeletingId(leadId);
      const res = await fetch(`/api/leads/${leadId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete lead");
      }

      toast.success(`Deleted lead: ${name}`);
      onRefresh();
    } catch (err: any) {
      console.error("Delete lead error:", err);
      toast.error(err.message || "Failed to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  // Smart Cell Renderer
  const renderCell = (headerName: string, value: any) => {
    if (value === undefined || value === null || String(value).trim() === "") {
      return <span className="text-slate-400 italic font-normal">-</span>;
    }

    const valStr = String(value).trim();
    const normalizedHeader = headerName.toLowerCase().replace(/[^a-z0-9]/g, "");

    // LinkedIn Profile
    if (normalizedHeader.includes("linkedin") || valStr.includes("linkedin.com/")) {
      return (
        <a
          href={formatLinkedinUrl(valStr)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex p-1.5 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white transition-all"
          title="LinkedIn Profile"
        >
          <LinkedinIcon size={12} className="fill-current" />
        </a>
      );
    }

    // Email link
    if (normalizedHeader.includes("email") || valStr.includes("@")) {
      return (
        <a
          href={`mailto:${valStr}`}
          onClick={(e) => e.stopPropagation()}
          className="text-[#0D99FF] hover:text-[#0575E6] hover:underline font-semibold truncate max-w-[160px] block"
          title={valStr}
        >
          {valStr}
        </a>
      );
    }

    // Website link
    if (
      normalizedHeader.includes("website") ||
      valStr.startsWith("http://") ||
      valStr.startsWith("https://") ||
      (valStr.includes(".") && !valStr.includes(" ") && normalizedHeader.includes("url"))
    ) {
      const url = valStr.startsWith("http") ? valStr : `https://${valStr}`;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-[#0D99FF] hover:text-[#0575E6] hover:underline font-semibold truncate max-w-[160px] block"
          title={valStr}
        >
          {valStr}
        </a>
      );
    }

    // Name column with avatar initials
    const nameKeywords = ["name", "fullname", "prospectfullname", "contactname", "leadname", "personname", "clientname", "customername", "hotelname", "companyname", "businessname", "company", "prospect"];
    if (nameKeywords.includes(normalizedHeader) || normalizedHeader.includes("name") || normalizedHeader === "company" || normalizedHeader === "prospect") {
      const gradient = getNameColor(valStr);
      const initials = getNameInitials(valStr);
      return (
        <div className="flex items-center space-x-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-extrabold text-white text-[10px] sm:text-xs shadow-sm shrink-0"
            style={{
              backgroundColor: gradient.from,
            }}
          >
            {initials}
          </div>
          <span className="font-bold text-slate-800 text-sm truncate max-w-[180px] leading-tight group-hover:text-[#0D99FF] transition-colors">
            {valStr}
          </span>
        </div>
      );
    }

    // Location / Address with MapPin icon
    if (
      normalizedHeader.includes("location") ||
      normalizedHeader.includes("address") ||
      normalizedHeader.includes("city") ||
      normalizedHeader.includes("country") ||
      normalizedHeader.includes("region") ||
      normalizedHeader.includes("state")
    ) {
      return (
        <span className="flex items-center text-slate-600 font-medium">
          <MapPin size={12} className="mr-1.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[180px]">{valStr}</span>
        </span>
      );
    }

    // Job Title / Role / Type with Briefcase icon
    if (
      normalizedHeader.includes("job") ||
      normalizedHeader.includes("title") ||
      normalizedHeader.includes("role") ||
      normalizedHeader.includes("position") ||
      normalizedHeader.includes("type")
    ) {
      return (
        <span className="flex items-center text-slate-600 font-medium">
          <Briefcase size={12} className="mr-1.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[180px]">{valStr}</span>
        </span>
      );
    }

    // Industry / Niche / Category with Layers icon
    if (
      normalizedHeader.includes("industry") ||
      normalizedHeader.includes("niche") ||
      normalizedHeader.includes("category") ||
      normalizedHeader.includes("sector") ||
      normalizedHeader.includes("naics")
    ) {
      return (
        <span className="flex items-center text-slate-600 font-medium">
          <Layers size={12} className="mr-1.5 text-slate-400 shrink-0" />
          <span className="truncate max-w-[180px]">{valStr}</span>
        </span>
      );
    }

    // Phone / Contact numbers
    if (
      normalizedHeader.includes("phone") ||
      normalizedHeader.includes("mobile") ||
      normalizedHeader.includes("contact") ||
      normalizedHeader.includes("tel")
    ) {
      return (
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          <a
            href={`tel:${valStr}`}
            className="text-slate-500 hover:text-slate-700 font-semibold truncate max-w-[140px] block"
            title={valStr}
          >
            {valStr}
          </a>
          <a
            href={getWhatsappLink(valStr)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:text-[#1ebd59] transition-colors shrink-0"
            title="Open in WhatsApp"
          >
            <WhatsappIcon size={12} />
          </a>
        </div>
      );
    }

    // Default string rendering
    return <span className="truncate max-w-[180px] block text-slate-600 font-medium">{valStr}</span>;
  };

  // Group leads by uploadBatch. Fall back to "unknown" if uploadBatch is not present.
  const groupedLeads: Record<string, { fileName: string; leads: Lead[] }> = {};
  leads.forEach((lead) => {
    const batchId = lead.uploadBatch?.id || "unknown";
    const fileName = lead.uploadBatch?.fileName || "Manual Entry / Unknown Batch";
    if (!groupedLeads[batchId]) {
      groupedLeads[batchId] = {
        fileName,
        leads: [],
      };
    }
    groupedLeads[batchId].leads.push(lead);
  });

  const groups = Object.entries(groupedLeads);

  return (
    <div className="space-y-8 w-full text-slate-700">
      {groups.map(([batchId, group]) => {
        // Get all unique keys from rawData across all leads being displayed in this group
        const getGroupDynamicHeaders = () => {
          const keysSet = new Set<string>();
          group.leads.forEach((lead) => {
            if (lead.rawData) {
              try {
                const parsed = JSON.parse(lead.rawData);
                Object.keys(parsed).forEach((key) => {
                  if (key.trim()) {
                    keysSet.add(key.trim());
                  }
                });
              } catch {}
            }
          });
          return Array.from(keysSet);
        };

        const dynamicHeaders = getGroupDynamicHeaders();

        return (
          <div
            key={batchId}
            className="w-full bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-4 animate-fade-in"
          >
            {/* Batch / Group Header */}
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100/80">
              <Layers className="text-[#0D99FF]" size={18} />
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider truncate max-w-md" title={group.fileName}>
                {group.fileName}
              </h3>
              <span className="text-[10px] font-extrabold bg-[#0D99FF]/10 text-[#0D99FF] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {group.leads.length} leads
              </span>
            </div>

            {/* Table Container */}
            <div className="w-full overflow-hidden border border-slate-150 bg-white rounded-2xl shadow-sm text-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold tracking-wider select-none">
                      <th className="px-5 py-4 text-center w-12">
                        <input
                          type="checkbox"
                          checked={group.leads.length > 0 && group.leads.every((l) => selectedLeadIds.includes(l.id))}
                          onChange={() => handleSelectAllGroup(group.leads)}
                          className="w-4 h-4 rounded border-slate-300 text-[#0D99FF] focus:ring-[#0D99FF] cursor-pointer accent-[#0D99FF]"
                        />
                      </th>
                      {dynamicHeaders.length > 0 ? (
                        dynamicHeaders.map((header) => (
                          <th key={header} className="px-5 py-4 font-bold min-w-[150px]">
                            {header}
                          </th>
                        ))
                      ) : (
                        <>
                          <th className="px-5 py-4 font-bold min-w-[200px]">Name & Company</th>
                          <th className="px-5 py-4 font-bold min-w-[150px]">Job Title</th>
                          <th className="px-3 py-4 font-bold text-center w-16">LinkedIn</th>
                          <th className="px-5 py-4 font-bold min-w-[150px]">Location</th>
                          <th className="px-5 py-4 font-bold min-w-[150px]">Industry</th>
                          <th className="px-5 py-4 font-bold min-w-[180px]">Contact Info</th>
                        </>
                      )}
                      <th className="px-5 py-4 font-bold w-28">Status</th>
                      <th className="px-5 py-4 font-bold text-right min-w-[150px]">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {group.leads.map((lead, idx) => {
                      const gradient = getNameColor(lead.prospectFullName);
                      const initials = getNameInitials(lead.prospectFullName);
                      const isUndoLoading = loadingUndoId === lead.id;
                      const isDeleting = deletingId === lead.id;
                      
                      const statusStyle = getStatusColor(lead.status);
                      const lightStatusClass = getLightStatusStyle(lead.status);

                      // Check if name is generic (or was parsed from businessName)
                      const hasCompanyAsName = lead.businessName && lead.prospectFullName === lead.businessName;

                      let parsedRawData: Record<string, string> = {};
                      if (lead.rawData) {
                        try {
                          parsedRawData = JSON.parse(lead.rawData);
                        } catch {}
                      }

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => router.push(`/lead/${lead.id}${filterParams ? `?${filterParams}` : ""}`)}
                          onMouseEnter={() => (lead.remark || (lead.meetings && lead.meetings.length > 0)) && setHoveredLead(lead)}
                          onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
                          onMouseLeave={() => setHoveredLead(null)}
                          className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                        >
                          {/* Checkbox Selector */}
                          <td className="px-5 py-4 text-center w-12 select-none" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(lead.id)}
                              onChange={() => handleSelectLead(lead.id)}
                              className="w-4 h-4 rounded border-slate-350 text-[#0D99FF] focus:ring-[#0D99FF]/30 cursor-pointer accent-[#0D99FF]"
                            />
                          </td>

                          {/* Render Cells */}
                          {dynamicHeaders.length > 0 ? (
                            dynamicHeaders.map((header) => (
                              <td key={header} className="px-5 py-4 min-w-[150px]">
                                {renderCell(header, parsedRawData[header])}
                              </td>
                            ))
                          ) : (
                            <>
                              {/* Avatar + Name / Company */}
                              <td className="px-5 py-4 min-w-[200px]">
                                <div className="flex items-center space-x-3.5">
                                  <div
                                    className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-white text-[10px] sm:text-xs shadow-sm shrink-0"
                                    style={{
                                      backgroundColor: gradient.from,
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
                                  <span className="text-slate-400 italic font-normal">-</span>
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
                                  <span className="text-slate-400 italic font-normal">-</span>
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
                                  <span className="text-slate-400 italic font-normal">-</span>
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
                                    <span className="text-slate-400 block italic font-normal">-</span>
                                  );
                                })()}
                                {(() => {
                                  const phones = cleanContactInfo(lead.contactMobilePhone || lead.contactPhoneNumbers);
                                  return phones.length > 0 ? (
                                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                      <a
                                        href={`tel:${phones[0]}`}
                                        className="block text-slate-500 hover:text-slate-700 text-[10px] font-semibold"
                                      >
                                        {phones[0]}
                                      </a>
                                      <a
                                        href={getWhatsappLink(phones[0])}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#25D366] hover:text-[#1ebd59] transition-colors shrink-0"
                                        title="Open in WhatsApp"
                                      >
                                        <WhatsappIcon size={11} />
                                      </a>
                                    </div>
                                  ) : null;
                                })()}
                              </td>
                            </>
                          )}

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

                          {/* Actions */}
                          <td className="px-5 py-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              {/* Schedule / Scheduled Meeting */}
                              {lead.status === "contacted" && (() => {
                                const hasMeeting = lead.meetings && lead.meetings.length > 0;
                                return (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedLeadForMeeting(lead);
                                    }}
                                    className={cn(
                                      "px-2.5 py-1.5 rounded-xl border transition-all shadow-sm flex items-center gap-1 text-[10px] font-extrabold shrink-0",
                                      hasMeeting
                                        ? "border-slate-200 bg-slate-50 text-slate-450 hover:bg-slate-100 hover:text-slate-655"
                                        : "border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-650 hover:text-emerald-700"
                                    )}
                                    title={hasMeeting ? "View or Reschedule Meeting" : "Schedule Meeting"}
                                  >
                                    <Calendar size={12} />
                                    <span>{hasMeeting ? "Scheduled" : "Schedule"}</span>
                                  </button>
                                );
                              })()}

                              {/* Undo Button */}
                              {lead.status !== "new" && (
                                <button
                                  onClick={(e) => handleUndo(e, lead.id, lead.prospectFullName)}
                                  disabled={isUndoLoading || isDeleting}
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

                              {/* Delete Lead Button */}
                              <button
                                onClick={(e) => handleDelete(e, lead.id, lead.prospectFullName)}
                                disabled={isDeleting || isUndoLoading}
                                className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-500 text-slate-400 transition-all shadow-sm disabled:opacity-50"
                                title="Delete Lead Completely"
                              >
                                {isDeleting ? (
                                  <Loader2 className="animate-spin text-red-500" size={13} />
                                ) : (
                                  <Trash2 size={13} />
                                )}
                              </button>

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
          </div>
        );
      })}

      {/* Floating Tooltip (Remark & Meeting Info) */}
      {hoveredLead && (hoveredLead.remark || (hoveredLead.meetings && hoveredLead.meetings.length > 0)) && (
        <div
          className="fixed z-50 bg-white text-slate-800 p-5 rounded-2xl border border-slate-200/90 shadow-[0_16px_48px_rgba(15,23,42,0.12)] max-w-sm w-[340px] pointer-events-none text-xs flex flex-col space-y-3.5 transition-all duration-75 animate-fade-in"
          style={{
            left: `${mousePos.x + 15}px`,
            top: `${mousePos.y + 15}px`,
          }}
        >
          {/* Remark section */}
          {hoveredLead.remark && (
            <div className="flex flex-col space-y-1.5">
              <div className="font-extrabold text-amber-650 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
                <MessageSquare size={12} className="text-amber-500 shrink-0" />
                <span>Remark for {hoveredLead.prospectFullName}</span>
              </div>
              <div className="text-slate-700 leading-relaxed font-bold italic text-[13px]">
                "{hoveredLead.remark}"
              </div>
            </div>
          )}

          {/* Divider if both exist */}
          {hoveredLead.remark && hoveredLead.meetings && hoveredLead.meetings.length > 0 && (
            <div className="border-t border-slate-100 my-1" />
          )}

          {/* Meeting section */}
          {hoveredLead.meetings && hoveredLead.meetings.length > 0 && (() => {
            const meeting = hoveredLead.meetings[hoveredLead.meetings.length - 1];
            const formattedDate = new Date(meeting.scheduledAt).toLocaleString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div className="flex flex-col space-y-2">
                <div className="font-extrabold text-emerald-650 uppercase tracking-wider text-[10px] flex items-center space-x-1.5">
                  <Calendar size={12} className="text-emerald-500 shrink-0" />
                  <span>Scheduled Meeting</span>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-3 flex flex-col space-y-1.5 text-slate-750">
                  <div className="font-extrabold text-slate-800 text-[12px] leading-snug">{meeting.title}</div>
                  <div className="flex items-center text-emerald-700 text-[11px] gap-1 font-bold">
                    <Clock size={11} className="text-emerald-500" />
                    <span>{formattedDate}</span>
                  </div>
                  {meeting.agenda && (
                    <div className="text-slate-500 font-medium italic text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                      "{meeting.agenda}"
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* Footer date */}
          <div className="text-[10px] text-slate-400 font-semibold pt-2 border-t border-slate-100">
            Last updated: {formatDate(hoveredLead.updatedAt)}
          </div>
        </div>
      )}

      {/* Bulk Actions Panel */}
      {selectedLeadIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 animate-scale-up">
          <div className="bg-white border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.12)] rounded-3xl p-3.5 flex items-center justify-between gap-4 text-slate-700">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-black bg-[#0D99FF] text-white w-6 h-6 rounded-full flex items-center justify-center select-none shadow-sm">
                {selectedLeadIds.length}
              </span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Selected</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Move to dropdown */}
              <div className="relative group">
                <button
                  type="button"
                  className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-[10px] font-extrabold transition-all flex items-center gap-1.5 text-slate-750 uppercase tracking-wider shadow-sm"
                >
                  Move to
                </button>
                {/* Dropdown panel */}
                <div className="absolute bottom-full right-0 mb-2 w-36 bg-white border border-slate-200 shadow-2xl rounded-xl p-1 space-y-0.5 z-50 hidden group-hover:block">
                  <button
                    type="button"
                    onClick={() => handleBulkStatusChange("contacted")}
                    className="w-full text-left px-2.5 py-2 hover:bg-emerald-50 rounded-lg text-[10px] font-extrabold text-emerald-600 uppercase tracking-wider"
                  >
                    Contacted
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBulkRemark()}
                    className="w-full text-left px-2.5 py-2 hover:bg-amber-50 rounded-lg text-[10px] font-extrabold text-amber-600 uppercase tracking-wider"
                  >
                    Remarked
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBulkStatusChange("declined")}
                    className="w-full text-left px-2.5 py-2 hover:bg-red-50 rounded-lg text-[10px] font-extrabold text-red-650 uppercase tracking-wider"
                  >
                    Declined
                  </button>
                </div>
              </div>

              {/* Delete button */}
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3.5 py-2 bg-red-55/60 hover:bg-red-500 border border-red-100 hover:border-red-500 text-red-600 hover:text-white rounded-xl text-[10px] font-extrabold transition-all flex items-center gap-1 uppercase tracking-wider shadow-sm"
              >
                <Trash2 size={12} className="shrink-0" />
                <span>Delete</span>
              </button>

              {/* Cancel selection */}
              <button
                type="button"
                onClick={() => setSelectedLeadIds([])}
                className="px-3 py-2 hover:bg-slate-50 text-slate-450 hover:text-slate-750 text-[10px] font-extrabold rounded-xl transition-all uppercase tracking-wider"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Meeting Modal */}
      <ScheduleMeetingModal
        isOpen={!!selectedLeadForMeeting}
        onClose={() => setSelectedLeadForMeeting(null)}
        lead={selectedLeadForMeeting}
        onSuccess={onRefresh}
      />
    </div>
  );
}

