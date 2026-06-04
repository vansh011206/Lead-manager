"use client";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { parseAndMapCSV } from "@/lib/csvParser";
import { useApp } from "@/components/Providers";
import { toast } from "sonner";
import { UploadCloud, CheckCircle, FileText, ChevronRight, RefreshCw } from "lucide-react";
import { MappedLead } from "@/types";

interface CSVUploaderProps {
  onUploadSuccess: () => void;
}

export default function CSVUploader({ onUploadSuccess }: CSVUploaderProps) {
  const { refreshCounts } = useApp();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<MappedLead[]>([]);
  const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      const nameLower = droppedFile.name.toLowerCase();
      if (nameLower.endsWith(".csv") || nameLower.endsWith(".xlsx") || nameLower.endsWith(".xls")) {
        processFile(droppedFile);
      } else {
        toast.error("Please upload only CSV or Excel spreadsheet files");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    const nameLower = selectedFile.name.toLowerCase();
    const isExcel = nameLower.endsWith(".xlsx") || nameLower.endsWith(".xls");

    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          
          // Get sheet data in 2D array form to extract headers
          const sheetData = XLSX.utils.sheet_to_json<any[]>(worksheet, { header: 1 });
          if (sheetData.length === 0) {
            toast.error("Excel sheet seems empty");
            resetState();
            return;
          }
          
          const headers = (sheetData[0] as any[]).map(h => String(h || "").trim()).filter(Boolean);
          const rows: Record<string, string>[] = [];
          
          for (let i = 1; i < sheetData.length; i++) {
            const rowData = sheetData[i];
            // skip completely empty rows
            if (!rowData || rowData.length === 0 || rowData.every(cell => cell === null || cell === undefined || cell === "")) {
              continue;
            }
            const rowObj: Record<string, string> = {};
            headers.forEach((header, index) => {
              const cellVal = rowData[index];
              rowObj[header] = cellVal !== undefined && cellVal !== null ? String(cellVal).trim() : "";
            });
            rows.push(rowObj);
          }
          
          if (headers.length === 0 || rows.length === 0) {
            toast.error("Excel sheet has no valid headers or records");
            resetState();
            return;
          }
          
          // Re-serialize raw data to CSV client-side so it can be uploaded to /api/upload-csv
          const csvContent = Papa.unparse({ fields: headers, data: rows.map(r => headers.map(h => r[h])) });
          
          // Create virtual CSV file
          const csvFileName = selectedFile.name.replace(/\.xlsx$|\.xls$/i, ".csv");
          const virtualCSVFile = new File([csvContent], csvFileName, { type: "text/csv" });
          
          setFile(virtualCSVFile);
          
          // Execute mapping
          const { mappedData, columnMapping: generatedMapping } = parseAndMapCSV(
            headers,
            rows
          );
          
          setPreviewRows(mappedData.slice(0, 5));
          setColumnMapping(generatedMapping);
          toast.info("Excel sheet parsed and mapped successfully! Preview below.");
        } catch (err) {
          console.error("Excel parse error:", err);
          toast.error("Failed to parse Excel sheet");
          resetState();
        }
      };
      reader.onerror = () => {
        toast.error("Failed to read Excel file");
        resetState();
      };
      reader.readAsArrayBuffer(selectedFile);
    } else {
      // CSV logic (original)
      setFile(selectedFile);
      Papa.parse<Record<string, string>>(selectedFile, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const headers = results.meta.fields || [];
          const rows = results.data;

          if (headers.length === 0 || rows.length === 0) {
            toast.error("CSV file seems empty or invalid");
            resetState();
            return;
          }

          const { mappedData, columnMapping: generatedMapping } = parseAndMapCSV(
            headers,
            rows
          );

          setPreviewRows(mappedData.slice(0, 5));
          setColumnMapping(generatedMapping);
          toast.info("CSV parsed successfully! Check preview below.");
        },
        error: (err) => {
          console.error("CSV parse error:", err);
          toast.error("Failed to parse CSV file");
          resetState();
        },
      });
    }
  };

  const handleConfirmImport = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-csv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to upload");
      }

      const data = await response.json();
      toast.success(`Successfully imported ${data.totalRecords} records!`, {
        duration: 5000,
      });
      
      await refreshCounts();
      onUploadSuccess();
      resetState();
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error(err.message || "Failed to complete import");
    } finally {
      setIsUploading(false);
    }
  };

  const resetState = () => {
    setFile(null);
    setPreviewRows([]);
    setColumnMapping({});
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_4px_24px_rgba(15,23,42,0.03)] space-y-6 text-slate-700">
      <div>
        <h2 className="text-lg font-bold text-slate-800 font-sans">Import Leads Spreadsheets</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Upload any CSV or Excel sheet file. We will intelligently map columns to corresponding lead fields automatically.
        </p>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#0D99FF] bg-blue-50/40"
              : "border-slate-300 hover:border-slate-400 bg-slate-50 hover:bg-slate-100/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="p-4 bg-[#0D99FF]/10 rounded-full text-[#00C2FF] mb-4">
            <UploadCloud size={32} />
          </div>
          <p className="text-sm font-bold text-slate-700">
            Drag & drop your CSV or Excel sheet file here, or <span className="text-[#0D99FF]">browse</span>
          </p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Supports CSV and Excel spreadsheet files (.csv, .xlsx, .xls)</p>
        </div>
      ) : (
        /* File Loaded & Mapping Preview Panel */
        <div className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <div className="flex items-center space-x-3 min-w-0">
              <div className="p-2.5 bg-blue-50 text-[#00C2FF] rounded-lg shrink-0">
                <FileText size={20} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              onClick={resetState}
              disabled={isUploading}
              className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-500 hover:text-slate-850 hover:bg-slate-50 transition-all disabled:opacity-50"
            >
              Change File
            </button>
          </div>

          {/* Mapping Visualizer */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/20">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Intelligent Column Mapping
              </span>
              <span className="text-[10px] bg-[#0D99FF]/10 text-[#0D99FF] px-2 py-0.5 rounded font-bold uppercase">
                Auto Mapped
              </span>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-56 overflow-y-auto">
              {Object.entries(columnMapping).map(([csvCol, dbField]) => (
                <div
                  key={csvCol}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-slate-200 text-xs font-medium"
                >
                  <span className="text-slate-600 truncate max-w-[120px]" title={csvCol}>
                    {csvCol}
                  </span>
                  <ChevronRight size={12} className="text-slate-400 mx-1 shrink-0" />
                  <span
                    className={`font-bold truncate max-w-[120px] ${
                      dbField === "ignored" ? "text-slate-400 italic" : "text-[#0D99FF]"
                    }`}
                    title={dbField}
                  >
                    {dbField}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mapped Row Preview Table */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-slate-450 uppercase tracking-wider">
              Preview of First 5 Mapped Rows
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-x-auto bg-white shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500">
                    <th className="px-4 py-3 font-bold">Row</th>
                    <th className="px-4 py-3 font-bold">Full Name</th>
                    <th className="px-4 py-3 font-bold">Job Title</th>
                    <th className="px-4 py-3 font-bold">Company</th>
                    <th className="px-4 py-3 font-bold">Email</th>
                    <th className="px-4 py-3 font-bold">Location</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                  {previewRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="px-4 py-2.5 font-mono text-slate-400">{idx + 1}</td>
                      <td className="px-4 py-2.5 font-bold text-slate-800">{row.prospectFullName}</td>
                      <td className="px-4 py-2.5">{row.prospectJobTitle || "-"}</td>
                      <td className="px-4 py-2.5">{row.businessName || "-"}</td>
                      <td className="px-4 py-2.5 truncate max-w-[150px]">{row.contactProfessionalEmail || "-"}</td>
                      <td className="px-4 py-2.5 truncate">
                        {[row.businessRegion, row.businessCountry].filter(Boolean).join(", ") || "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={resetState}
              disabled={isUploading}
              className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all text-xs font-bold disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmImport}
              disabled={isUploading}
              className="flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-[#10B981] hover:bg-emerald-600 text-white text-xs font-bold transition-all hover:shadow-[0_4px_12px_rgba(16,185,129,0.1)] disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                <>
                  <CheckCircle size={14} />
                  <span>Confirm Import</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
