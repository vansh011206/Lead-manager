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
} from "lucide-react";
import { getStatusColor, getNameColor } from "@/lib/nameToColor";
import { formatDate, cleanContactInfo, getFirstPhone } from "@/lib/utils";
import Link from "next/link";
import { cn } from "@/lib/utils";
import RemarkModal from "@/components/RemarkModal";

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

interface LeadDetailProps {
  lead: Lead & { uploadBatch: UploadBatch | null };
  backUrl: string;
  onAction: (status: string, remark?: string) => Promise<void>;
  isLoading: boolean;
  hasNext: boolean;
}

export default function LeadDetail({ lead, backUrl, onAction, isLoading, hasNext }: LeadDetailProps) {
  const [isRemarkOpen, setRemarkOpen] = useState(false);
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

  return (
    <div className="space-y-6 text-slate-700 pb-28">
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

        <Link
          href={backUrl}
          className="flex items-center space-x-1.5 self-start text-xs font-bold px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/80 shadow-sm rounded-xl text-slate-600 hover:text-slate-800 transition-all"
        >
          <ArrowLeft size={14} />
          <span>Back to List</span>
        </Link>
      </div>

      {/* Profile Header Block */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
        {/* Banner with gradient generated from name */}
        <div
          className="h-28 relative"
          style={{
            background: `linear-gradient(135deg, ${nameGradient.from}, ${nameGradient.to})`,
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
                  <a
                    href={`tel:${phone}`}
                    className="text-sm sm:text-base font-bold text-[#0D99FF] hover:text-[#0575E6] transition-colors bg-[#0D99FF]/8 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15"
                  >
                    {phone}
                  </a>
                ) : (
                  <span className="text-sm font-semibold text-slate-400 italic">Not Mentioned</span>
                );
              })()}
            </div>
          </div>
          <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-2">
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
                <div className="flex flex-wrap gap-2 mt-1">
                  {(() => {
                    const phones = cleanContactInfo(lead.contactMobilePhone);
                    return phones.length > 0 ? (
                      phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone}`}
                          className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15 transition-all"
                        >
                          {phone}
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
                  Other Phone Numbers
                </label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {(() => {
                    const phones = cleanContactInfo(lead.contactPhoneNumbers);
                    return phones.length > 0 ? (
                      phones.map((phone, idx) => (
                        <a
                          key={idx}
                          href={`tel:${phone}`}
                          className="inline-flex items-center text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] bg-[#0D99FF]/8 hover:bg-[#0D99FF]/12 px-3 py-1.5 rounded-lg border border-[#0D99FF]/15 transition-all"
                        >
                          {phone}
                        </a>
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
      </div>

      {/* Floating Action Dock Panel */}
      <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-3 sm:px-4 animate-scale-up">
        <div className="bg-[#121A2E]/97 backdrop-blur-lg border border-[#0D99FF]/35 shadow-[0_20px_50px_rgba(13,153,255,0.22)] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1 hidden sm:block">
            <p className="text-[10px] font-extrabold text-[#00C2FF] uppercase tracking-widest truncate">
              Outreach Status Action
            </p>
            <p className="text-lg font-extrabold text-white truncate mt-1">
              {lead.prospectFullName}
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 shrink-0 w-full sm:w-auto">
            {/* Declined button */}
            <button
              onClick={() => handleStatusChange("declined")}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 hover:bg-red-650 hover:border-red-650 text-red-400 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-250 shadow-md hover:shadow-red-500/25 disabled:opacity-50"
            >
              <XCircle size={16} className="shrink-0" />
              <span>Decline</span>
            </button>

            {/* Remark button */}
            <button
              onClick={() => setRemarkOpen(true)}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border-2 border-amber-500/50 bg-amber-500/10 hover:bg-amber-550 hover:border-amber-550 text-amber-400 hover:text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-250 shadow-md hover:shadow-amber-500/25 disabled:opacity-50"
            >
              <MessageSquare size={16} className="shrink-0" />
              <span>Remark</span>
            </button>

            {/* Contacted button */}
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isLoading}
              className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-[#10B981] border-2 border-emerald-500 hover:bg-emerald-600 hover:border-emerald-650 text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest transition-all duration-250 shadow-lg hover:shadow-emerald-550/35 disabled:opacity-50"
            >
              <Check size={16} className="shrink-0" />
              <span className="hidden sm:inline">Mark </span><span>Contacted</span>
              {hasNext && <ChevronRight size={14} className="ml-0.5 shrink-0" />}
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
    </div>
  );
}
