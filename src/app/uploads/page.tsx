"use client";

import { useEffect, useState } from "react";
import CSVUploader from "@/components/CSVUploader";
import UploadHistory from "@/components/UploadHistory";
import { useApp } from "@/components/Providers";

export default function UploadsPage() {
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshCounts } = useApp();

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/uploads");
      if (res.ok) {
        const data = await res.json();
        setBatches(data);
      }
    } catch (err) {
      console.error("Error fetching upload history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSuccess = async () => {
    await fetchHistory();
    await refreshCounts();
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="p-4 sm:p-8 w-full space-y-8 animate-fade-in text-slate-600">
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-800">
          Data Management
        </h1>
        <p className="text-sm text-slate-505 mt-2 font-medium">
          Import new lead spreadsheets or track the history of previous file mappings.
        </p>
      </div>

      <CSVUploader onUploadSuccess={fetchHistory} />
      
      <div className="border-t border-slate-200 pt-6">
        <UploadHistory batches={batches} isLoading={isLoading} onDeleteSuccess={handleDeleteSuccess} />
      </div>
    </div>
  );
}

