"use client";

import { useState } from "react";
import { Lead, UploadBatch } from "@prisma/client";
import {
  Briefcase,
  Mail,
  Globe,
  Users,
  DollarSign,
  Map,
  Calendar,
  Layers,
  MessageSquare,
  ArrowLeft,
  Check,
  XCircle,
  ChevronRight,
  Phone,
  Trash2,
  Loader2,
  Clock,
  Sparkles,
} from "lucide-react";
import { getStatusColor, getNameColor } from "@/lib/nameToColor";
import { formatDate, cleanContactInfo, getFirstPhone, getWhatsappLink } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import RemarkModal from "@/components/RemarkModal";
import CallScriptModal from "@/components/CallScriptModal";
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

interface LeadDetailProps {
  lead: Lead & { uploadBatch: UploadBatch | null; meetings?: any[] };
  backUrl: string;
  onAction: (status: string, remark?: string) => Promise<void>;
  isLoading: boolean;
  hasNext: boolean;
}

export default function LeadDetail({ lead, backUrl, onAction, isLoading, hasNext }: LeadDetailProps) {
  const router = useRouter();
  const [isRemarkOpen, setRemarkOpen] = useState(false);
  const [isScriptOpen, setScriptOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const statusStyle = getStatusColor(lead.status);
  const nameGradient = getNameColor(lead.prospectFullName);

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

  const lightStatusClass = getLightStatusStyle(lead.status);

  const formatLinkedinUrl = (url: string | null) => {
    if (!url) return "";
    const trimmed = url.trim();
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  };

  const handleStatusChange = async (status: string, remark?: string) => {
    await onAction(status, remark);
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(`Are you sure you want to delete lead "${lead.prospectFullName}" completely?`);
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      const res = await fetch(`/api/leads/${lead.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete lead");
      }

      toast.success(`Deleted lead: ${lead.prospectFullName}`);
      router.push(backUrl);
    } catch (err: any) {
      console.error("Delete lead error:", err);
      toast.error(err.message || "Failed to delete lead");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-700 pb-10">
      {/* Breadcrumbs & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          <Link href="/" className="hover:text-slate-700 transition-colors">
            Dashboard
          </Link>
          <span className="text-slate-300">&gt;</span>
          <Link href={backUrl} className="hover:text-slate-700 transition-colors capitalize">
            Leads
          </Link>
          <span className="text-slate-300">&gt;</span>
          <span className="text-[#0D99FF] font-extrabold">{lead.prospectFullName}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
            className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2.5 bg-white hover:bg-red-50 hover:border-red-300 border border-slate-200/80 shadow-sm rounded-xl text-red-500 hover:text-red-700 transition-all"
          >
            {isDeleting ? (
              <Loader2 className="animate-spin text-red-500" size={14} />
            ) : (
              <Trash2 size={14} />
            )}
            <span>Delete Lead</span>
          </button>

          <Link
            href={backUrl}
            className="flex items-center space-x-1.5 self-start text-xs font-bold px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm rounded-xl text-slate-600 hover:text-slate-800 transition-all"
          >
            <ArrowLeft size={14} />
            <span>Back to List</span>
          </Link>
        </div>
      </div>

      {/* Profile Header Block */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {/* Banner with solid background color generated from name */}
        <div
          className="h-28 relative"
          style={{
            backgroundColor: nameGradient.from,
          }}
        >
          <div className="absolute top-6 right-6">
            <span
              className={cn(
                "flex items-center space-x-1.5 px-3.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-sm",
                lightStatusClass
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", statusStyle.dot)} />
              <span className="capitalize">{lead.status}</span>
            </span>
          </div>
        </div>

        {/* Profile Info Overlay */}
        <div className="px-4 sm:px-6 pb-6 pt-4 sm:flex sm:items-end sm:space-x-5">
          <div className="flex-1 min-w-0 sm:pt-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800 truncate">
              {lead.prospectFullName}
            </h1>
            {lead.prospectJobTitle && (
              <p className="text-slate-500 font-semibold mt-1.5 flex items-center text-xs sm:text-sm">
                <Briefcase size={14} className="mr-2 text-slate-400" />
                {lead.prospectJobTitle}
              </p>
            )}
            {/* Highlighted Phone Number */}
            <div className="mt-3 flex items-center space-x-2">
              <Phone size={15} className="text-[#0D99FF] shrink-0" />
              {(() => {
                const phone = getFirstPhone(lead.contactMobilePhone, lead.contactPhoneNumbers);
                return phone ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`tel:${phone}`}
                      className="text-sm sm:text-base font-bold text-[#0D99FF] hover:text-[#0575E6] transition-colors bg-[#0D99FF]/8 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15"
                    >
                      {phone}
                    </a>
                    <a
                      href={getWhatsappLink(phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#25D366] hover:text-[#1ebd59] transition-colors bg-[#25D366]/8 px-3 py-1.5 rounded-lg border border-[#25D366]/15 shadow-sm"
                    >
                      <WhatsappIcon size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <span className="text-sm font-semibold text-slate-400 italic">Not Mentioned</span>
                );
              })()}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
            <button
              onClick={() => setScriptOpen(true)}
              className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#0D99FF] to-[#00C2FF] hover:from-[#0575E6] hover:to-[#00A3D9] text-white font-extrabold text-xs shadow-md shadow-blue-500/10 transition-all hover:-translate-y-0.5"
            >
              <Sparkles size={14} className="animate-pulse" />
              <span>View Script</span>
            </button>

            {lead.prospectLinkedin && (
              <a
                href={formatLinkedinUrl(lead.prospectLinkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#0A66C2] hover:bg-[#0855A1] text-white font-bold text-xs shadow-md shadow-[#0A66C2]/10 transition-all hover:-translate-y-0.5"
              >
                <LinkedinIcon size={14} className="fill-current" />
                <span>View LinkedIn</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Detail Sections Grid (Clean side-by-side layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section: Contact Information */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center uppercase tracking-wider">
              <Mail className="mr-2.5 text-[#0D99FF]" size={18} />
              <span>Contact Information</span>
            </h3>

            <div className="mt-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Professional Email
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(() => {
                    const emails = cleanContactInfo(lead.contactProfessionalEmail);
                    return emails.length > 0 ? (
                      emails.map((email, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${email}`}
                          className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1 rounded-lg border border-[#0D99FF]/15 transition-all truncate"
                        >
                          {email}
                        </a>
                      ))
                    ) : (
                      <span className="text-sm text-slate-455 italic font-medium">Not Available</span>
                    );
                  })()}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Other Emails
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(() => {
                    const emails = cleanContactInfo(lead.contactEmails);
                    return emails.length > 0 ? (
                      emails.map((email, idx) => (
                        <a
                          key={idx}
                          href={`mailto:${email}`}
                          className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1 rounded-lg border border-[#0D99FF]/15 transition-all truncate"
                        >
                          {email}
                        </a>
                      ))
                    ) : (
                      <span className="text-sm text-slate-455 italic font-medium">Not Available</span>
                    );
                  })()}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Mobile Phone
                </label>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {(() => {
                    const phones = cleanContactInfo(lead.contactMobilePhone);
                    return phones.length > 0 ? (
                      phones.map((phone, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <a
                            href={`tel:${phone}`}
                            className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15 transition-all"
                          >
                            {phone}
                          </a>
                          <a
                            href={getWhatsappLink(phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 text-[#25D366] hover:text-[#1ebd59] bg-[#25D366]/8 hover:bg-[#25D366]/12 rounded-lg border border-[#25D366]/15 transition-all shadow-sm"
                            title="Open in WhatsApp"
                          >
                            <WhatsappIcon size={13} />
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-slate-455 italic font-medium">Not Available</span>
                    );
                  })()}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Other Phone Numbers
                </label>
                <div className="flex flex-wrap gap-2.5 mt-1">
                  {(() => {
                    const phones = cleanContactInfo(lead.contactPhoneNumbers);
                    return phones.length > 0 ? (
                      phones.map((phone, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <a
                            href={`tel:${phone}`}
                            className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15 transition-all"
                          >
                            {phone}
                          </a>
                          <a
                            href={getWhatsappLink(phone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center p-2 text-[#25D366] hover:text-[#1ebd59] bg-[#25D366]/8 hover:bg-[#25D366]/12 rounded-lg border border-[#25D366]/15 transition-all shadow-sm"
                            title="Open in WhatsApp"
                          >
                            <WhatsappIcon size={13} />
                          </a>
                        </div>
                      ))
                    ) : (
                      <span className="text-sm text-slate-455 italic font-medium">Not Available</span>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Business Information */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center uppercase tracking-wider">
              <Globe className="mr-2.5 text-[#0D99FF]" size={18} />
              <span>Business Information</span>
            </h3>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Company Name
                </label>
                <p className="text-base text-slate-800 mt-1 font-bold truncate">
                  {lead.businessName || <span className="text-slate-450 italic font-medium">Not Available</span>}
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Website
                </label>
                {lead.businessWebsite ? (
                  <a
                    href={
                      lead.businessWebsite.startsWith("http")
                        ? lead.businessWebsite
                        : `https://${lead.businessWebsite}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-base text-[#0D99FF] hover:text-[#0575E6] mt-1 font-semibold truncate"
                  >
                    {lead.businessWebsite}
                  </a>
                ) : (
                  <p className="text-base text-slate-450 mt-1 italic font-medium">Not Available</p>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Employees
                </label>
                <div className="flex items-center text-base text-slate-700 mt-1 font-semibold">
                  <Users size={15} className="mr-2 text-slate-400" />
                  <span>{lead.businessNumberOfEmployees || "N/A"}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Yearly Revenue
                </label>
                <div className="flex items-center text-base text-slate-700 mt-1 font-semibold">
                  <DollarSign size={15} className="mr-0.5 text-slate-400" />
                  <span>{lead.businessYearlyRevenue || "N/A"}</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Location
                </label>
                <div className="flex items-center text-base text-slate-700 mt-1 font-semibold">
                  <Map size={15} className="mr-2 text-slate-400" />
                  <span className="truncate">
                    {[lead.businessRegion, lead.businessCountry].filter(Boolean).join(", ") || "N/A"}
                  </span>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Industry / NAICS
                </label>
                <div className="flex items-center text-base text-slate-700 mt-1 font-semibold">
                  <Layers size={15} className="mr-2 text-slate-400" />
                  <span className="truncate" title={lead.businessNaicsDescription || ""}>
                    {lead.businessNaicsDescription || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Remarks (Inline render) */}
        {lead.remark && (
          <div className="col-span-1 md:col-span-2 bg-amber-50 border border-amber-200/80 rounded-3xl p-8 sm:p-10">
            <h3 className="text-sm font-bold text-amber-700 pb-3 flex items-center uppercase tracking-wider">
              <MessageSquare className="mr-2 text-amber-500" size={16} />
              <span>Current Remark</span>
            </h3>
            <p className="mt-3 text-base text-slate-700 leading-relaxed italic bg-white p-5 rounded-xl border border-amber-200/60">
              &quot;{lead.remark}&quot;
            </p>
          </div>
        )}

        {/* Section: Scheduled Meetings */}
        {lead.meetings && lead.meetings.length > 0 && (
          <div className="col-span-1 md:col-span-2 bg-emerald-50 border border-emerald-200/80 rounded-3xl p-8 sm:p-10">
            <h3 className="text-sm font-bold text-emerald-700 pb-3 flex items-center uppercase tracking-wider border-b border-emerald-100/60">
              <Calendar className="mr-2 text-emerald-500" size={16} />
              <span>Scheduled Meetings</span>
            </h3>
            <div className="mt-6 space-y-4">
              {lead.meetings.map((meeting: any) => {
                const formattedDate = new Date(meeting.scheduledAt).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return (
                  <div key={meeting.id} className="bg-white p-5 rounded-2xl border border-emerald-150 shadow-sm flex flex-col space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h4 className="text-base font-extrabold text-slate-800">{meeting.title}</h4>
                      <span className="inline-flex items-center text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full w-fit">
                        <Clock size={12} className="mr-1.5" />
                        {formattedDate}
                      </span>
                    </div>
                    {meeting.agenda && (
                      <div className="text-sm text-slate-600 bg-slate-50 rounded-xl p-3.5 border border-slate-100 font-medium">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Agenda / Notes</div>
                        <p className="whitespace-pre-wrap">{meeting.agenda}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section: Metadata */}
        <div className="col-span-1 md:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center uppercase tracking-wider">
            <Calendar className="mr-2.5 text-[#0D99FF]" size={16} />
            <span>Audit & Seeding Information</span>
          </h3>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Original CSV Date
              </span>
              <span className="text-sm text-slate-650 font-semibold block mt-1">
                {lead.originalCreatedAt || "N/A"}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                System Import Date
              </span>
              <span className="text-sm text-slate-650 font-semibold block mt-1">
                {formatDate(lead.createdAt)}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Source File
              </span>
              <span className="text-sm text-[#0D99FF] font-semibold block mt-1 truncate">
                {lead.uploadBatch?.fileName || "Manual Entry / Unknown"}
              </span>
            </div>
          </div>
        </div>

        {/* Section: Original Spreadsheet Fields (Dynamic) */}
        {(lead as any).rawData && (
          <div className="col-span-1 md:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-3 flex items-center uppercase tracking-wider">
              <Layers className="mr-2.5 text-[#0D99FF]" size={16} />
              <span>Original Spreadsheet Fields</span>
            </h3>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {(() => {
                try {
                  const parsed = JSON.parse((lead as any).rawData);
                  return Object.entries(parsed).map(([key, val]) => (
                    <div key={key} className="border-b border-slate-50 pb-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                        {key}
                      </label>
                      <span className="text-sm text-slate-750 font-semibold mt-1 block truncate" title={String(val || "")}>
                        {val ? String(val) : <span className="text-slate-350 italic font-normal">-</span>}
                      </span>
                    </div>
                  ));
                } catch {
                  return <p className="text-sm text-slate-400 italic">Error parsing original sheet fields</p>;
                }
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Dock Panel */}
      <div className="sticky bottom-4 sm:bottom-6 z-40 w-full max-w-3xl lg:max-w-4xl mx-auto px-3 sm:px-4 mt-8 animate-scale-up">
        <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-3 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="w-[280px] pr-4 hidden sm:block shrink-0">
            <p className="text-[10px] font-extrabold text-[#0D99FF] uppercase tracking-widest">
              Outreach Status Action
            </p>
            <p className="text-base font-extrabold text-slate-800 mt-1 whitespace-normal break-words leading-tight">
              {lead.prospectFullName}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-3 shrink-0 w-full sm:w-auto">
            {/* Declined button */}
            <button
              onClick={() => handleStatusChange("declined")}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1 sm:space-x-2 px-2.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-red-200 bg-red-50 hover:bg-red-650 hover:border-red-650 text-red-600 hover:text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-250 shadow-sm disabled:opacity-50"
            >
              <XCircle size={14} className="shrink-0 sm:w-4 sm:h-4" />
              <span>Decline</span>
            </button>

            {/* Remark button */}
            <button
              onClick={() => setRemarkOpen(true)}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1 sm:space-x-2 px-2.5 sm:px-5 py-2.5 sm:py-3 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-600 hover:border-amber-600 text-amber-700 hover:text-white text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-250 shadow-sm disabled:opacity-50"
            >
              <MessageSquare size={14} className="shrink-0 sm:w-4 sm:h-4" />
              <span>Remark</span>
            </button>

            {/* Contacted button */}
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#10B981] border border-emerald-500 hover:bg-emerald-600 hover:border-emerald-600 text-white text-[10px] sm:text-xs md:text-sm font-extrabold uppercase tracking-widest transition-all duration-250 shadow-sm disabled:opacity-50"
            >
              <Check size={14} className="shrink-0 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Mark </span><span>Contacted</span>
              {hasNext && <ChevronRight size={12} className="ml-0.5 shrink-0 sm:w-3.5 sm:h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Remark Input Modal Overlay */}
      <RemarkModal
        isOpen={isRemarkOpen}
        onClose={() => setRemarkOpen(false)}
        leadName={lead.prospectFullName}
        onSave={async (remarkText) => {
          setRemarkOpen(false);
          await handleStatusChange("remarked", remarkText);
        }}
      />

      {/* AI Cold Call Script Modal Overlay */}
      <CallScriptModal
        isOpen={isScriptOpen}
        onClose={() => setScriptOpen(false)}
        lead={lead}
      />
    </div>
  );
}
