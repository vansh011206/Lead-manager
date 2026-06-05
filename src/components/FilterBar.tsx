"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  filterOptions: {
    countries: string[];
    regions: string[];
    industries: string[];
    batches: { id: string; fileName: string; uploadedAt: Date | string }[];
  };
  totalCount: number;
  showingCount: number;
  fixedStatus?: string;
}

export default function FilterBar({
  filterOptions,
  totalCount,
  showingCount,
  fixedStatus,
}: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const isInitialMount = useRef(true);

  const currentStatus = fixedStatus || searchParams.get("status") || "all";
  const currentCountry = searchParams.get("country") || "all";
  const currentRegion = searchParams.get("region") || "all";
  const currentIndustry = searchParams.get("industry") || "all";
  const currentBatch = searchParams.get("batchId") || "all";
  const currentSort = searchParams.get("sortBy") || "date_desc";

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const delayDebounceFn = setTimeout(() => {
      updateQueryParam("search", searchTerm);
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
  }, [searchParams]);

  const updateQueryParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");

    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearAll = () => {
    setSearchTerm("");
    const params = new URLSearchParams();
    if (fixedStatus) {
      params.set("status", fixedStatus);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasActiveFilters =
    (searchTerm !== "") ||
    (!fixedStatus && currentStatus !== "all") ||
    (currentCountry !== "all") ||
    (currentRegion !== "all") ||
    (currentIndustry !== "all") ||
    (currentBatch !== "all");

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search & Sort Header */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by lead name or business..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#0D99FF] focus:ring-1 focus:ring-[#0D99FF] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex items-center space-x-2 shrink-0">
              <SlidersHorizontal size={13} className="text-[#0D99FF]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sort By</span>
            </div>
            <select
              value={currentSort}
              onChange={(e) => updateQueryParam("sortBy", e.target.value)}
              className="py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-650 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all"
            >
              <option value="date_desc">Date Added (Newest)</option>
              <option value="date_asc">Date Added (Oldest)</option>
              <option value="name_asc">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="company">Company Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 border-t border-slate-100 pt-4">
          {/* Status */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
            <select
              value={currentStatus}
              onChange={(e) => updateQueryParam("status", e.target.value)}
              disabled={!!fixedStatus}
              className={cn(
                "w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-655 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all",
                fixedStatus && "opacity-50 cursor-not-allowed"
              )}
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="remarked">Remarked</option>
              <option value="declined">Declined</option>
            </select>
          </div>

          {/* Country */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Country</label>
            <select
              value={currentCountry}
              onChange={(e) => updateQueryParam("country", e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-655 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all"
            >
              <option value="all">All Countries</option>
              {filterOptions.countries.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Region */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Region</label>
            <select
              value={currentRegion}
              onChange={(e) => updateQueryParam("region", e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-655 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all"
            >
              <option value="all">All Regions</option>
              {filterOptions.regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Industry */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry</label>
            <select
              value={currentIndustry}
              onChange={(e) => updateQueryParam("industry", e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-655 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all"
            >
              <option value="all">All Industries</option>
              {filterOptions.industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Batch */}
          <div className="flex flex-col space-y-1.5 col-span-2 sm:col-span-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Upload Batch</label>
            <select
              value={currentBatch}
              onChange={(e) => updateQueryParam("batchId", e.target.value)}
              className="w-full py-2 px-3 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-655 focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all"
            >
              <option value="all">All Batches</option>
              {filterOptions.batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.fileName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info & Reset Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
          <span className="text-xs text-slate-450 font-medium">
            Showing <strong className="text-slate-800 font-bold">{showingCount}</strong> of{" "}
            <strong className="text-slate-800 font-bold">{totalCount}</strong> leads
          </span>

          {hasActiveFilters && (
            <button
              onClick={handleClearAll}
              className="flex items-center space-x-1.5 text-xs text-red-500 hover:text-red-600 font-bold px-3 py-1.5 rounded-xl hover:bg-red-50 border border-transparent hover:border-red-200 transition-all"
            >
              <X size={12} />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
