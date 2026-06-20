"use client";

import { useEffect, useState } from "react";
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
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
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

  // Fetch lead data and ordered list of matching lead IDs
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoadingLead(true);
        
        // 1. Fetch single lead details
        const leadRes = await fetch(`/api/leads/${id}`);
        if (!leadRes.ok) {
          throw new Error("Lead not found");
        }
        const leadData = await leadRes.json();
        setLead(leadData);

        // 2. Fetch the filtered lead list in order to calculate next lead
        // We pass the active filters to the API (ignoring 'from' which is handled in the API)
        const filterRes = await fetch(`/api/leads/filter?${searchParams.toString()}`);
        if (filterRes.ok) {
          const filterData = await filterRes.json();
          setFilteredIds(filterData.ids || []);
        }
      } catch (err: any) {
        console.error("Error loading lead:", err);
        toast.error(err.message || "Failed to load lead details");
        router.push("/leads");
      } finally {
        setIsLoadingLead(false);
      }
    };

    if (id) {
      loadData();
    }
  }, [id, searchParams, router]);

  // Compute position in filtered list
  const currentIndex = filteredIds.indexOf(id);
  const hasNext = currentIndex !== -1 && currentIndex < filteredIds.length - 1;
  const nextId = hasNext ? filteredIds[currentIndex + 1] : null;

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
