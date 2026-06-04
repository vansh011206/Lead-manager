import { MappedLead } from "@/types";

// Define the raw mapping dictionary with keys as DB fields and values as matching strings
const MAPPING_DICTIONARY: Record<keyof MappedLead, string[]> = {
  prospectFullName: [
    "name",
    "full_name",
    "prospect_full_name",
    "prospect_name",
    "fullname",
    "contact_name",
    "lead_name",
    "person_name",
    "first_last",
    "full name",
    "prospectname",
    "contactname",
    "leadname",
    "clientname",
    "customername"
  ],
  prospectJobTitle: [
    "job_title",
    "title",
    "prospect_job_title",
    "position",
    "role",
    "designation",
    "job title",
    "jobtitle",
    "occupation",
    "prospectjobtitle"
  ],
  prospectLinkedin: [
    "linkedin",
    "prospect_linkedin",
    "linkedin_url",
    "linkedin_profile",
    "linkedin link",
    "linkedinurl",
    "linkedinprofile",
    "prospectlinkedin",
    "linkedin_link"
  ],
  businessName: [
    "business_name",
    "company",
    "company_name",
    "organization",
    "org_name",
    "business",
    "firm",
    "employer",
    "business name",
    "companyname",
    "businessname",
    "orgname"
  ],
  businessWebsite: [
    "website",
    "business_website",
    "company_website",
    "url",
    "web",
    "site",
    "homepage",
    "business website",
    "companywebsite",
    "businesswebsite",
    "domain"
  ],
  businessNumberOfEmployees: [
    "employees",
    "number_of_employees",
    "employee_count",
    "company_size",
    "team_size",
    "num_employees",
    "business_number_of_employees_range",
    "employeecount",
    "companysize",
    "teamsize",
    "noofemployees",
    "staff"
  ],
  businessYearlyRevenue: [
    "revenue",
    "yearly_revenue",
    "annual_revenue",
    "business_yearly_revenue_range",
    "income",
    "yearlyrevenue",
    "annualrevenue",
    "turnover",
    "sales"
  ],
  businessCountry: [
    "country",
    "business_country",
    "country_name",
    "nation",
    "business_country_name",
    "businesscountry"
  ],
  businessRegion: [
    "region",
    "business_region",
    "state",
    "province",
    "area",
    "location",
    "city",
    "county",
    "businessregion"
  ],
  businessNaicsDescription: [
    "naics",
    "industry",
    "business_naics_description",
    "sector",
    "business_type",
    "naics_description",
    "industry_description",
    "naicsdescription",
    "businessnaicsdescription",
    "industrydescription",
    "category"
  ],
  contactProfessionalEmail: [
    "email",
    "professional_email",
    "work_email",
    "business_email",
    "contact_professions_email",
    "contact_email",
    "professionalemail",
    "workemail",
    "businessemail",
    "contactemail",
    "emailaddress",
    "email_address",
    "emailid",
    "email_id"
  ],
  contactEmails: [
    "emails",
    "contact_emails",
    "other_emails",
    "personal_email",
    "all_emails",
    "otheremails",
    "personalemail"
  ],
  contactMobilePhone: [
    "mobile",
    "mobile_phone",
    "cell",
    "cellphone",
    "contact_mobile_phone",
    "mobile_number",
    "mobilephone",
    "mobilenumber",
    "cellphone",
    "cellnumber",
    "mobile_no",
    "mobileno"
  ],
  contactPhoneNumbers: [
    "phone",
    "phone_number",
    "telephone",
    "contact_phone_numbers",
    "phone_numbers",
    "tel",
    "phonenumber",
    "telephonenumber",
    "phone_no",
    "phoneno"
  ],
  originalCreatedAt: [
    "created_at",
    "created",
    "date_created",
    "creation_date",
    "date_added",
    "createdat",
    "datecreated",
    "creationdate"
  ],
  prospectId: ["prospect_id", "lead_id", "contact_id", "person_id", "prospectid", "leadid"],
  businessId: ["business_id", "company_id", "org_id", "organization_id", "businessid", "companyid"],
  rowNum: ["row_num", "row", "number", "sr_no", "serial", "sno", "row_number", "rownum", "rownumber", "serialnumber"]
};

// Normalize a string: lowercase, remove spaces, underscores, hyphens, and non-alphanumeric characters
function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

// Pre-normalize the mapping dictionary values
const normalizedDictionary: Record<string, string[]> = {};
Object.entries(MAPPING_DICTIONARY).forEach(([key, values]) => {
  normalizedDictionary[key] = values.map(normalizeString);
});

// Check if a column's row values look like emails (having @ symbol)
function isEmailColumn(header: string, rows: Record<string, string>[]): boolean {
  let totalNonEmpty = 0;
  let hasAtCount = 0;
  for (let i = 0; i < Math.min(rows.length, 10); i++) {
    const val = rows[i]?.[header]?.trim();
    if (val) {
      totalNonEmpty++;
      if (val.includes("@")) {
        hasAtCount++;
      }
    }
  }
  if (totalNonEmpty === 0) return false;
  return (hasAtCount / totalNonEmpty) >= 0.5;
}

export interface ParseResult {
  mappedData: MappedLead[];
  columnMapping: Record<string, keyof MappedLead | "ignored">;
}

