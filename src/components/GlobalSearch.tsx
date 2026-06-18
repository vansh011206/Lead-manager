"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, Loader2, FileText, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  businessName: string | null;
  prospectFullName: string;
  status: string;
  uploadBatch: {
    fileName: string;
  } | null;
}

export default function GlobalSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Click outside handler
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/leads/global-search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  const handleSelect = (id: string) => {
    router.push(`/lead/${id}`);
    setQuery("");
    setIsOpen(false);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; class: string }> = {
      new: { label: "New", class: "bg-blue-50 text-[#0D99FF] border-blue-100" },
      contacted: { label: "Contacted", class: "bg-emerald-50 text-emerald-600 border-emerald-100" },
      remarked: { label: "Remarked", class: "bg-amber-50 text-amber-600 border-amber-100" },
      declined: { label: "Declined", class: "bg-red-50 text-red-600 border-red-100" },
    };

    const current = statusMap[status.toLowerCase()] || { label: status, class: "bg-slate-50 text-slate-600 border-slate-100" };

    return (
      <span className={cn("inline-block border text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wider", current.class)}>
        {current.label}
      </span>
    );
  };

  return (
    <div ref={containerRef} className="relative w-full z-[999]">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 text-slate-400 pointer-events-none" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
          placeholder="Search restaurant or contact..."
          className="w-full pl-11 pr-10 py-2.5 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 placeholder-slate-400 border border-slate-200/80 focus:border-[#0D99FF] rounded-2xl outline-none transition-all focus:shadow-sm"
        />
        {isLoading ? (
          <Loader2 className="absolute right-3.5 text-slate-400 animate-spin" size={16} />
        ) : query ? (
          <button
            onClick={handleClear}
            className="absolute right-3.5 p-0.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={16} />
          </button>
        ) : null}
      </div>

      {/* Dropdown Results list */}
      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-xl z-[999] overflow-hidden max-h-[400px] flex flex-col">
          {/* Header */}
          <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            Matching prospects
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
            {results.length === 0 ? (
              <div className="px-5 py-8 text-center text-slate-500">
                <Search className="mx-auto mb-2 text-slate-300" size={24} />
                <p className="text-sm font-semibold">No results found</p>
                <p className="text-xs text-slate-400 mt-1">We couldn&apos;t find any restaurant or contact matching &quot;{query}&quot;</p>
              </div>
            ) : (
              results.map((lead) => {
                const displayName = lead.prospectFullName;
                const categoryName = lead.businessName;

                return (
                  <button
                    key={lead.id}
                    onClick={() => handleSelect(lead.id)}
                    className="w-full text-left px-4 py-3 hover:bg-[#0D99FF]/5 flex items-start justify-between gap-3 group transition-all"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-700 group-hover:text-[#0D99FF] transition-colors truncate block">
                          {displayName}
                        </span>
                      </div>
                      
                      {categoryName && (
                        <span className="text-xs text-slate-400 block mt-0.5 font-medium">
                          Category: {categoryName}
                        </span>
                      )}

                      {lead.uploadBatch?.fileName && (
                        <div className="flex items-center text-[11px] text-slate-400 font-medium mt-1 gap-1">
                          <FileText size={12} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[220px]">
                            {lead.uploadBatch.fileName}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col items-end gap-1.5 shrink-0">
                      {getStatusBadge(lead.status)}
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0D99FF] transform group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100" />
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
