import { Lead } from "@/generated/client";

export interface MappedLead {
  rowNum?: number | null;
  prospectFullName: string;
  prospectJobTitle?: string | null;
  prospectLinkedin?: string | null;
  businessName?: string | null;
  businessWebsite?: string | null;
  businessNumberOfEmployees?: string | null;
  businessYearlyRevenue?: string | null;
  businessCountry?: string | null;
  businessRegion?: string | null;
  businessNaicsDescription?: string | null;
  contactProfessionalEmail?: string | null;
  contactEmails?: string | null;
  contactMobilePhone?: string | null;
  contactPhoneNumbers?: string | null;
  prospectId?: string | null;
  businessId?: string | null;
  originalCreatedAt?: string | null;
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  totalPages: number;
  filterOptions: {
    countries: string[];
    regions: string[];
    industries: string[];
    batches: { id: string; fileName: string; uploadedAt: Date }[];
  };
}

export interface SidebarCounts {
  all: number;
  new: number;
  contacted: number;
  remarked: number;
  declined: number;
}
