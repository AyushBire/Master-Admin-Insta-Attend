import { Search, Filter, Plus } from "lucide-react";

interface OrganizationFiltersProps {
  onAddClick: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  plan: string;
  onPlanChange: (value: string) => void;
}

export default function OrganizationFilters({
  onAddClick,
  search,
  onSearchChange,
  status,
  onStatusChange,
  plan,
  onPlanChange,
}: OrganizationFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="relative w-[260px]">
        <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by organization name..."
          className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
      >
        <option value="">All Statuses</option>
        <option value="Active">Active</option>
        <option value="Trial">Trial</option>
        <option value="Pending Renewal">Pending Renewal</option>
        <option value="Suspended">Suspended</option>
      </select>
      <select
        value={plan}
        onChange={(e) => onPlanChange(e.target.value)}
        className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
      >
        <option value="">All Plans</option>
        <option value="Monthly">Monthly</option>
        <option value="Quarterly">Quarterly</option>
        <option value="Yearly">Yearly</option>
      </select>
      <button className="flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-base text-text-muted hover:bg-primary-light">
        <Filter size={15} /> More Filters
      </button>
      {/* Add Organization button sits right beside More Filters */}
      <button
        onClick={onAddClick}
        className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-base font-medium text-white hover:bg-primary-dark"
      >
        <Plus size={16} strokeWidth={2} /> Add Organization
      </button>
    </div>
  );
}