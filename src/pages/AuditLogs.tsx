// src/pages/AuditLogs.tsx
import { useMemo, useState } from "react";
import AuditLogsFilters from "../components/AuditLogs/AuditLogsFilters";
import AuditLogsTable from "../components/AuditLogs/AuditLogsTable";
import type { AuditLogEntry } from "../components/AuditLogs/AuditLogsTable";

const mockLogs: AuditLogEntry[] = [
  { id: "1", category: "License", action: "Renewed license", actor: "Master Admin", target: "Vertex Manufacturing", timestamp: "Today, 3:42 PM", ipAddress: "103.21.244.10" },
  { id: "2", category: "User", action: "Changed role to Billing Admin", actor: "Master Admin", target: "Devansh Rao", timestamp: "Today, 1:15 PM", ipAddress: "103.21.244.10" },
  { id: "3", category: "Organization", action: "Created new organization", actor: "Master Admin", target: "Nimbus Retail", timestamp: "Yesterday, 4:50 PM", ipAddress: "103.21.244.10" },
  { id: "4", category: "Security", action: "Suspended administrator account", actor: "Master Admin", target: "Karan Shah", timestamp: "Yesterday, 2:03 PM", ipAddress: "103.21.244.10" },
  { id: "5", category: "License", action: "Revoked license", actor: "Master Admin", target: "Bluepeak Logistics", timestamp: "Aug 25, 2026, 9:20 AM", ipAddress: "103.21.244.10" },
  { id: "6", category: "Billing", action: "Payment failed — retry required", actor: "System", target: "Orbit Solutions", timestamp: "Aug 24, 2026, 6:00 AM", ipAddress: "—" },
  { id: "7", category: "Organization", action: "Suspended organization", actor: "Master Admin", target: "Orbit Solutions", timestamp: "Aug 22, 2026, 11:30 AM", ipAddress: "103.21.244.10" },
  { id: "8", category: "User", action: "Invited new administrator", actor: "Master Admin", target: "Anjali Mehta", timestamp: "Aug 20, 2026, 3:10 PM", ipAddress: "103.21.244.10" },
];

// Reference "today" for this mock dataset, since timestamps are static demo strings.
const REFERENCE_DATE = new Date(2026, 7, 27);

function parseLogDate(timestamp: string): Date {
  if (timestamp.startsWith("Today")) return new Date(REFERENCE_DATE);
  if (timestamp.startsWith("Yesterday")) {
    const d = new Date(REFERENCE_DATE);
    d.setDate(d.getDate() - 1);
    return d;
  }
  const datePart = timestamp.split(",").slice(0, 2).join(",").trim();
  const parsed = new Date(datePart);
  return isNaN(parsed.getTime()) ? new Date(REFERENCE_DATE) : parsed;
}

function isWithinRange(timestamp: string, range: string): boolean {
  if (!range || range === "All time") return true;
  const days = range === "Last 7 days" ? 7 : range === "Last 30 days" ? 30 : range === "Last 90 days" ? 90 : Infinity;
  const logDate = parseLogDate(timestamp);
  const diffDays = (REFERENCE_DATE.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24);
  return diffDays <= days;
}

export default function AuditLogs() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [actorFilter, setActorFilter] = useState("");
  const [dateRange, setDateRange] = useState("Last 7 days");

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    return mockLogs.filter((log) => {
      const matchesSearch =
        !query ||
        log.actor.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query) ||
        log.target.toLowerCase().includes(query);
      const matchesCategory = !categoryFilter || log.category === categoryFilter;
      const matchesActor = !actorFilter || log.actor === actorFilter;
      const matchesDate = isWithinRange(log.timestamp, dateRange);
      return matchesSearch && matchesCategory && matchesActor && matchesDate;
    });
  }, [search, categoryFilter, actorFilter, dateRange]);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Audit Logs</h1>
      <p className="mt-1 text-sm text-text-muted">
        Track all administrative actions across the platform.
      </p>

      <div className="mt-6">
        <AuditLogsFilters
          search={search}
          onSearchChange={setSearch}
          category={categoryFilter}
          onCategoryChange={setCategoryFilter}
          actor={actorFilter}
          onActorChange={setActorFilter}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
        />
        <AuditLogsTable logs={filteredLogs} />
      </div>
    </div>
  );
}