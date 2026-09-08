import { Search, Calendar } from "lucide-react";

export default function AuditLogsFilters() {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-[280px]">
        <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          placeholder="Search by actor or action..."
          className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
        />
      </div>

      <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
        <option value="">All Categories</option>
        <option value="Organization">Organization</option>
        <option value="User">User</option>
        <option value="License">License</option>
        <option value="Billing">Billing</option>
        <option value="Security">Security</option>
      </select>

      <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
        <option value="">All Actors</option>
        <option value="Master Admin">Master Admin</option>
        <option value="System">System</option>
      </select>

      <div className="flex items-center gap-2">
        <Calendar size={16} className="text-text-muted" />
        <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
          <option>All time</option>
        </select>
      </div>
    </div>
  );
}