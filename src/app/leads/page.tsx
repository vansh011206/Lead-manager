"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Users, ChevronLeft, ChevronRight, HelpCircle } from "lucide-react";
import FilterBar from "@/components/FilterBar";
import LeadsTable from "@/components/LeadsTable";
import Link from "next/link";

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

interface FilterOptions {
  countries: string[];
  regions: string[];
  industries: string[];
  batches: { id: string; fileName: string; uploadedAt: string }[];
}

function LeadsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    countries: [],
    regions: [],
    industries: [],
    batches: [],
  });

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/leads?${searchParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setLeads(data.leads);
          setTotal(data.total);
          setTotalPages(data.totalPages);
          setFilterOptions(data.filterOptions);
        }
      } catch (error) {
        console.error("Failed to load leads:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [searchParams, refreshTrigger]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const startIndex = (currentPage - 1) * 20 + 1;
  const endIndex = Math.min(currentPage * 20, total);
  const filterParamsString = searchParams.toString();

  return (
    <div className="p-6 sm:p-8 w-full space-y-8 animate-fade-in text-slate-600">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-800 flex items-center">
            <Users className="mr-3 text-[#0D99FF]" size={28} />
            <span>All Leads Database</span>
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium">
            Browse, filter, and drill down into individual profiles.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar
        filterOptions={filterOptions}
        totalCount={total}
        showingCount={leads.length}
      />

      {/* Vertical Stack Content / Loader */}
      {isLoading ? (
        <div className="space-y-4">
          <div className="shimmer h-12 w-full rounded-2xl border border-slate-200" />
          <div className="shimmer h-64 w-full rounded-3xl border border-slate-200" />
        </div>
      ) : leads.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-lg mx-auto flex flex-col items-center justify-center shadow-sm">
          <HelpCircle size={48} className="text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">No Leads Found</h3>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            No prospects match your query. Try clearing some filters, searching for a different keyword, or upload a new CSV sheet.
          </p>
          <div className="mt-6">
            <Link
              href="/uploads"
              className="px-5 py-2.5 rounded-xl bg-[#0D99FF] hover:bg-[#00C2FF] text-white hover:shadow-md text-xs font-bold transition-all"
            >
              Upload CSV
            </Link>
          </div>
        </div>
      ) : (
        /* Leads Table view */
        <LeadsTable
          leads={leads as any}
          filterParams={filterParamsString}
          onRefresh={() => setRefreshTrigger((prev) => prev + 1)}
        />
      )}

      {/* Pagination Footer */}
      {!isLoading && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-200 pt-6 mt-6 gap-4">
          <span className="text-xs text-slate-500 font-medium">
            Showing <strong className="text-slate-850">{startIndex}-{endIndex}</strong> of{" "}
            <strong className="text-slate-850">{total}</strong> leads
          </span>

          <div className="flex items-center space-x-2">
            {/* Previous */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-550 disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-slate-200 shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Numbers */}
            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              const isCurrent = p === currentPage;
              return (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    isCurrent
                      ? "bg-[#0D99FF] border-[#0D99FF] text-white shadow-md shadow-[#0D99FF]/20"
                      : "bg-white hover:bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-850"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-550 disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-slate-200 shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import { Suspense } from "react";

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 w-full space-y-6 text-slate-500">
          Loading leads database...
        </div>
      }
    >
      <LeadsPageContent />
    </Suspense>
  );
}