export function parseAndMapCSV(
  headers: string[],
  rows: Record<string, string>[]
): ParseResult {
  const columnMapping: Record<string, keyof MappedLead | "ignored"> = {};
  const mappedKeys = new Set<string>();

  // Map each header to a schema field
  headers.forEach((header) => {
    const normalizedHeader = normalizeString(header);
    let matchedField: keyof MappedLead | null = null;

    for (const [field, patterns] of Object.entries(normalizedDictionary)) {
      // Check if exact match exists in patterns
      if (patterns.includes(normalizedHeader)) {
        matchedField = field as keyof MappedLead;
        break;
      }
    }

    // If no exact match, check if any pattern is included in normalized header
    if (!matchedField) {
      for (const [field, patterns] of Object.entries(normalizedDictionary)) {
        if (patterns.some((p) => normalizedHeader.includes(p) || p.includes(normalizedHeader))) {
          matchedField = field as keyof MappedLead;
          break;
        }
      }
    }

    // Heuristics based matching if still no match
    if (!matchedField) {
      if (normalizedHeader.includes("linkedin") || normalizedHeader.includes("linkden")) {
        matchedField = "prospectLinkedin";
      } else if (normalizedHeader.includes("email") || normalizedHeader.includes("mail")) {
        matchedField = "contactProfessionalEmail";
      } else if (normalizedHeader.includes("phone") || normalizedHeader.includes("mobile") || normalizedHeader.includes("cell") || normalizedHeader.includes("tel")) {
        matchedField = "contactMobilePhone";
      } else if (normalizedHeader.includes("name") && !normalizedHeader.includes("company") && !normalizedHeader.includes("business")) {
        matchedField = "prospectFullName";
      } else if (normalizedHeader.includes("company") || normalizedHeader.includes("business") || normalizedHeader.includes("firm")) {
        if (normalizedHeader.includes("web") || normalizedHeader.includes("site") || normalizedHeader.includes("url")) {
          matchedField = "businessWebsite";
        } else if (normalizedHeader.includes("revenue") || normalizedHeader.includes("sale")) {
          matchedField = "businessYearlyRevenue";
        } else if (normalizedHeader.includes("employee") || normalizedHeader.includes("size")) {
          matchedField = "businessNumberOfEmployees";
        } else {
          matchedField = "businessName";
        }
      } else if (normalizedHeader.includes("web") || normalizedHeader.includes("site") || normalizedHeader.includes("url")) {
        matchedField = "businessWebsite";
      } else if (normalizedHeader.includes("revenue") || normalizedHeader.includes("income") || normalizedHeader.includes("sale")) {
        matchedField = "businessYearlyRevenue";
      } else if (normalizedHeader.includes("employee") || normalizedHeader.includes("size") || normalizedHeader.includes("staff")) {
        matchedField = "businessNumberOfEmployees";
      } else if (normalizedHeader.includes("country")) {
        matchedField = "businessCountry";
      } else if (normalizedHeader.includes("state") || normalizedHeader.includes("region") || normalizedHeader.includes("city") || normalizedHeader.includes("location") || normalizedHeader.includes("province") || normalizedHeader.includes("address")) {
        matchedField = "businessRegion";
      } else if (normalizedHeader.includes("industry") || normalizedHeader.includes("sector") || normalizedHeader.includes("naics") || normalizedHeader.includes("category")) {
        matchedField = "businessNaicsDescription";
      } else if (normalizedHeader.includes("title") || normalizedHeader.includes("job") || normalizedHeader.includes("role") || normalizedHeader.includes("position")) {
        matchedField = "prospectJobTitle";
      } else if (normalizedHeader.includes("date") || normalizedHeader.includes("time") || normalizedHeader.includes("created")) {
        matchedField = "originalCreatedAt";
      } else if (normalizedHeader.includes("row") || normalizedHeader.includes("serial") || normalizedHeader.includes("number") || normalizedHeader.includes("sno")) {
        matchedField = "rowNum";
      }
    }

    // Post-validation: verify email fields actually contain '@'
    if (matchedField === "contactProfessionalEmail" || matchedField === "contactEmails") {
      if (!isEmailColumn(header, rows)) {
        matchedField = null; // discard mapping

        // Try mapping to address/location if headers match address keywords
        if (
          normalizedHeader.includes("address") ||
          normalizedHeader.includes("location") ||
          normalizedHeader.includes("city") ||
          normalizedHeader.includes("state") ||
          normalizedHeader.includes("region") ||
          normalizedHeader.includes("province")
        ) {
          matchedField = "businessRegion";
        } else if (normalizedHeader.includes("country")) {
          matchedField = "businessCountry";
        }
      }
    }

    // Only map if field has not been mapped yet
    if (matchedField && !mappedKeys.has(matchedField)) {
      columnMapping[header] = matchedField;
      mappedKeys.add(matchedField);
    } else {
      columnMapping[header] = "ignored";
    }
  });

  // Map the rows to MappedLead structure
  const mappedData: MappedLead[] = rows.map((row, idx) => {
    const lead: Partial<Record<keyof MappedLead, any>> = {};

    headers.forEach((header) => {
      const field = columnMapping[header];
      if (field && field !== "ignored") {
        const val = row[header]?.trim();
        // Convert rowNum to integer if needed
        if (field === "rowNum") {
          const parsedNum = parseInt(val, 10);
          lead[field] = isNaN(parsedNum) ? idx + 1 : parsedNum;
        } else {
          lead[field] = val || null;
        }
      }
    });

    // Make sure prospectFullName is always present (if missing or generic, use fallback)
    const isGenericName = !lead.prospectFullName || 
                          lead.prospectFullName.trim() === "" || 
                          /^unnamed\s+lead/i.test(lead.prospectFullName.trim()) ||
                          lead.prospectFullName.toLowerCase() === "unnamed";
    if (isGenericName) {
      if (lead.businessName && lead.businessName.trim() !== "") {
        lead.prospectFullName = lead.businessName.trim();
      } else {
        lead.prospectFullName = "Unnamed Lead " + (idx + 1);
      }
    }

    return lead as MappedLead;
  });

  return { mappedData, columnMapping };
}
