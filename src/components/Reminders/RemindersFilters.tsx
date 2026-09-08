import { Search } from "lucide-react";

export default function RemindersFilters() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-[280px]">
        <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search reminders..."
          className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
        />
      </div>

      <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
        <option value="">All Types</option>
        <option value="Renewal">Renewal</option>
        <option value="Trial">Trial Ending</option>
        <option value="Approval">Pending Approval</option>
        <option value="Payment">Payment Issue</option>
      </select>

      <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
        <option value="">All Statuses</option>
        <option value="Open">Open</option>
        <option value="Snoozed">Snoozed</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
}