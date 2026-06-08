"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  MessageSquare,
  XCircle,
  FileText,
  Upload,
  ArrowRight,
  TrendingUp,
  Clock,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import { useApp } from "@/components/Providers";
import { formatDate } from "@/lib/utils";

interface UploadBatch {
  id: string;
  fileName: string;
  totalRecords: number;
  uploadedAt: string;
}

export default function Dashboard() {
  const { sidebarCounts, refreshCounts } = useApp();
  const [recentUploads, setRecentUploads] = useState<UploadBatch[]>([]);
  const [isLoadingUploads, setIsLoadingUploads] = useState(true);

  useEffect(() => {
    refreshCounts();

    const fetchRecentUploads = async () => {
      try {
        const res = await fetch("/api/uploads", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          setRecentUploads(data.slice(0, 5));
        }
      } catch (error) {
        console.error("Failed to load recent uploads:", error);
      } finally {
        setIsLoadingUploads(false);
      }
    };

    fetchRecentUploads();
  }, []);

  return (
    <div className="p-4 sm:p-8 w-full space-y-10 animate-fade-in text-slate-600">
      {/* Welcome Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-100 border border-slate-200/80 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
            ForgeWeb Lead Manager
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Optimize your outreach process, track contacted accounts, and record pipeline feedback.
          </p>
        </div>
        <div className="flex items-center space-x-2 shrink-0 self-start sm:self-center">
          <TrendingUp className="text-[#0D99FF]" size={20} />
          <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0D99FF] bg-[#0D99FF]/10 px-3 py-1.5 rounded-full border border-[#0D99FF]/20">
            Performance active
          </span>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        <StatsCard
          title="Total Leads"
          value={sidebarCounts.all}
          icon={Users}
          color="indigo"
          description="Total database records"
          href="/leads?status=all"
        />
        <StatsCard
          title="New Leads"
          value={sidebarCounts.new}
          icon={Users}
          color="blue"
          description="Unprocessed records"
          href="/leads?status=new"
        />
        <StatsCard
          title="Contacted"
          value={sidebarCounts.contacted}
          icon={UserCheck}
          color="green"
          description="Outreach initiated"
          href="/contacted"
        />
        <StatsCard
          title="Remarked"
          value={sidebarCounts.remarked}
          icon={MessageSquare}
          color="amber"
          description="Follow-up scheduled"
          href="/remarked"
        />
        <StatsCard
          title="Declined"
          value={sidebarCounts.declined}
          icon={XCircle}
          color="red"
          description="Rejected / Do Not Call"
          href="/declined"
        />
      </div>

      {/* Bottom Panel Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Recent Uploads */}
        <div className="lg:col-span-2 bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center">
                <Clock className="mr-2.5 text-[#0D99FF]" size={18} />
                <span>Recent Uploads</span>
              </h3>
              <Link
                href="/uploads"
                className="text-xs sm:text-sm font-semibold text-[#0D99FF] hover:text-[#0575E6] flex items-center transition-colors"
              >
                <span>Manage files</span>
                <ArrowRight size={12} className="ml-1" />
              </Link>
            </div>

            <div className="mt-4 divide-y divide-slate-100">
              {isLoadingUploads ? (
                [1, 2, 3].map((n) => (
                  <div key={n} className="py-4 flex items-center justify-between">
                    <div className="shimmer h-10 w-2/3 rounded-lg" />
                    <div className="shimmer h-6 w-16 rounded" />
                  </div>
                ))
              ) : recentUploads.length === 0 ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <FileText className="text-slate-400 mb-3" size={36} />
                  <p className="text-sm font-bold text-slate-500">No uploads found</p>
                  <p className="text-xs text-slate-400 mt-1.5 font-medium">Upload a CSV or Excel file to get started</p>
                </div>
              ) : (
                recentUploads.map((batch) => (
                  <Link
                    key={batch.id}
                    href={`/leads?batchId=${batch.id}&status=all`}
                    className="py-4 flex items-center justify-between group/item hover:bg-slate-50 px-3 rounded-2xl transition-all cursor-pointer block"
                  >
                    <div className="min-w-0 flex-1 pr-3">
                      <p className="text-sm font-bold text-slate-700 truncate group-hover/item:text-[#0D99FF] transition-colors">
                        {batch.fileName}
                      </p>
                      <p className="text-xs text-slate-400 mt-1 font-medium">
                        Uploaded on {formatDate(batch.uploadedAt)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="inline-block bg-[#0D99FF]/10 text-[#0D99FF] border border-[#0D99FF]/20 text-xs font-bold px-3 py-1 rounded-full">
                        {batch.totalRecords} records
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800 border-b border-slate-100 pb-5">
              Quick Operations
            </h3>

            <div className="mt-6 space-y-4">
              <Link
                href="/uploads"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/50 border border-slate-200/80 hover:border-[#0D99FF]/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 bg-blue-50 text-[#0D99FF] rounded-xl border border-blue-100">
                    <Upload size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-700 block transition-colors group-hover:text-[#0D99FF]">Upload Sheet</span>
                    <span className="text-xs text-slate-400 block mt-0.5 font-medium">Import new contacts</span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-400 group-hover:text-[#0D99FF] transform group-hover:translate-x-1 transition-all"
                />
              </Link>

              <Link
                href="/leads"
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/50 border border-slate-200/80 hover:border-[#0D99FF]/40 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                    <Users size={16} />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-700 block transition-colors group-hover:text-[#0D99FF]">View Leads</span>
                    <span className="text-xs text-slate-400 block mt-0.5 font-medium">Browse CRM contacts</span>
                  </div>
                </div>
                <ArrowRight
                  size={16}
                  className="text-slate-400 group-hover:text-[#0D99FF] transform group-hover:translate-x-1 transition-all"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
