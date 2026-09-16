export type LicenseEffectiveStatus = "Active" | "Expiring Soon" | "Expired" | "Cancelled";

const EXPIRING_SOON_THRESHOLD_DAYS = 30;

export function daysRemaining(expiresAtISO: string): number {
  const now = new Date();
  const expires = new Date(expiresAtISO);
  return Math.ceil((expires.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getLicenseEffectiveStatus(expiresAtISO: string, cancelled: boolean): LicenseEffectiveStatus {
  if (cancelled) return "Cancelled";
  const diff = daysRemaining(expiresAtISO);
  if (diff < 0) return "Expired";
  if (diff <= EXPIRING_SOON_THRESHOLD_DAYS) return "Expiring Soon";
  return "Active";
}

export function formatDaysRemaining(expiresAtISO: string, cancelled: boolean): string {
  if (cancelled) return "License cancelled";
  const diff = daysRemaining(expiresAtISO);
  if (diff < 0) return `Expired ${Math.abs(diff)} day${Math.abs(diff) === 1 ? "" : "s"} ago`;
  if (diff === 0) return "Expires today";
  return `${diff} day${diff === 1 ? "" : "s"} left`;
}