"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, MessageSquare, Save, Bell, ChevronDown, ChevronLeft, ChevronRight, Check, Calendar, Clock } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface RemarkModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (remark: string, reminder?: { scheduledAt: string; recipientEmail: string } | null) => void;
  leadName: string;
}

// Helpers for custom pickers
const parseDateString = (dateStr: string) => {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDateString = (date: Date) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatDateLabel = (dateStr: string) => {
  if (!dateStr) return "Select Date";
  const parsed = parseDateString(dateStr);
  if (isNaN(parsed.getTime())) return dateStr;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
};

const formatTimeLabel = (timeStr: string) => {
  if (!timeStr) return "Select Time";
  const parts = timeStr.split(":");
  if (parts.length < 2) return timeStr;
  const [hStr, mStr] = parts;
  const h = parseInt(hStr);
  const m = parseInt(mStr);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
};

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

const getCalendarDays = (year: number, month: number) => {
  const firstDay = getFirstDayOfMonth(year, month);
  const daysInMonth = getDaysInMonth(year, month);
  
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
  
  const days = [];
  
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      month: prevMonth,
      year: prevYear,
      isCurrentMonth: false,
    });
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      month,
      year,
      isCurrentMonth: true,
    });
  }
  
  const remainingDays = 42 - days.length;
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      month: nextMonth,
      year: nextYear,
      isCurrentMonth: false,
    });
  }
  
  return days;
};

