"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageSquare, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface ContactRemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (remark: string) => void;
  leadName: string;
}

export default function ContactRemarkModal({
  isOpen,
  onClose,
  onSave,
  leadName,
}: ContactRemarkModalProps) {
  const [remark, setRemark] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize fields on open
  useEffect(() => {
    if (isOpen) {
      setRemark("");
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = () => {
    let finalRemark = remark.trim();
    if (!finalRemark) {
      finalRemark = "Marked contacted";
    }
    onSave(finalRemark);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl animate-scale-up relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 rounded-t-3xl bg-white">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-250/50">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Add Follow-up Note</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">For {leadName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Textarea Input */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Follow-up Note
            </span>
            <textarea
              ref={textareaRef}
              rows={4}
              placeholder="Enter your follow-up note about this lead..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-855 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none font-medium text-slate-700"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 bg-slate-50/50 border-t border-slate-100 gap-3 rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-sm"
          >
            <Save size={14} />
            <span>Save & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
