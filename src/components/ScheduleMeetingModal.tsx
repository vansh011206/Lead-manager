"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, Sparkles, MessageSquare, ChevronUp, ChevronDown } from "lucide-react";
import { toast } from "sonner";

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
      
      // Snap minutes to nearest multiple of 5 for convenient scheduling
      const rawMinutes = inOneHour.getMinutes();
      const roundedMinutes = Math.round(rawMinutes / 5) * 5;
      setMinute(roundedMinutes >= 60 ? 0 : roundedMinutes);
      
      setAgenda("");
    }
  }, [lead, isOpen]);

  if (!isOpen || !lead) return null;

  // Custom Time Handlers
  const incrementHour = () => {
    setHour((prev) => (prev === 12 ? 1 : prev + 1));
  };

  const decrementHour = () => {
    setHour((prev) => (prev === 1 ? 12 : prev - 1));
  };

  const incrementMinute = () => {
    setMinute((prev) => {
      const remainder = prev % 5;
      if (remainder !== 0) {
        return prev + (5 - remainder);
      }
      const next = prev + 5;
      return next >= 60 ? 0 : next;
    });
  };

  const decrementMinute = () => {
    setMinute((prev) => {
      const remainder = prev % 5;
      if (remainder !== 0) {
        return prev - remainder;
      }
      const next = prev - 5;
      return next < 0 ? 55 : next;
    });
  };

  const toggleAmPm = () => {
    setAmpm((prev) => (prev === "AM" ? "PM" : "AM"));
  };

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
      // Create local date object and convert to ISO string
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
      <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white border border-slate-200/80 p-6 shadow-2xl transition-all animate-scale-up text-slate-700">
        
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

          {/* Date & Time Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            {/* Date Selection */}
            <div className="space-y-1.5 flex-1">
              <label className="text-xs font-bold text-slate-600 flex items-center">
                <Calendar size={11} className="mr-1.5 text-[#0D99FF]" />
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/10 text-slate-800 text-sm font-semibold transition-all outline-none"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Custom Time Selector with Up/Down Chevrons */}
            <div className="space-y-1.5 w-full sm:w-auto">
              <label className="text-xs font-bold text-slate-600 flex items-center">
                <Clock size={11} className="mr-1.5 text-[#0D99FF]" />
                Time
              </label>
              <div className="flex items-center space-x-1.5 bg-slate-50 border border-slate-200 rounded-xl p-1.5 h-[42px] justify-center">
                
                {/* Hour */}
                <div className="flex flex-col items-center justify-between h-full">
                  <button
                    type="button"
                    onClick={incrementHour}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronUp size={13} />
                  </button>
                  <span className="w-5 text-center text-xs font-extrabold text-slate-800 select-none leading-none">
                    {String(hour).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={decrementHour}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>

                <span className="text-xs font-extrabold text-slate-400 select-none">:</span>

                {/* Minute */}
                <div className="flex flex-col items-center justify-between h-full">
                  <button
                    type="button"
                    onClick={incrementMinute}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronUp size={13} />
                  </button>
                  <span className="w-5 text-center text-xs font-extrabold text-slate-800 select-none leading-none">
                    {String(minute).padStart(2, "0")}
                  </span>
                  <button
                    type="button"
                    onClick={decrementMinute}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronDown size={13} />
                  </button>
                </div>

                {/* AM/PM */}
                <div className="flex flex-col items-center justify-between h-full pl-1">
                  <button
                    type="button"
                    onClick={toggleAmPm}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronUp size={13} />
                  </button>
                  <span className="w-6 text-center text-[10px] font-black text-slate-800 select-none leading-none uppercase">
                    {ampm}
                  </span>
                  <button
                    type="button"
                    onClick={toggleAmPm}
                    disabled={isSubmitting}
                    className="text-slate-400 hover:text-slate-800 transition-colors disabled:opacity-50"
                  >
                    <ChevronDown size={13} />
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-[#0D99FF] focus:ring-2 focus:ring-[#0D99FF]/10 text-slate-800 text-sm font-medium transition-all outline-none resize-none"
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
