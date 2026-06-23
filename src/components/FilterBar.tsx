"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X, SlidersHorizontal, ArrowUpDown, ChevronDown } from "lucide-react";
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

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  alignClass?: string;
  hideLabel?: boolean;
}

function CustomSelect({ label, value, onChange, options, disabled, alignClass, hideLabel }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value) || options[0];

  return (
    <div className="flex flex-col space-y-1.5 relative w-full" ref={dropdownRef}>
      {!hideLabel && <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</label>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full py-2.5 px-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-semibold focus:outline-none focus:bg-white focus:border-[#0D99FF] transition-all flex items-center justify-between text-left shadow-sm hover:bg-slate-100/50",
          disabled && "opacity-50 cursor-not-allowed",
          isOpen && "border-[#0D99FF] bg-white ring-1 ring-[#0D99FF]/20"
        )}
      >
        <span className="truncate">{selectedOption?.label}</span>
        <ChevronDown size={14} className={cn("text-slate-400 transition-transform shrink-0 ml-1.5", isOpen && "rotate-180")} />
      </button>

      {isOpen && !disabled && (
        <div className={cn(
          "absolute top-[calc(100%+4px)] z-50 w-full min-w-[200px] max-h-60 overflow-y-auto bg-white border border-slate-200/80 rounded-xl shadow-xl py-1.5 focus:outline-none origin-top transition-all duration-100 ease-out",
          alignClass || "left-0"
        )}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                "w-full px-3.5 py-2 text-left text-xs font-medium hover:bg-slate-50 transition-colors truncate block",
                opt.value === value ? "text-[#0D99FF] bg-blue-50/50 font-bold" : "text-slate-650"
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
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

  const currentBatch = searchParams.get("batchId") || "all";

  const hasActiveDropdownFilters = currentBatch !== "all";

  const batchOptions = [
    { value: "all", label: "All Batches" },
    ...filterOptions.batches.map((b) => ({ value: b.id, label: b.fileName })),
  ];

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
    hasActiveDropdownFilters;

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search & Upload Batch Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by name, business or phone number..."
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

          {/* Upload Batch Dropdown */}
          <div className="w-full sm:w-64 shrink-0 overflow-visible">
            <CustomSelect
              label="Upload Batch"
              value={currentBatch}
              onChange={(val) => updateQueryParam("batchId", val)}
              options={batchOptions}
              alignClass="right-0"
              hideLabel={true}
            />
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
