// Central mapping of every status string used across the app to a badge
// variant. Add a new status here once; every table picks it up.
export type StatusVariant = "success" | "warning" | "error" | "info" | "neutral";

export const statusVariantMap: Record<string, StatusVariant> = {
  Active: "success",
  Approved: "success",
  Trial: "warning",
  Pending: "warning",
  "Pending Renewal": "info",
  Invited: "warning",
  Suspended: "error",
  Rejected: "error",
  Expired: "error",
  Snoozed: "warning",
  Resolved: "neutral",
  Open: "success",
};

export function statusBadgeClass(status: string): string {
  const variant = statusVariantMap[status] ?? "neutral";
  return `status-badge status-badge--${variant}`;
}