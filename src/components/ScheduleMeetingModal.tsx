"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Sparkles, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Lead {
  id: string;
  rowNum: number | null;
  prospectFullName: string;
  businessName: string | null;
  contactProfessionalEmail: string | null;
}

interface ScheduleMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: Lead | null;
  onSuccess?: () => void;
}

export default function ScheduleMeetingModal({
  isOpen,
  onClose,
  lead,
  onSuccess,
}: ScheduleMeetingModalProps) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState(12);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState<"AM" | "PM">("PM");
  const [agenda, setAgenda] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (lead && isOpen) {
      setTitle(`Meeting with ${lead.prospectFullName}`);
      
      // Default scheduled time to 1 hour from now
      const inOneHour = new Date(Date.now() + 60 * 60 * 1000);
      const year = inOneHour.getFullYear();
      const month = String(inOneHour.getMonth() + 1).padStart(2, "0");
      const day = String(inOneHour.getDate()).padStart(2, "0");
      setDate(`${year}-${month}-${day}`);
      
      // Calculate AM/PM hour
      let rawHours = inOneHour.getHours();
      const currentAmPm = rawHours >= 12 ? "PM" : "AM";
      setAmpm(currentAmPm);
      
      let displayHours = rawHours % 12;
      if (displayHours === 0) displayHours = 12;
      setHour(displayHours);
      
      // Snap minutes to nearest multiple of 5
      const rawMinutes = inOneHour.getMinutes();
      const roundedMinutes = Math.round(rawMinutes / 5) * 5;
      setMinute(roundedMinutes >= 60 ? 0 : roundedMinutes);
      
      setAgenda("");
    }
  }, [lead, isOpen]);

  if (!isOpen || !lead) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a meeting title");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    try {
      setIsSubmitting(true);

      // Convert hours and minutes based on AM/PM
      let finalHour = hour;
      if (ampm === "PM" && finalHour < 12) finalHour += 12;
      if (ampm === "AM" && finalHour === 12) finalHour = 0;

      const [year, month, day] = date.split("-").map(Number);
      const scheduledDate = new Date(year, month - 1, day, finalHour, minute);

      const response = await fetch("/api/meetings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead.id,
          title: title.trim(),
          agenda: agenda.trim() || null,
          scheduledAt: scheduledDate.toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to schedule meeting");
      }

      toast.success("Meeting scheduled and confirmation email sent!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("[ScheduleModal] Submit error:", error);
      toast.error(error.message || "Failed to schedule meeting");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 shadow-2xl transition-all animate-fade-in text-slate-700">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-650 transition-all border border-slate-100 shadow-sm"
        >
          <X size={15} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-150">
            <Calendar size={22} />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-800">Schedule Meeting</h3>
            <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Setup a calendar call for this prospect</p>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Lead Summary Info */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-150 flex flex-col space-y-1">
            <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Lead Prospect</span>
            <span className="text-sm font-bold text-slate-800 leading-tight">{lead.prospectFullName}</span>
            {lead.businessName && (
              <span className="text-xs font-semibold text-slate-500 truncate">{lead.businessName}</span>
            )}
            {lead.contactProfessionalEmail && (
              <span className="text-xs font-medium text-slate-400 truncate mt-0.5">{lead.contactProfessionalEmail}</span>
            )}
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center">
              <Sparkles size={11} className="mr-1.5 text-[#0D99FF]" />
              Meeting Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Discovery Call / Demo Session"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/10 text-slate-800 text-sm font-semibold transition-all outline-none"
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Date & Time Selection Box */}
          <div className="space-y-4 bg-slate-50 border border-slate-200/60 rounded-2xl p-4">
            
            {/* Date Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 flex items-center">
                <Calendar size={11} className="mr-1.5 text-[#0D99FF]" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/10 text-slate-850 text-xs font-bold transition-all outline-none bg-white"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Custom Sliding Time Selection */}
            <div className="flex flex-col gap-3.5 pt-3.5 border-t border-slate-200/60">
              
              {/* Hours Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="flex items-center">
                    <Clock size={11} className="mr-1.5 text-[#0D99FF]" />
                    Hour (1 - 12)
                  </span>
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg font-black text-xs border border-slate-200 select-none">
                    {String(hour).padStart(2, "0")}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  value={hour}
                  onChange={(e) => setHour(parseInt(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D99FF] focus:outline-none transition-all"
                />
              </div>

              {/* Minutes Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                  <span className="flex items-center">
                    <Clock size={11} className="mr-1.5 text-[#0D99FF]" />
                    Minute (00 - 55)
                  </span>
                  <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-lg font-black text-xs border border-slate-200 select-none">
                    {String(minute).padStart(2, "0")}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="55"
                  step="5"
                  value={minute}
                  onChange={(e) => setMinute(parseInt(e.target.value))}
                  disabled={isSubmitting}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D99FF] focus:outline-none transition-all"
                />
              </div>

              {/* AM/PM Toggle */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-600 block">Period</span>
                <div className="flex rounded-xl bg-slate-200/60 p-0.5 h-[34px] items-center w-full">
                  <button
                    type="button"
                    onClick={() => setAmpm("AM")}
                    disabled={isSubmitting}
                    className={cn(
                      "flex-1 h-full rounded-lg text-xs font-black transition-all",
                      ampm === "AM" ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    onClick={() => setAmpm("PM")}
                    disabled={isSubmitting}
                    className={cn(
                      "flex-1 h-full rounded-lg text-xs font-black transition-all",
                      ampm === "PM" ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-500 hover:text-slate-700"
                    )}
                  >
                    PM
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* Agenda / Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 flex items-center">
              <MessageSquare size={11} className="mr-1.5 text-[#0D99FF]" />
              Agenda / Notes (Optional)
            </label>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="Include Google Meet links or discussion agenda..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/10 text-slate-800 text-sm font-medium transition-all outline-none resize-none bg-white"
              disabled={isSubmitting}
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center space-x-3 pt-4 border-t border-slate-100 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 text-xs font-bold transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white hover:shadow-md text-xs font-bold transition-all flex items-center justify-center space-x-1.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
                  <span>Scheduling...</span>
                </>
              ) : (
                <span>Schedule Meeting</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
