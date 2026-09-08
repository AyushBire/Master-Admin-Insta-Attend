import { MoreVertical, Pencil, Ban, Trash2, KeyRound, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Support" | "Billing Admin" | "Read Only";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

const roleStyles: Record<AdminUser["role"], string> = {
  "Super Admin": "bg-primary-light text-primary-dark",
  Support: "bg-info-bg text-info",
  "Billing Admin": "bg-warning-bg text-warning",
  "Read Only": "bg-primary-light/60 text-text-muted",
};

const statusStyles: Record<AdminUser["status"], string> = {
  Active: "bg-primary-light text-primary-dark",
  Invited: "bg-warning-bg text-warning",
  Suspended: "bg-error-bg text-error",
};

interface AdminUsersTableProps {
  users: AdminUser[];
  onEditRole: (user: AdminUser) => void;
  onResetPassword: (user: AdminUser) => void;
  onToggleSuspend: (user: AdminUser) => void;
  onRemove: (user: AdminUser) => void;
}

export default function AdminUsersTable({
  users,
  onEditRole,
  onResetPassword,
  onToggleSuspend,
  onRemove,
}: AdminUsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuDirection, setMenuDirection] = useState<"down" | "up">("down");

  const closeMenu = () => setOpenMenuId(null);

  const MENU_HEIGHT_ESTIMATE = 190; // approx height of the 4-item dropdown

  const handleToggleMenu = (userId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (openMenuId === userId) {
      closeMenu();
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;

    setMenuDirection(spaceBelow < MENU_HEIGHT_ESTIMATE ? "up" : "down");
    setOpenMenuId(userId);
  };

  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="rounded-tl-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Name</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Role</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Status</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Last Active</th>
            <th className="rounded-tr-2xl px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-base text-text-muted">
                No administrators found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
                <td className="px-5 py-4">
                  <p className="text-base font-medium text-text-primary">{user.name}</p>
                  <p className="text-sm text-text-muted">{user.email}</p>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-base text-text-muted">{user.lastActive}</td>
                <td className="relative px-5 py-4 text-right">
                  <button
                    onClick={(e) => handleToggleMenu(user.id, e)}
                    className="rounded-md p-1.5 text-text-muted hover:bg-primary-light hover:text-primary-dark"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenuId === user.id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={closeMenu} />

                      <div
                        className={`absolute right-5 z-50 w-44 rounded-lg border border-border bg-white py-1 shadow-lg ${
                          menuDirection === "up" ? "bottom-11" : "top-11"
                        }`}
                      >
                        <button
                          onClick={() => { onEditRole(user); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light"
                        >
                          <Pencil size={14} /> Edit Role
                        </button>
                        <button
                          onClick={() => { onResetPassword(user); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light"
                        >
                          <KeyRound size={14} /> Reset Password
                        </button>
                        <button
                          onClick={() => { onToggleSuspend(user); closeMenu(); }}
                          className={`flex w-full items-center gap-2 px-3 py-2 text-left text-base hover:bg-primary-light ${
                            user.status === "Suspended" ? "text-success" : "text-warning"
                          }`}
                        >
                          {user.status === "Suspended" ? <CheckCircle2 size={14} /> : <Ban size={14} />}
                          {user.status === "Suspended" ? "Activate" : "Suspend"}
                        </button>
                        <button
                          onClick={() => { onRemove(user); closeMenu(); }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-error hover:bg-primary-light"
                        >
                          <Trash2 size={14} /> Remove
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