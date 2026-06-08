"use client";

import { useEffect, useRef, useState } from "react";
import {
  X,
  Sparkles,
  Copy,
  Check,
  RotateCw,
  Save,
  ChevronDown,
  ChevronUp,
  Phone,
  Building,
  AlertCircle,
  Loader2,
  FileText,
  MessageSquare,
  Bookmark,
  CheckSquare,
  ThumbsUp,
  Flame,
  Search,
  Settings,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { ColdCallScriptResponse } from "@/lib/gemini";
import { getFirstPhone } from "@/lib/utils";

interface CallScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}

const LOADER_STEPS = [
  { text: "Analyzing prospect business & industry niche...", icon: Search },
  { text: "Aligning Forge Web capabilities with their pain points...", icon: Settings },
  { text: "Crafting bilingual (Hinglish + Hindi) scripts...", icon: Globe },
  { text: "Finalizing conversational sales flow scripts...", icon: Sparkles }
];

export default function CallScriptModal({
  isOpen,
  onClose,
  lead,
}: CallScriptModalProps) {
  const [scriptData, setScriptData] = useState<ColdCallScriptResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<"guided" | "full">("guided");
  const [language, setLanguage] = useState<"hinglish" | "hindi">("hinglish");
  const [persona, setPersona] = useState<"owner" | "manager" | "receptionist">("owner");
  const [instructions, setInstructions] = useState("");
  const [editedScriptText, setEditedScriptText] = useState("");
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);
  const [copyField, setCopyField] = useState<string | null>(null);
  const [loaderStep, setLoaderStep] = useState(0);

  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch or generate script
  const fetchScript = async (forceRegenerate = false, customInstructions = "") => {
    try {
      if (forceRegenerate) {
        setIsRegenerating(true);
      } else {
        setIsLoading(true);
      }
      setLoaderStep(0);

      let url = `/api/leads/${lead.id}/script`;
      const params = new URLSearchParams();
      if (forceRegenerate) {
        params.append("regenerate", "true");
      }
      if (customInstructions) {
        params.append("instructions", customInstructions);
      }
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to load cold call script");
      }

      const data: ColdCallScriptResponse = await res.json();
      setScriptData(data);
      const initialPersonaScript = data[persona] || data.owner;
      setEditedScriptText(
        language === "hinglish" 
          ? initialPersonaScript?.fullScriptHinglish || "" 
          : initialPersonaScript?.fullScriptHindi || ""
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to load script");
    } finally {
      setIsLoading(false);
      setIsRegenerating(false);
    }
  };

  // Sync edited text when language or persona toggles
  useEffect(() => {
    if (scriptData && persona) {
      const personaScript = scriptData[persona];
      setEditedScriptText(
        language === "hinglish" 
          ? personaScript?.fullScriptHinglish || "" 
          : personaScript?.fullScriptHindi || ""
      );
    }
  }, [language, persona, scriptData]);

  // Stepped loader effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOpen && (isLoading || isRegenerating)) {
      timer = setInterval(() => {
        setLoaderStep((prev) => (prev < LOADER_STEPS.length - 1 ? prev + 1 : prev));
      }, 1500);
    }
    return () => clearInterval(timer);
  }, [isOpen, isLoading, isRegenerating]);

  // Load script when modal opens
  useEffect(() => {
    if (isOpen && lead?.id) {
      setScriptData(null);
      setEditedScriptText("");
      setInstructions("");
      setExpandedObjection(null);
      setLanguage("hinglish");
      setPersona("owner");
      fetchScript();
    }
  }, [isOpen, lead?.id]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isLoading && !isRegenerating) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isLoading, isRegenerating]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (
      modalRef.current && 
      !modalRef.current.contains(e.target as Node) && 
      !isLoading && 
      !isRegenerating
    ) {
      onClose();
    }
  };

  const handleCopyText = (text: string, fieldId: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopyField(fieldId);
    toast.success("Copied to clipboard!");
    setTimeout(() => {
      setCopyField(null);
    }, 2000);
  };

  const handleSaveEditedScript = async () => {
    if (!scriptData || !persona) return;

    try {
      setIsSaving(true);
      const updatedPersonaScript = {
        ...scriptData[persona],
        fullScriptHinglish: language === "hinglish" ? editedScriptText : scriptData[persona].fullScriptHinglish,
        fullScriptHindi: language === "hindi" ? editedScriptText : scriptData[persona].fullScriptHindi,
      };

      const updatedScript = {
        ...scriptData,
        [persona]: updatedPersonaScript,
      };

      const res = await fetch(`/api/leads/${lead.id}/script`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedScript),
      });

      if (!res.ok) {
        throw new Error("Failed to save edited script");
      }

      const data = await res.json();
      setScriptData(data);
      toast.success(`${language === "hinglish" ? "Hinglish" : "Hindi"} script changes saved!`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to save script");
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerateScript = () => {
    fetchScript(true, instructions);
  };

  const leadPhone = getFirstPhone(lead.contactMobilePhone, lead.contactPhoneNumbers);

  const personaScript = scriptData ? scriptData[persona] : null;

  const openerText = language === "hinglish" ? personaScript?.openerHinglish : personaScript?.openerHindi;
  const problemText = language === "hinglish" ? personaScript?.problemStateHinglish : personaScript?.problemStateHindi;
  const offerText = language === "hinglish" ? personaScript?.offerHinglish : personaScript?.offerHindi;
  const ctaText = language === "hinglish" ? personaScript?.ctaHinglish : personaScript?.ctaHindi;
  const pitchPoints = language === "hinglish" ? personaScript?.pitchPointsHinglish : personaScript?.pitchPointsHindi;
  const objectionsList = language === "hinglish" ? personaScript?.objectionsHinglish : personaScript?.objectionsHindi;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto animate-fade-in"
    >
      <div
        ref={modalRef}
        className="w-full max-w-5xl bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col my-4 max-h-[92vh] sm:max-h-[88vh] animate-scale-up"
      >
        {/* Header Section */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-[#0D99FF] to-[#00C2FF] text-white shadow-sm">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-sm sm:text-base flex items-center gap-1.5 leading-tight">
                AI Cold Call Script Generator
                {scriptData?.isDemo && (
                  <span className="text-[9px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Demo Mode
                  </span>
                )}
              </h3>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                Forge Web Cold Call Outreach Flow
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading || isRegenerating}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors disabled:opacity-30"
          >
            <X size={16} />
          </button>
        </div>

        {/* Demo Mode Alert Banner */}
        {scriptData?.isDemo && !isLoading && !isRegenerating && (
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 px-5 py-2 flex items-start space-x-2 shrink-0">
            <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={13} />
            <p className="text-[10px] text-amber-700 font-semibold leading-relaxed">
              <strong>Demo Mode:</strong> GEMINI_API_KEY is not configured in `.env`. Displaying pre-generated bilingual scripts tailored to the lead's niche.
            </p>
          </div>
        )}

        {/* Loading Overlay */}
        {(isLoading || isRegenerating) ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[350px] space-y-5">
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-16 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin" />
              <Sparkles className="absolute text-[#0D99FF] animate-pulse" size={20} />
            </div>
            <div className="text-center max-w-sm">
              <h4 className="text-xs font-extrabold text-slate-800 tracking-wide">
                {isRegenerating ? "Regenerating Custom Script..." : "Analyzing Prospect..."}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">
                Please wait. Gemini is building Hinglish & Hindi cold call scripts tailored for this lead.
              </p>
            </div>
            
            {/* Loading Stepper */}
            <div className="w-full max-w-xs bg-slate-50 rounded-2xl p-4 border border-slate-100 mt-2 space-y-3">
              {LOADER_STEPS.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <div key={idx} className="flex items-center space-x-3 text-left">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border shrink-0 transition-all duration-350 ${
                      loaderStep > idx 
                        ? "bg-emerald-500 border-emerald-500 text-white" 
                        : loaderStep === idx 
                          ? "bg-blue-100 border-blue-400 text-blue-700 animate-pulse" 
                          : "bg-slate-100 border-slate-200 text-slate-400"
                    }`}>
                      {loaderStep > idx ? (
                        <Check size={11} className="stroke-[3]" />
                      ) : (
                        <StepIcon size={11} className={loaderStep === idx ? "animate-pulse" : ""} />
                      )}
                    </div>
                    <span className={`text-[10.5px] font-semibold transition-colors duration-300 ${
                      loaderStep === idx ? "text-slate-800 font-bold" : loaderStep > idx ? "text-slate-500" : "text-slate-400"
                    }`}>
                      {step.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0">
            {/* LEFT COLUMN: SCRIPT VIEWER & MANUAL EDITOR */}
            <div className="flex-1 flex flex-col border-r border-slate-150 overflow-hidden min-h-0">
              
              {/* Tab Selector & Language Switches & Save Action Bar */}
              <div className="px-5 py-2.5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/20 shrink-0">
                {/* Tabs */}
                <div className="flex space-x-1 bg-slate-100 p-0.5 rounded-lg w-fit">
                  <button
                    onClick={() => setActiveTab("guided")}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                      activeTab === "guided"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Bookmark size={11} />
                    <span>Interactive Flow</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("full")}
                    className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-[11px] font-bold transition-all ${
                      activeTab === "full"
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <FileText size={11} />
                    <span>Full Script</span>
                  </button>
                </div>

                {/* Right Side Controls */}
                <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-auto">
                  {/* Persona Selector (Pills) */}
                  <div className="flex space-x-0.5 bg-slate-100 border border-slate-200 p-0.5 rounded-lg w-fit">
                    {(["owner", "manager", "receptionist"] as const).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPersona(p)}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                          persona === p
                            ? "bg-blue-500 text-white shadow-sm"
                            : "text-slate-650 hover:bg-slate-200/50"
                        }`}
                      >
                        {p === "receptionist" ? "Receptionist" : p}
                      </button>
                    ))}
                  </div>

                  {/* Language Switcher */}
                  <div className="flex space-x-0.5 bg-slate-100 border border-slate-200 p-0.5 rounded-lg w-fit">
                    <button
                      onClick={() => setLanguage("hinglish")}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                        language === "hinglish"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-slate-650 hover:bg-slate-200/50"
                      }`}
                    >
                      Hinglish
                    </button>
                    <button
                      onClick={() => setLanguage("hindi")}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition-all ${
                        language === "hindi"
                          ? "bg-blue-500 text-white shadow-sm"
                          : "text-slate-650 hover:bg-slate-200/50"
                      }`}
                    >
                      Hindi
                    </button>
                  </div>

                  {activeTab === "full" && (
                    <button
                      onClick={handleSaveEditedScript}
                      disabled={
                        isSaving || 
                        editedScriptText === (language === "hinglish" ? scriptData?.[persona]?.fullScriptHinglish : scriptData?.[persona]?.fullScriptHindi)
                      }
                      className="flex items-center space-x-1 px-2.5 py-1 text-[10px] font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm transition-all disabled:opacity-50"
                    >
                      {isSaving ? <Loader2 className="animate-spin" size={10} /> : <Save size={10} />}
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content Panel */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 min-h-0">
                {activeTab === "guided" ? (
                  <>
                    {/* Niche Badge & Analysis Explanation */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-start space-x-2.5">
                      <div className="p-1.5 rounded-lg bg-blue-50 text-[#0D99FF] shrink-0 mt-0.5">
                        <Flame size={12} className="animate-bounce" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] font-extrabold text-[#0D99FF] uppercase tracking-wider flex items-center gap-1.5">
                          <span>AI Strategy: Niche classified as &quot;{scriptData?.niche}&quot;</span>
                          <span className="text-[8px] px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded font-bold uppercase">
                            {language === "hinglish" ? "Hinglish (Roman)" : "Hindi (Devanagari)"}
                          </span>
                        </div>
                        <p className="text-[11px] font-semibold text-slate-500 mt-0.5 leading-relaxed">
                          {scriptData?.analysis}
                        </p>
                      </div>
                    </div>

                    {/* Step 1: Opener */}
                    <div className="space-y-1 relative group">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#0D99FF]">
                          1. Greeting & Opener
                        </span>
                        <button
                          onClick={() => handleCopyText(openerText || "", "opener")}
                          className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Copy Hook"
                        >
                          {copyField === "opener" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="border-l-4 border-[#0D99FF] bg-[#0D99FF]/5 pl-3.5 py-2.5 pr-2.5 rounded-r-xl">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          &quot;{openerText}&quot;
                        </p>
                      </div>
                    </div>

                    {/* Step 2: Problem State */}
                    <div className="space-y-1 relative group">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700">
                          2. Industry Pain Points
                        </span>
                        <button
                          onClick={() => handleCopyText(problemText || "", "problem")}
                          className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Copy Pain Points"
                        >
                          {copyField === "problem" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="border-l-4 border-amber-500 bg-amber-500/5 pl-3.5 py-2.5 pr-2.5 rounded-r-xl">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {problemText}
                        </p>
                      </div>
                    </div>

                    {/* Step 3: Offer & Pitch Points */}
                    <div className="space-y-1.5 relative group">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700">
                          3. Forge Web Custom Offer
                        </span>
                        <button
                          onClick={() => handleCopyText(offerText || "", "offer")}
                          className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Copy Pitch"
                        >
                          {copyField === "offer" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="border-l-4 border-emerald-500 bg-emerald-500/5 pl-3.5 py-2.5 pr-2.5 rounded-r-xl space-y-2.5">
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {offerText}
                        </p>

                        {pitchPoints && pitchPoints.length > 0 && (
                          <div className="bg-white/70 border border-emerald-100/55 rounded-lg p-2.5">
                            <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1.5">
                              Highlight Key Benefits:
                            </span>
                            <ul className="grid grid-cols-1 gap-1">
                              {pitchPoints.map((pt, idx) => (
                                <li key={idx} className="flex items-start text-[10px] sm:text-xs font-semibold text-slate-600">
                                  <CheckSquare size={11} className="text-emerald-500 mr-2 shrink-0 mt-0.5" />
                                  <span className="leading-tight">{pt}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 4: Call to Action */}
                    <div className="space-y-1 relative group">
                      <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-700">
                          4. Demo Close (CTA)
                        </span>
                        <button
                          onClick={() => handleCopyText(ctaText || "", "cta")}
                          className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-650 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                          title="Copy CTA"
                        >
                          {copyField === "cta" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                        </button>
                      </div>
                      <div className="border-l-4 border-purple-500 bg-purple-500/5 pl-3.5 py-2.5 pr-2.5 rounded-r-xl">
                        <p className="text-xs sm:text-sm text-[#0D99FF] leading-relaxed font-bold">
                          &quot;{ctaText}&quot;
                        </p>
                      </div>
                    </div>

                    {/* Objection Handlers Accordion */}
                    {objectionsList && objectionsList.length > 0 && (
                      <div className="border border-slate-150 rounded-2xl p-3.5 bg-white space-y-2">
                        <div className="flex items-center space-x-1.5 pb-1.5 border-b border-slate-50">
                          <MessageSquare size={13} className="text-[#0D99FF]" />
                          <h4 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-800">
                            Objection Handling FAQ
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {objectionsList.map((obj, idx) => {
                            const isExpanded = expandedObjection === idx;
                            return (
                              <div
                                key={idx}
                                className="border border-slate-100 rounded-lg overflow-hidden"
                              >
                                <button
                                  onClick={() => setExpandedObjection(isExpanded ? null : idx)}
                                  className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100/80 text-left transition-colors font-medium"
                                >
                                  <span className="text-[11px] font-bold text-slate-750 truncate pr-2">
                                    🛑 Objection: &quot;{obj.objection}&quot;
                                  </span>
                                  {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                                </button>
                                {isExpanded && (
                                  <div className="p-3 bg-white border-t border-slate-100 group relative animate-fade-in">
                                    <div className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest mb-1 flex justify-between items-center">
                                      <span>Recommended Response</span>
                                      <button
                                        onClick={() => handleCopyText(obj.response, `obj_${idx}`)}
                                        className="p-1 rounded text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all opacity-0 group-hover:opacity-100"
                                      >
                                        {copyField === `obj_${idx}` ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                                      </button>
                                    </div>
                                    <p className="text-[11px] text-slate-650 leading-relaxed font-semibold">
                                      {obj.response}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  /* Full Script Editor */
                  <div className="flex flex-col h-full space-y-2">
                    <textarea
                      value={editedScriptText}
                      onChange={(e) => setEditedScriptText(e.target.value)}
                      rows={14}
                      className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] sm:text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 transition-all font-mono leading-relaxed resize-none flex-1"
                      placeholder={`Write or edit script in ${language}...`}
                    />
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold shrink-0">
                      <span>Characters: {editedScriptText.length} | Lines: {editedScriptText.split("\n").length}</span>
                      <button
                        onClick={() => handleCopyText(editedScriptText, "full_script")}
                        className="flex items-center space-x-1 hover:text-slate-700 transition-colors"
                      >
                        {copyField === "full_script" ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                        <span>Copy Narrative</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN: PROSPECT CONTEXT & AI REGENERATOR PANEL */}
            <div className="w-full md:w-[320px] bg-slate-50/50 p-4 overflow-y-auto flex flex-col space-y-4 shrink-0 min-h-0">
              
              {/* Prospect Context Box */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-3 shrink-0">
                <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                  <Building size={14} className="text-[#0D99FF]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Lead Context
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-y-2 text-xs font-semibold text-slate-650">
                  <span className="text-slate-400">Company:</span>
                  <span className="col-span-2 text-slate-800 font-extrabold truncate" title={lead.businessName || ""}>
                    {lead.businessName || "N/A"}
                  </span>
                  
                  <span className="text-slate-400">Prospect:</span>
                  <span className="col-span-2 text-slate-700 font-bold truncate" title={lead.prospectFullName || ""}>
                    {lead.prospectFullName}
                  </span>
                  
                  <span className="text-slate-400">Niche:</span>
                  <span className="col-span-2 text-slate-600 truncate" title={scriptData?.niche || ""}>
                    {scriptData?.niche || "Not Classified"}
                  </span>
                </div>

                {/* Hot Phone Dialing Card */}
                {leadPhone && (
                  <div className="bg-[#0D99FF]/5 border border-blue-100 rounded-xl p-2 flex items-center justify-between gap-1 mt-1 shrink-0">
                    <div className="flex items-center space-x-1.5 min-w-0">
                      <Phone size={12} className="text-[#0D99FF] shrink-0" />
                      <a
                        href={`tel:${leadPhone}`}
                        className="text-xs font-extrabold text-blue-600 hover:text-blue-800 truncate"
                        title={leadPhone}
                      >
                        {leadPhone}
                      </a>
                    </div>
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        onClick={() => handleCopyText(leadPhone, "lead_phone")}
                        className="p-1 rounded bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 transition-all"
                        title="Copy Number"
                      >
                        {copyField === "lead_phone" ? <Check size={10} className="text-emerald-500" /> : <Copy size={10} />}
                      </button>
                      <a
                        href={`tel:${leadPhone}`}
                        className="p-1 rounded bg-[#0D99FF] hover:bg-[#0575E6] text-white transition-all shadow-sm"
                        title="Dial Number"
                      >
                        <Phone size={10} />
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Call Status Actions Checklist */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2 shrink-0">
                <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                  <ThumbsUp size={14} className="text-[#0D99FF]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Call Outcome
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-1.5 mt-1">
                  <label className="flex items-center space-x-2 text-[11px] font-semibold text-slate-650 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 w-3 h-3 cursor-pointer" />
                    <span>Dialed phone number</span>
                  </label>
                  <label className="flex items-center space-x-2 text-[11px] font-semibold text-slate-650 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 w-3 h-3 cursor-pointer" />
                    <span>Reached Decision Maker</span>
                  </label>
                  <label className="flex items-center space-x-2 text-[11px] font-semibold text-slate-650 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 w-3 h-3 cursor-pointer" />
                    <span>Delivered Hook & Pitch</span>
                  </label>
                  <label className="flex items-center space-x-2 text-[11px] font-semibold text-slate-650 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 w-3 h-3 cursor-pointer" />
                    <span>Answered objections</span>
                  </label>
                  <label className="flex items-center space-x-2 text-[11px] font-semibold text-slate-650 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500 w-3 h-3 cursor-pointer" />
                    <span>Proposed Demo (CTA)</span>
                  </label>
                </div>
              </div>

              {/* AI Fine-tuning Panel */}
              <div className="bg-white border border-slate-200/60 rounded-2xl p-4 shadow-sm space-y-2.5 shrink-0">
                <div className="flex items-center space-x-2 pb-1.5 border-b border-slate-100">
                  <RotateCw size={14} className="text-[#0D99FF]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Tweak Script with AI
                  </span>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    Focus Instructions
                  </label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    placeholder="E.g., 'make it shorter', 'focus on WhatsApp reviews'..."
                    className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all resize-none h-14 font-medium"
                  />
                </div>

                <button
                  onClick={handleRegenerateScript}
                  disabled={isRegenerating || isLoading}
                  className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 bg-gradient-to-r from-[#0D99FF] to-[#00C2FF] hover:from-blue-600 hover:to-cyan-500 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/10 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 mt-1"
                >
                  {isRegenerating ? (
                    <Loader2 className="animate-spin" size={12} />
                  ) : (
                    <Sparkles size={12} className="animate-pulse" />
                  )}
                  <span>Regenerate Script</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
