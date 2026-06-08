"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, FileText, Database, ArrowRight, Trash2, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";

interface BatchItem {
  id: string;
  fileName: string;
  totalRecords: number;
  uploadedAt: string | Date;
  columnMapping?: string | null;
  _count: {
    leads: number;
  };
}

interface UploadHistoryProps {
  batches: BatchItem[];
  isLoading: boolean;
  onDeleteSuccess?: (deletedId: string) => void;
}

export default function UploadHistory({ batches, isLoading, onDeleteSuccess }: UploadHistoryProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteBatch, setConfirmDeleteBatch] = useState<BatchItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && confirmDeleteBatch) {
        setConfirmDeleteBatch(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [confirmDeleteBatch]);

  const handleDeleteClick = (batch: BatchItem) => {
    setConfirmDeleteBatch(batch);
  };

  const handleDeleteConfirm = async () => {
    if (!confirmDeleteBatch) return;
    const batch = confirmDeleteBatch;
    setConfirmDeleteBatch(null);

    setDeletingId(batch.id);
    try {
      const res = await fetch(`/api/uploads/${batch.id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success(`Successfully deleted "${batch.fileName}" and all associated leads.`);
        onDeleteSuccess?.(batch.id);
      } else {
        const data = await res.json();
        toast.error(data.error || "Failed to delete dataset.");
      }
    } catch (err) {
      console.error("Delete batch error:", err);
      toast.error("An unexpected error occurred while deleting the dataset.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Upload History</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="shimmer h-36 rounded-3xl border border-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-slate-600">
      <div className="flex items-center space-x-2.5">
        <div className="p-2 bg-[#0D99FF]/10 text-[#00C2FF] rounded-lg border border-[#0D99FF]/20">
          <HistoryIcon size={18} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Upload History</h2>
      </div>

      {batches.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-sm">
          <Database size={36} className="text-slate-400 mb-3" />
          <p className="text-sm font-bold text-slate-700">No Upload History</p>
          <p className="text-xs text-slate-400 mt-1 font-medium">
            Imported CSV batches will be displayed here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {batches.map((batch) => (
            <div
              key={batch.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 hover:border-[#0D99FF]/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.04)] shadow-sm ${deletingId === batch.id ? "opacity-50 pointer-events-none" : ""}`}
            >
              {/* Card top */}
              <div className="space-y-3">
                <div className="flex items-start justify-between space-x-3">
                  <div className="p-2 bg-blue-50 text-[#0D99FF] rounded-lg shrink-0">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4
                      className="text-sm font-bold text-slate-800 truncate group-hover:text-[#0D99FF] transition-colors"
                      title={batch.fileName}
                    >
                      {batch.fileName}
                    </h4>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(batch)}
                    disabled={deletingId === batch.id}
                    title="Delete this dataset"
                    className="p-1.5 rounded-lg bg-red-50 text-red-500 border border-red-100 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 shrink-0 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="flex items-center text-xs text-slate-450 space-x-1.5 font-medium">
                  <Clock size={12} className="text-slate-400 shrink-0" />
                  <span>{formatDate(batch.uploadedAt)}</span>
                </div>
              </div>

              {/* Card bottom */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Records Imported
                  </span>
                  <span className="text-base font-extrabold text-slate-800 mt-0.5 block">
                    {batch._count.leads}
                  </span>
                </div>

                <Link
                  href={`/leads?batchId=${batch.id}`}
                  className="flex items-center space-x-1 text-xs font-bold text-[#0D99FF] hover:text-[#0D99FF] transition-colors group/btn"
                >
                  <span>View Leads</span>
                  <ArrowRight
                    size={14}
                    className="transform transition-transform group-hover/btn:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmDeleteBatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-red-500/10 text-red-600 border border-red-200/50">
                  <Trash2 size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-base">Delete Dataset</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">This action cannot be undone</p>
                </div>
              </div>
              <button
                onClick={() => setConfirmDeleteBatch(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-sm text-slate-650 leading-relaxed font-medium">
                Are you sure you want to permanently delete the dataset <strong className="text-slate-800">"{confirmDeleteBatch.fileName}"</strong>?
              </p>
              <div className="p-4 rounded-2xl bg-red-50 border border-red-100 flex items-start space-x-3">
                <Trash2 size={16} className="text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-700 leading-relaxed font-bold">
                  This will permanently delete all <strong className="text-red-950">{confirmDeleteBatch._count.leads}</strong> associated leads from the database.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end px-6 py-4 bg-slate-50/50 border-t border-slate-100 gap-3">
              <button
                onClick={() => setConfirmDeleteBatch(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-550 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all shadow-md hover:shadow-red-500/20 active:translate-y-0"
              >
                <Trash2 size={14} />
                <span>Delete Dataset</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HistoryIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
