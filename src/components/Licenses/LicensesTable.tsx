import { MoreVertical, RefreshCw, Ban, Pencil } from "lucide-react";
import { useState } from "react";

export interface License {
  id: string;
  organization: string;
  plan: "Starter" | "Professional" | "Enterprise";
  seats: number;
  status: "Active" | "Expired" | "Trial";
  issuedDate: string;
  expiryDate: string;
}

const statusStyles: Record<License["status"], string> = {
  Active: "bg-primary-light text-primary-dark",
  Trial: "bg-warning-bg text-warning",
  Expired: "bg-error-bg text-error",
};

interface LicensesTableProps {
  licenses: License[];
  onRenew: (license: License) => void;
  onRevoke: (license: License) => void;
  onEdit: (license: License) => void;
}

export default function LicensesTable({ licenses, onRenew, onRevoke, onEdit }: LicensesTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState<"down" | "up">("down");

  const closeMenu = () => setOpenMenuId(null);
  const MENU_HEIGHT_ESTIMATE = 150;

  const handleToggleMenu = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (openMenuId === id) {
      closeMenu();
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setMenuDirection(spaceBelow < MENU_HEIGHT_ESTIMATE ? "up" : "down");
    setOpenMenuId(id);
  };

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="rounded-tl-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Organization</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Plan</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Seats</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Status</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Issued</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Expires</th>
            <th className="rounded-tr-2xl px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">Actions</th>
          </tr>
        </thead>

        <tbody>
          {licenses.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-5 py-10 text-center text-base text-text-muted">
                No licenses found.
              </td>
            </tr>
          ) : (
            licenses.map((license) => (
              <tr key={license.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
                <td className="px-5 py-4 text-base font-medium text-text-primary">{license.organization}</td>
                <td className="px-5 py-4 text-base text-text-muted">{license.plan}</td>
                <td className="px-5 py-4 text-base text-text-muted">{license.seats}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[license.status]}`}>
                    {license.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-base text-text-muted">{license.issuedDate}</td>
                <td className="px-5 py-4 text-base text-text-muted">{license.expiryDate}</td>
                <td className="relative px-5 py-4 text-right">
                  <button
                    onClick={(e) => handleToggleMenu(license.id, e)}
                    className="rounded-md p-1.5 text-text-muted hover:bg-primary-light hover:text-primary-dark"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenuId === license.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={closeMenu} />
                      <div
                        className={`absolute right-5 z-50 w-40 rounded-lg border border-border bg-white py-1 shadow-lg ${
                          menuDirection === "up" ? "bottom-11" : "top-11"
                        }`}
                      >
                        <button
                          onClick={() => { onEdit(license); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light"
                        >
                          <Pencil size={14} /> Edit
                        </button>
                        <button
                          onClick={() => { onRenew(license); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-primary hover:bg-primary-light"
                        >
                          <RefreshCw size={14} /> Renew
                        </button>
                        <button
                          onClick={() => { onRevoke(license); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-error hover:bg-primary-light"
                        >
                          <Ban size={14} /> Revoke
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