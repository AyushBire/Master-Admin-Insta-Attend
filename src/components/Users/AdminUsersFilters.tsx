// src/components/Users/AdminUsersFilters.tsx
import { Search, Plus } from "lucide-react";

interface AdminUsersFiltersProps {
  onAddClick: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
}

export default function AdminUsersFilters({
  onAddClick,
  search,
  onSearchChange,
  role,
  onRoleChange,
  status,
  onStatusChange,
}: AdminUsersFiltersProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative w-[280px]">
          <Search
            size={16}
            strokeWidth={1.8}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by name or email..."
            className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
          />
        </div>

        <select
          value={role}
          onChange={(e) => onRoleChange(e.target.value)}
          className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
        >
          <option value="">All Roles</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Support">Support</option>
          <option value="Billing Admin">Billing Admin</option>
          <option value="Read Only">Read Only</option>
        </select>

        <select
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-10 rounded-lg border border-border bg-white px-3 text-base text-text-muted outline-none focus:border-primary"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Invited">Invited</option>
          <option value="Suspended">Suspended</option>
        </select>
      </div>

      <button
        onClick={onAddClick}
        className="flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-base font-medium text-white hover:bg-primary-dark"
      >
        <Plus size={16} strokeWidth={2} />
        Add Administrator
      </button>
    </div>
  );
}