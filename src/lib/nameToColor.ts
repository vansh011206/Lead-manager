export interface GradientColors {
  from: string;
  to: string;
}

const SOLID_COLORS = [
  "#0D99FF", // blue
  "#10B981", // emerald
  "#F59E0B", // amber
  "#6366F1", // indigo
  "#8B5CF6", // violet
  "#EC4899", // pink
  "#14B8A6", // teal
  "#06B6D4", // cyan
  "#F97316", // orange
  "#3B82F6"  // sky blue
];

export function getNameColor(name: string): GradientColors {
  if (!name) return { from: SOLID_COLORS[0], to: SOLID_COLORS[0] };
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash * 31;
  }
  const index = Math.abs(hash) % SOLID_COLORS.length;
  const color = SOLID_COLORS[index];
  return { from: color, to: color };
}

export function getNameInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0].substring(0, 1).toUpperCase();
  const first = parts[0].substring(0, 1).toUpperCase();
  const last = parts[parts.length - 1].substring(0, 1).toUpperCase();
  return first + last;
}

export function getStatusColor(status: string): { bg: string; text: string; border: string; dot: string } {
  switch (status.toLowerCase()) {
    case "contacted":
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/20",
        dot: "bg-emerald-500"
      };
    case "remarked":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/20",
        dot: "bg-amber-500"
      };
    case "declined":
      return {
        bg: "bg-red-500/10",
        text: "text-red-400",
        border: "border-red-500/20",
        dot: "bg-red-500"
      };
    case "new":
    default:
      return {
        bg: "bg-blue-500/10",
        text: "text-blue-400",
        border: "border-blue-500/20",
        dot: "bg-blue-400"
      };
  }
}
