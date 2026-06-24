"use client";

import { useEffect, useRef, useState } from "react";
import { X, MessageSquare, Save, Bell, ChevronDown, Check, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (remark: string, reminder?: { scheduledAt: string; recipientEmail: string } | null) => void;
  leadName: string;
}

export default function RemarkModal({
  isOpen,
  onClose,
  onSave,
  leadName,
}: RemarkModalProps) {
  const [remark, setRemark] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  
  // Tab/Mode state: 'datetime' or 'hours'
  const [reminderMode, setReminderMode] = useState<"datetime" | "hours">("datetime");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [selectedHoursOffset, setSelectedHoursOffset] = useState<number>(1);
  
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [availableEmails, setAvailableEmails] = useState<string[]>([]);
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch email recipients once on mount
  useEffect(() => {
    async function loadEmails() {
      try {
        const res = await fetch("/api/reminder-emails");
        if (res.ok) {
          const data = await res.json();
          setAvailableEmails(data);
          if (data.length > 0) {
            setSelectedEmails([data[0]]);
          }
        }
      } catch (err) {
        console.error("Failed to load reminder emails:", err);
      }
    }
    loadEmails();
  }, []);

  // Close email dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target as Node)) {
        setIsEmailDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize fields on open
  useEffect(() => {
    if (isOpen) {
      setRemark("");
      setIsReminderEnabled(false);
      setReminderMode("datetime");
      setSelectedHoursOffset(1);

      // Default Date & Time fields to 1 hour from now
      const d = new Date();
      d.setHours(d.getHours() + 1);

      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setReminderDate(`${yyyy}-${mm}-${dd}`);

      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      setReminderTime(`${hh}:${min}`);

      if (availableEmails.length > 0) {
        setSelectedEmails([availableEmails[0]]);
      }

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

    if (!finalRemark && !isReminderEnabled) {
      toast.error("Please enter a remark note or set a callback reminder");
      return;
    }

    let reminderData = null;
    if (isReminderEnabled) {
      let scheduledAt: string;

      if (reminderMode === "datetime") {
        if (!reminderDate || !reminderTime) {
          toast.error("Please set a valid date and time for the callback reminder");
          return;
        }
        scheduledAt = new Date(`${reminderDate}T${reminderTime}`).toISOString();
      } else {
        // hours mode: calculate time based on offset relative to current time
        const d = new Date();
        d.setTime(d.getTime() + selectedHoursOffset * 60 * 60 * 1000);
        scheduledAt = d.toISOString();
      }

      if (selectedEmails.length === 0) {
        toast.error("Please select at least one recipient email address for the reminder");
        return;
      }
      
      reminderData = {
        scheduledAt,
        recipientEmail: selectedEmails.join(", "),
      };

      // Auto-populate remark if empty but reminder is set
      if (!finalRemark) {
        const dateObj = new Date(scheduledAt);
        const formattedDate = dateObj.toLocaleDateString();
        const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        finalRemark = `Callback reminder scheduled for ${formattedDate} at ${formattedTime}`;
      }
    }

    onSave(finalRemark, reminderData);
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
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-200/55">
              <MessageSquare size={18} />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-base">Add Remark & Follow-up</h3>
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
          {/* Quick Remarks Selectors */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Common Remarks</span>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setRemark("Call not receiving")}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
              >
                Call not receiving
              </button>
              <button
                type="button"
                onClick={() => setRemark("Busy on another call")}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
              >
                Busy on another call
              </button>
              <button
                type="button"
                onClick={() => setRemark("Owner not available")}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
              >
                Owner not available
              </button>
              <button
                type="button"
                onClick={() => setRemark("Asked for Catalogue & Demo")}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
              >
                Asked for Catalogue & Demo
              </button>
              <button
                type="button"
                onClick={() => setRemark("Asked for Catalogue")}
                className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
              >
                Asked for Catalogue
              </button>
            </div>
          </div>

          {/* Textarea Input */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Remark Note</span>
            <textarea
              ref={textareaRef}
              rows={3}
              placeholder="Enter your remark about this lead..."
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-850 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
            />
          </div>

          {/* Set Reminder Section */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell size={16} className={isReminderEnabled ? "text-amber-500" : "text-slate-400"} />
                <span className="text-xs font-bold text-slate-700">Set Callback Reminder?</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isReminderEnabled}
                  onChange={(e) => setIsReminderEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
              </label>
            </div>

            {/* Config Box */}
            {isReminderEnabled && (
              <div className="mt-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-4 animate-fade-in">
                
                {/* Mode Selection Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setReminderMode("datetime")}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-20 shadow-sm outline-none",
                      reminderMode === "datetime"
                        ? "border-amber-500 bg-amber-500/5 text-amber-900"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-750"
                    )}
                  >
                    <span className="text-xs font-bold block">Date & Time</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">Pick a specific callback date and time</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReminderMode("hours")}
                    className={cn(
                      "p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-between h-20 shadow-sm outline-none",
                      reminderMode === "hours"
                        ? "border-amber-500 bg-amber-500/5 text-amber-900"
                        : "border-slate-200 bg-white hover:border-slate-300 text-slate-750"
                    )}
                  >
                    <span className="text-xs font-bold block">Hours Delay</span>
                    <span className="text-[10px] text-slate-500 leading-tight block">Call after 1, 2, or 3+ hours delay</span>
                  </button>
                </div>

                {/* Tab Content */}
                {reminderMode === "datetime" ? (
                  /* Specific Date & Time Fields */
                  <div className="grid grid-cols-2 gap-3 animate-fade-in">
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
                      <div className="relative flex items-center">
                        <input
                          type="date"
                          value={reminderDate}
                          onChange={(e) => setReminderDate(e.target.value)}
                          className="custom-date-input w-full pl-3.5 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-700 font-bold cursor-pointer"
                        />
                        <div className="absolute right-3.5 pointer-events-none text-slate-400">
                          <Calendar size={14} />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Time</label>
                      <div className="relative flex items-center">
                        <input
                          type="time"
                          value={reminderTime}
                          onChange={(e) => setReminderTime(e.target.value)}
                          className="custom-time-input w-full pl-3.5 pr-10 py-2.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-700 font-bold cursor-pointer"
                        />
                        <div className="absolute right-3.5 pointer-events-none text-slate-400">
                          <Clock size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Hours Offset Selector (Highlightable Buttons) */
                  <div className="space-y-2 animate-fade-in">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Choose hour delay</label>
                    <div className="flex flex-wrap gap-2">
                      {[1, 2, 3, 4, 5].map((hr) => (
                        <button
                          key={hr}
                          type="button"
                          onClick={() => {
                            setSelectedHoursOffset(hr);
                            toast.success(`Set reminder to trigger in ${hr} hour${hr > 1 ? 's' : ''}`);
                          }}
                          className={cn(
                            "px-4 py-2 border rounded-xl text-xs font-bold transition-all shadow-sm",
                            selectedHoursOffset === hr
                              ? "bg-amber-500 border-amber-500 text-white"
                              : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                          )}
                        >
                          +{hr} Hr{hr > 1 ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Destination Email Custom Dropdown */}
                <div className="border-t border-slate-100 pt-3 relative" ref={emailDropdownRef}>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Send Email Alert To</label>
                  <button
                    type="button"
                    onClick={() => setIsEmailDropdownOpen(!isEmailDropdownOpen)}
                    className="w-full flex items-center justify-between px-3 py-2 bg-white border border-slate-200 rounded-xl hover:border-slate-350 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-700 font-bold text-xs outline-none"
                  >
                    <span className="truncate mr-2">{selectedEmails.length > 0 ? selectedEmails.join(", ") : "Select email addresses"}</span>
                    <ChevronDown size={14} className={cn("text-slate-400 transition-transform", isEmailDropdownOpen && "rotate-180")} />
                  </button>

                  {isEmailDropdownOpen && (
                    <div className="absolute z-50 left-0 right-0 bottom-full mb-1 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 max-h-40 overflow-y-auto animate-fade-in">
                      {availableEmails.map((email) => {
                        const isSelected = selectedEmails.includes(email);
                        return (
                          <button
                            key={email}
                            type="button"
                            onClick={() => {
                              setSelectedEmails(prev =>
                                prev.includes(email)
                                  ? prev.filter(e => e !== email)
                                  : [...prev, email]
                              );
                            }}
                            className={cn(
                              "w-full text-left px-3.5 py-2 text-xs font-bold transition-all flex items-center justify-between",
                              isSelected
                                ? "bg-amber-50 text-amber-900"
                                : "text-slate-655 hover:bg-slate-50 hover:text-slate-900"
                            )}
                          >
                            <span>{email}</span>
                            {isSelected && <Check size={12} className="text-amber-600 animate-fade-in" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
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
            disabled={!remark.trim() && !isReminderEnabled}
            className="flex items-center space-x-2 px-5 py-2.5 text-xs font-bold text-white bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all shadow-sm"
          >
            <Save size={14} />
            <span>Save & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
