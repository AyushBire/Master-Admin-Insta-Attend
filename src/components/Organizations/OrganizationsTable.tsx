import { MoreVertical, Pencil, Ban, Trash2, Eye, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export interface Organization {
  id: string;
  name: string;
  plan: "Starter" | "Professional" | "Enterprise";
  status: "Active" | "Trial" | "Suspended" | "Pending Renewal";
  users: number;
  renewalDate: string;
}

const statusStyles: Record<Organization["status"], string> = {
  Active: "bg-primary-light text-primary-dark",
  Trial: "bg-warning-bg text-warning",
  "Pending Renewal": "bg-info-bg text-info",
  Suspended: "bg-error-bg text-error",
};

interface OrganizationsTableProps {
  organizations: Organization[];
  onEdit: (org: Organization) => void;
  onToggleSuspend: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export default function OrganizationsTable({
  organizations,
  onEdit,
  onToggleSuspend,
  onDelete,
}: OrganizationsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState<"down" | "up">("down");

  const closeMenu = () => setOpenMenuId(null);
  const MENU_HEIGHT_ESTIMATE = 190;

  const handleToggleMenu = (orgId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (openMenuId === orgId) {
      closeMenu();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setMenuDirection(spaceBelow < MENU_HEIGHT_ESTIMATE ? "up" : "down");
    setOpenMenuId(orgId);
  };

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="rounded-tl-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Organization
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Plan
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Status
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Users
            </th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">
              Renewal Date
            </th>
            <th className="rounded-tr-2xl px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {organizations.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-5 py-10 text-center text-base text-text-muted">
                No organizations found.
              </td>
            </tr>
          ) : (
            organizations.map((org) => (
              <tr key={org.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
                <td className="px-5 py-4 text-base font-medium text-text-primary">{org.name}</td>
                <td className="px-5 py-4 text-base text-text-muted">{org.plan}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[org.status]}`}>
                    {org.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-base text-text-muted">{org.users}</td>
                <td className="px-5 py-4 text-base text-text-muted">{org.renewalDate}</td>
                <td className="relative px-5 py-4 text-right">
                  <button
                    onClick={(e) => handleToggleMenu(org.id, e)}
                    className="rounded-md p-1.5 text-text-muted hover:bg-primary-light hover:text-primary-dark"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenuId === org.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={closeMenu} />

                      <div
                        className={`absolute right-5 z-50 w-40 rounded-lg border border-border bg-white py-1 shadow-lg ${
                          menuDirection === "up" ? "bottom-11" : "top-11"
                        }`}
                      >
                        <Link
                          to={`/organizations/${org.id}`}
                          onClick={closeMenu}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light"
                        >
                          <Eye size={14} /> View
                        </Link>
                        <button
                          onClick={() => { onEdit(org); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => { onToggleSuspend(org); closeMenu(); }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-base hover:bg-primary-light ${
                            org.status === "Suspended" ? "text-success" : "text-warning"
                          }`}
                        >
                          {org.status === "Suspended" ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                          {org.status === "Suspended" ? "Activate" : "Suspend"}
                        </button>
                        <button
                          onClick={() => { onDelete(org); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-error hover:bg-primary-light"
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}