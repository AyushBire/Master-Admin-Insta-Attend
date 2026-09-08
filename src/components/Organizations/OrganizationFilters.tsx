import { Search, Plus, Filter } from "lucide-react";

interface OrganizationFiltersProps { onAddClick: () => void; }

export default function OrganizationFilters({ onAddClick }: OrganizationFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-[280px]">
          <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input type="text" placeholder="Search by organization name..." className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary" />
        </div>
        <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Trial">Trial</option>
          <option value="Pending Renewal">Pending Renewal</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary">
          <option value="">All Plans</option>
          <option value="Starter">Starter</option>
          <option value="Professional">Professional</option>
          <option value="Enterprise">Enterprise</option>
        </select>
        <button className="flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-3 text-base text-text-muted hover:bg-primary-light">
          <Filter size={15} /> More Filters
        </button>
      </div>
      <button onClick={onAddClick} className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-base font-medium text-white hover:bg-primary-dark">
        <Plus size={16} strokeWidth={2} /> Add Organization
      </button>
    </div>
  );
}