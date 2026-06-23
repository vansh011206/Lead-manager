"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useApp } from "@/components/Providers";
import LeadDetail from "@/components/LeadDetail";
import { Loader2 } from "lucide-react";

interface Lead {
  id: string;
  rowNum: number | null;
  prospectFullName: string;
  prospectJobTitle: string | null;
  prospectLinkedin: string | null;
  businessName: string | null;
  businessWebsite: string | null;
  businessNumberOfEmployees: string | null;
  businessYearlyRevenue: string | null;
  businessCountry: string | null;
  businessRegion: string | null;
  businessNaicsDescription: string | null;
  contactProfessionalEmail: string | null;
  contactEmails: string | null;
  contactMobilePhone: string | null;
  contactPhoneNumbers: string | null;
  status: string;
  remark: string | null;
  createdAt: string;
  updatedAt: string;
  uploadBatch: { id: string; fileName: string; uploadedAt: string } | null;
  meetings?: any[];
}

function LeadDetailPageContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshCounts } = useApp();

  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [prevId, setPrevId] = useState<string | null>(null);
  const [nextId, setNextId] = useState<string | null>(null);
  const [isLoadingLead, setIsLoadingLead] = useState(true);
  const [isPerformingAction, setIsPerformingAction] = useState(false);

  // Extract navigation fallbacks
  const fromPath = searchParams.get("from") || "/leads";
  
  // Create clean search params (excluding "from") to pass back when navigating
  const getCleanParams = () => {
    const clean = new URLSearchParams(searchParams.toString());
    clean.delete("from");
    return clean.toString();
  };

  // Back button URL
  const backUrl = `${fromPath}${getCleanParams() ? `?${getCleanParams()}` : ""}`;

  // 1. Fetch single lead details (loads instantly)
  useEffect(() => {
    const loadLead = async () => {
      try {
        setIsLoadingLead(true);
        const leadRes = await fetch(`/api/leads/${id}`);
        if (!leadRes.ok) {
          throw new Error("Lead not found");
        }
        const leadData = await leadRes.json();
        setLead(leadData);
      } catch (err: any) {
        console.error("Error loading lead:", err);
        toast.error(err.message || "Failed to load lead details");
        router.push("/leads");
      } finally {
        setIsLoadingLead(false);
      }
    };

    if (id) {
      loadLead();
    }
  }, [id, router]);

  // 2. Fetch the filtered lead list in order to calculate next/prev lead IDs (lazy loaded)
  useEffect(() => {
    const loadNavigation = async () => {
      try {
        const filterRes = await fetch(`/api/leads/filter?${searchParams.toString()}&currentId=${id}`);
        if (filterRes.ok) {
          const filterData = await filterRes.json();
          setPrevId(filterData.prevId || null);
          setNextId(filterData.nextId || null);
        }
      } catch (err) {
        console.error("Error loading pagination navigation:", err);
      }
    };

    if (id) {
      loadNavigation();
    }
  }, [id, searchParams]);

  // Keep latest nextId and backUrl in refs to avoid restarting SSE connection on pagination changes
  const nextIdRef = useRef<string | null>(null);
  const backUrlRef = useRef<string>(backUrl);

  useEffect(() => {
    nextIdRef.current = nextId;
  }, [nextId]);

  useEffect(() => {
    backUrlRef.current = backUrl;
  }, [backUrl]);

  // 3. Subscribe to real-time status updates using Server-Sent Events (SSE)
  useEffect(() => {
    if (!id) return;

    let isNavigating = false;
    const eventSource = new EventSource(`/api/leads/${id}/sse`);

    eventSource.onmessage = (event) => {
      try {
        if (event.data === "connected") {
          console.log("[SSE] Connected to lead updates channel");
          return;
        }

        const data = JSON.parse(event.data);
        if (data.action === "update" || data.action === "delete") {
          if (isNavigating) return;
          isNavigating = true;

          // Notify the user about the cross-device action
          if (data.action === "delete") {
            toast.error("This lead has been deleted on another device.");
          } else {
            const displayStatus = data.status === "contacted" ? "contacted" : data.status === "declined" ? "declined" : data.status;
            toast.info(`Lead marked as ${displayStatus} on another device.`);
          }

          // Trigger dynamic sidebar/counter updates in real-time
          refreshCounts();

          // Wait for transition visual feedback then slide/navigate automatically
          setTimeout(() => {
            if (nextIdRef.current) {
              router.push(`/lead/${nextIdRef.current}?${searchParams.toString()}`);
            } else {
              toast.info("No more leads in this filtered list. Returning to list view.");
              router.push(backUrlRef.current);
            }
          }, 1500);
        }
      } catch (err) {
        console.error("[SSE] Error parsing SSE message:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("[SSE] Connection error:", err);
    };

    return () => {
      console.log("[SSE] Closing connection for lead:", id);
      eventSource.close();
    };
  }, [id, router, searchParams, refreshCounts]);

  const hasNext = !!nextId;
  const hasPrev = !!prevId;

  // Action handler (PUT request to update status and remark)
  const handleAction = async (status: string, remark?: string, reminder?: any) => {
    if (!lead) return;

    try {
      setIsPerformingAction(true);

      const res = await fetch(`/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, remark, reminder }),
      });

      if (!res.ok) {
        throw new Error("Failed to update status");
      }

      await res.json();
      
      // Notify user
      if (status === "contacted") {
        toast.success("Lead marked as contacted");
      } else if (status === "declined") {
        toast.error("Lead declined");
      } else if (status === "remarked") {
        toast.warning(`Remark saved for ${lead.prospectFullName}`);
      } else {
        toast.success(`Lead marked as ${status}`);
      }

      // Trigger sidebar updates in real-time
      await refreshCounts();

      // Navigate to next lead or go back
      if (nextId) {
        router.push(`/lead/${nextId}?${searchParams.toString()}`);
      } else {
        toast.info("No more leads in this filtered list. Returning to list view.");
        router.push(backUrl);
      }
    } catch (err: any) {
      console.error("Action error:", err);
      toast.error(err.message || "Failed to perform action");
    } finally {
      setIsPerformingAction(false);
    }
  };

  if (isLoadingLead) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-[#00C2FF]" size={36} />
        <p className="text-sm text-slate-400">Loading prospect profile...</p>
      </div>
    );
  }

  const handleNext = () => {
    if (nextId) {
      router.push(`/lead/${nextId}?${searchParams.toString()}`);
    }
  };

  const handlePrev = () => {
    if (prevId) {
      router.push(`/lead/${prevId}?${searchParams.toString()}`);
    }
  };

  if (!lead) return null;

  return (
    <div className="p-4 sm:p-8 w-full space-y-6">
      {/* Lead details card stack */}
      <LeadDetail
        lead={lead as any}
        backUrl={backUrl}
        onAction={handleAction}
        isLoading={isPerformingAction}
        hasNext={!!nextId}
        onNext={handleNext}
        hasPrev={hasPrev}
        onPrev={handlePrev}
      />
    </div>
  );
}

import { Suspense } from "react";

export default function LeadDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[80vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-[#00C2FF]" size={36} />
          <p className="text-sm text-slate-400">Loading prospect profile...</p>
        </div>
      }
    >
      <LeadDetailPageContent />
    </Suspense>
  );
}