export default function RemarkModal({
  isOpen,
  onClose,
  onSave,
  leadName,
}: RemarkModalProps) {
  const [remark, setRemark] = useState("");
  const [isReminderEnabled, setIsReminderEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Tab/Mode state: 'datetime' or 'hours'
  const [reminderMode, setReminderMode] = useState<"datetime" | "hours">("datetime");
  const [reminderDate, setReminderDate] = useState("");
  const [reminderTime, setReminderTime] = useState("");
  const [selectedHoursOffset, setSelectedHoursOffset] = useState<number>(1);
  
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [availableEmails, setAvailableEmails] = useState<string[]>([]);
  
  // Custom picker open states & view controls
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [calendarViewDate, setCalendarViewDate] = useState<Date>(new Date());
  const [isEmailDropdownOpen, setIsEmailDropdownOpen] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const emailDropdownRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const timePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Close all custom dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(target)) {
        setIsEmailDropdownOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(target)) {
        setIsCalendarOpen(false);
      }
      if (timePickerRef.current && !timePickerRef.current.contains(target)) {
        setIsTimeOpen(false);
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
      setIsCalendarOpen(false);
      setIsTimeOpen(false);

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

  if (!isOpen || !mounted) return null;

  // Parse hour, minute, and AM/PM for the digital clock picker
  const [h24Str, mStr] = reminderTime.split(":");
  const h24 = parseInt(h24Str) || 0;
  const currentMinute = parseInt(mStr) || 0;
  const currentAmPm = h24 >= 12 ? "PM" : "AM";
  const currentHour12 = h24 % 12 === 0 ? 12 : h24 % 12;

  const updateReminderTime = (hour12: number, minute: number, ampm: string) => {
    let h24Val = hour12 % 12;
    if (ampm === "PM") {
      h24Val += 12;
    }
    const hStr = String(h24Val).padStart(2, "0");
    const minStr = String(minute).padStart(2, "0");
    setReminderTime(`${hStr}:${minStr}`);
  };

  const handleHourSelect = (h: number) => {
    updateReminderTime(h, currentMinute, currentAmPm);
  };

  const handleMinuteSelect = (m: number) => {
    updateReminderTime(currentHour12, m, currentAmPm);
  };

  const handleAmPmSelect = (ap: string) => {
    updateReminderTime(currentHour12, currentMinute, ap);
  };

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

  const handlePrevMonth = () => {
    setCalendarViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() - 1);
      return d;
    });
  };

  const handleNextMonth = () => {
    setCalendarViewDate(prev => {
      const d = new Date(prev);
      d.setMonth(d.getMonth() + 1);
      return d;
    });
  };

  return createPortal(
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in"
    >
      <div
        ref={modalRef}
        className={cn(
          "w-full bg-white border border-slate-200 rounded-3xl shadow-2xl animate-scale-up relative flex flex-col overflow-hidden transition-all duration-300",
          isReminderEnabled ? "max-w-lg md:max-w-3xl lg:max-w-4xl" : "max-w-lg"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 rounded-t-3xl bg-white shrink-0">
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

        {/* Scrollable Body Container */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-180px)] p-6">
          <div
            className={cn(
              "grid grid-cols-1 gap-6 transition-all duration-300",
              isReminderEnabled && "md:grid-cols-2 md:divide-x divide-slate-100 md:gap-8"
            )}
          >
            {/* Left Column: Remarks Input */}
            <div className="space-y-4">
              {/* Common Remarks Tag Selectors */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Common Remarks</span>
                <div className="flex gap-2 flex-wrap">
                  {["Call not receiving", "Busy on another call", "Owner not available", "Asked for Catalogue & Demo", "Asked for Catalogue"].map((txt) => (
                    <button
                      key={txt}
                      type="button"
                      onClick={() => setRemark(txt)}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold rounded-full text-slate-600 transition-all hover:text-slate-800 hover:border-slate-300"
                    >
                      {txt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea Input */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Remark Note</span>
                <textarea
                  ref={textareaRef}
                  rows={4}
                  placeholder="Enter your remark about this lead..."
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-855 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all resize-none"
                />
              </div>

              {/* Reminder Switch */}
              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
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
            </div>

            {/* Right Column: Callback Reminder Configuration Panels */}
            {isReminderEnabled && (
              <div className="space-y-4 pt-6 md:pt-0 md:pl-8 animate-fade-in flex flex-col justify-start">
                
                {/* Mode Tabs */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
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

                {/* Tab Panel Content - Dynamic z-index based on active picker state */}
                {reminderMode === "datetime" ? (
                  <div className={cn(
                    "grid grid-cols-2 gap-3 animate-fade-in relative shrink-0",
                    (isCalendarOpen || isTimeOpen) ? "z-30" : "z-10"
                  )}>
                    {/* Custom Date Picker */}
                    <div className="relative" ref={datePickerRef}>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Date</label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsCalendarOpen(!isCalendarOpen);
                          setIsTimeOpen(false);
                          setCalendarViewDate(parseDateString(reminderDate));
                        }}
                        className="w-full flex items-center justify-between pl-3.5 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-700 font-bold outline-none cursor-pointer"
                      >
                        <span>{formatDateLabel(reminderDate)}</span>
                        <Calendar size={14} className="text-slate-400 shrink-0" />
                      </button>

                      {isCalendarOpen && (
                        <div className="absolute bottom-full mb-2 left-0 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl p-3.5 animate-fade-in z-50 md:top-full md:bottom-auto md:mt-1 md:mb-0">
                          {/* Calendar Month Header */}
                          <div className="flex items-center justify-between mb-2">
                            <button
                              type="button"
                              onClick={handlePrevMonth}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-655 transition-colors"
                            >
                              <ChevronLeft size={14} />
                            </button>
                            <span className="text-xs font-bold text-slate-700 capitalize">
                              {calendarViewDate.toLocaleString("en-US", { month: "long", year: "numeric" })}
                            </span>
                            <button
                              type="button"
                              onClick={handleNextMonth}
                              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-655 transition-colors"
                            >
                              <ChevronRight size={14} />
                            </button>
                          </div>

                          {/* Calendar Weekdays Headers */}
                          <div className="grid grid-cols-7 text-center text-[10px] font-bold text-slate-400 mb-1">
                            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
                              <div key={d} className="py-0.5">{d}</div>
                            ))}
                          </div>

                          {/* Calendar Days Grid */}
                          <div className="grid grid-cols-7 gap-0.5 text-center">
                            {getCalendarDays(calendarViewDate.getFullYear(), calendarViewDate.getMonth()).map((dayObj, idx) => {
                              const dateValue = `${dayObj.year}-${String(dayObj.month + 1).padStart(2, "0")}-${String(dayObj.day).padStart(2, "0")}`;
                              const isSelected = dateValue === reminderDate;
                              
                              return (
                                <button
                                  key={`${dateValue}-${idx}`}
                                  type="button"
                                  onClick={() => {
                                    setReminderDate(dateValue);
                                    setIsCalendarOpen(false);
                                  }}
                                  className={cn(
                                    "py-1 text-[11px] font-semibold transition-all hover:bg-slate-100 rounded-lg outline-none",
                                    dayObj.isCurrentMonth ? "text-slate-700" : "text-slate-350",
                                    isSelected && "bg-amber-500 hover:bg-amber-600 text-white font-bold"
                                  )}
                                >
                                  {dayObj.day}
                                </button>
                              );
                            })}
                          </div>

                          {/* Today Select Option */}
                          <div className="border-t border-slate-100 mt-2.5 pt-2 flex items-center justify-between text-[10px] font-bold">
                            <button
                              type="button"
                              onClick={() => {
                                const todayStr = formatDateString(new Date());
                                setReminderDate(todayStr);
                                setIsCalendarOpen(false);
                              }}
                              className="text-amber-600 hover:text-amber-700"
                            >
                              Select Today
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsCalendarOpen(false);
                              }}
                              className="text-slate-400 hover:text-slate-500"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Custom Time Picker (Granular hour/minute/am-pm scroll selector) */}
                    <div className="relative" ref={timePickerRef}>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Time</label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsTimeOpen(!isTimeOpen);
                          setIsCalendarOpen(false);
                        }}
                        className="w-full flex items-center justify-between pl-3.5 pr-3 py-2.5 text-xs bg-white border border-slate-200 rounded-xl hover:border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all text-slate-700 font-bold outline-none cursor-pointer"
                      >
                        <span>{formatTimeLabel(reminderTime)}</span>
                        <Clock size={14} className="text-slate-400 shrink-0" />
                      </button>

                      {isTimeOpen && (
                        <div className="absolute bottom-full mb-2 right-0 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl p-3 animate-fade-in z-50 md:top-full md:bottom-auto md:left-0 md:right-auto md:-left-24 md:mt-1 md:mb-0">
                          <div className="grid grid-cols-3 gap-1.5 text-center">
                            
                            {/* Hours Column */}
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Hour</span>
                              <div className="flex flex-col max-h-36 overflow-y-auto divide-y divide-slate-100 bg-slate-50 rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => {
                                  const isSelected = h === currentHour12;
                                  return (
                                    <button
                                      key={h}
                                      type="button"
                                      onClick={() => handleHourSelect(h)}
                                      className={cn(
                                        "py-1.5 text-xs font-bold transition-all outline-none rounded-md shrink-0 block",
                                        isSelected ? "bg-amber-500 text-white font-extrabold" : "text-slate-600 hover:bg-slate-150"
                                      )}
                                    >
                                      {String(h).padStart(2, "0")}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Minutes Column */}
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Min</span>
                              <div className="flex flex-col max-h-36 overflow-y-auto divide-y divide-slate-100 bg-slate-50 rounded-lg [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {Array.from({ length: 60 }, (_, i) => i).map((m) => {
                                  const isSelected = m === currentMinute;
                                  return (
                                    <button
                                      key={m}
                                      type="button"
                                      onClick={() => handleMinuteSelect(m)}
                                      className={cn(
                                        "py-1.5 text-xs font-bold transition-all outline-none rounded-md shrink-0 block",
                                        isSelected ? "bg-amber-500 text-white font-extrabold" : "text-slate-600 hover:bg-slate-150"
                                      )}
                                    >
                                      {String(m).padStart(2, "0")}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* AM/PM Column */}
                            <div className="flex flex-col justify-between h-full">
                              <div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">AM/PM</span>
                                <div className="flex flex-col gap-1 bg-slate-50 p-1 rounded-lg">
                                  {["AM", "PM"].map((ap) => {
                                    const isSelected = ap === currentAmPm;
                                    return (
                                      <button
                                        key={ap}
                                        type="button"
                                        onClick={() => handleAmPmSelect(ap)}
                                        className={cn(
                                          "py-1 text-[10px] font-bold transition-all outline-none rounded-md block",
                                          isSelected ? "bg-amber-500 text-white" : "text-slate-600 hover:bg-slate-150"
                                        )}
                                      >
                                        {ap}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setIsTimeOpen(false)}
                                className="mt-2 w-full py-1 bg-slate-800 hover:bg-slate-900 text-white text-[9px] font-bold rounded-lg transition-colors"
                              >
                                Done
                              </button>
                            </div>

                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 animate-fade-in shrink-0">
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
                              : "bg-white border-slate-200 text-slate-655 hover:bg-slate-50 hover:border-slate-300"
                          )}
                        >
                          +{hr} Hr{hr > 1 ? "s" : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Email Dropdown Selector - Dynamic z-index based on active picker state */}
                <div 
                  className={cn(
                    "border-t border-slate-100 pt-3 relative mt-auto shrink-0 transition-all",
                    isEmailDropdownOpen ? "z-30" : "z-10"
                  )} 
                  ref={emailDropdownRef}
                >
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
        <div className="flex items-center justify-end px-6 py-4 bg-slate-50/50 border-t border-slate-100 gap-3 rounded-b-3xl shrink-0">
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
    </div>,
    document.body
  );
}
