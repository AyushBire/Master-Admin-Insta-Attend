import { MoreVertical, Ban, Trash2, Eye, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { statusBadgeClass } from "../../lib/statusStyles";

export interface Organization {
  id: string;
  name: string;
  plan: "Monthly" | "Quarterly" | "Yearly";
  status: "Active" | "Trial" | "Suspended" | "Pending Renewal";
  renewalDate: string;
}

interface OrganizationsTableProps {
  organizations: Organization[];
  onToggleSuspend: (org: Organization) => void;
  onDelete: (org: Organization) => void;
}

export default function OrganizationsTable({
  organizations,
  onToggleSuspend,
  onDelete,
}: OrganizationsTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState<"down" | "up">("down");

  const closeMenu = () => setOpenMenuId(null);
  const MENU_HEIGHT_ESTIMATE = 150;

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
    <div className="surface-card-static overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="table-head-row">
            <th className="table-head-cell rounded-tl-xl">Organization</th>
            <th className="table-head-cell">Plan</th>
            <th className="table-head-cell">Status</th>
            <th className="table-head-cell">Renewal Date</th>
            <th className="table-head-cell rounded-tr-xl text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {organizations.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-base text-text-muted">
                No organizations found.
              </td>
            </tr>
          ) : (
            organizations.map((org) => (
              <tr key={org.id} className="table-row">
                <td className="table-cell-primary">{org.name}</td>
                <td className="table-cell">{org.plan}</td>
                <td className="table-cell">
                  <span className={statusBadgeClass(org.status)}>{org.status}</span>
                </td>
                <td className="table-cell">{org.renewalDate}</td>
                <td className="relative table-cell text-right">
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
                        className={`absolute right-5 z-50 w-40 rounded-lg border border-border bg-white py-1 shadow-[var(--shadow-raised)] ${
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