import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | undefined | null): string {
  if (!date) return "N/A";
  const d = new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function cleanContactInfo(value: string | null): string[] {
  if (!value) return [];
  const trimmed = value.trim();
  if (!trimmed) return [];

  if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => {
            if (typeof item === "object" && item !== null) {
              return item.address || item.number || item.value || item.email || item.phone;
            }
            return String(item);
          })
          .filter(Boolean);
      } else if (typeof parsed === "object" && parsed !== null) {
        const itemVal = parsed.address || parsed.number || parsed.value || parsed.email || parsed.phone;
        return itemVal ? [itemVal] : [];
      }
    } catch (e) {
      // fallback
    }
  }

  // Fallback string cleanup
  return trimmed
    .replace(/[\[\]\{\}"']/g, "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getFirstPhone(mobile: string | null, other: string | null): string | null {
  const mobileCleaned = cleanContactInfo(mobile);
  if (mobileCleaned.length > 0) return mobileCleaned[0];
  const otherCleaned = cleanContactInfo(other);
  if (otherCleaned.length > 0) return otherCleaned[0];
  return null;
}
