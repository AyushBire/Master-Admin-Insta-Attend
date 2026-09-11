// src/components/Reminders/RemindersFilters.tsx
import { Search } from "lucide-react";

interface RemindersFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  type: string;
  onTypeChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export default function RemindersFilters({
  search,
  onSearchChange,
  type,
  onTypeChange,
  status,
  onStatusChange,
}: RemindersFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-[280px]">
        <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reminders..."
          className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
        />
      </div>

      <select
        value={type}
        onChange={(e) => onTypeChange(e.target.value)}
        className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
      >
        <option value="">All Types</option>
        <option value="Renewal">Renewal</option>
        <option value="Trial">Trial Ending</option>
        <option value="Approval">Pending Approval</option>
        <option value="Payment">Payment Issue</option>
      </select>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
      >
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Snoozed">Snoozed</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
}