import { MoreVertical, Shield, UserMinus, Mail } from "lucide-react";
import { useState } from "react";

export interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Member";
  status: "Active" | "Invited" | "Suspended";
  lastActive: string;
}

const mockUsers: OrgUser[] = [
  { id: "u1", name: "Sarah Chen", email: "sarah.chen@acmecorp.com", role: "Owner", status: "Active", lastActive: "2 hours ago" },
  { id: "u2", name: "James Patel", email: "james.patel@acmecorp.com", role: "Admin", status: "Active", lastActive: "1 day ago" },
  { id: "u3", name: "Maria Gomez", email: "maria.gomez@acmecorp.com", role: "Member", status: "Active", lastActive: "3 days ago" },
  { id: "u4", name: "Tom Reilly", email: "tom.reilly@acmecorp.com", role: "Member", status: "Invited", lastActive: "—" },
  { id: "u5", name: "Priya Nair", email: "priya.nair@acmecorp.com", role: "Member", status: "Suspended", lastActive: "2 weeks ago" },
];

const roleStyles: Record<OrgUser["role"], string> = {
  Owner: "bg-primary-light text-primary-dark",
  Admin: "bg-info-bg text-info",
  Member: "bg-primary-light/60 text-text-muted",
};

const statusStyles: Record<OrgUser["status"], string> = {
  Active: "bg-primary-light text-primary-dark",
  Invited: "bg-warning-bg text-warning",
  Suspended: "bg-error-bg text-error",
};

interface OrgUsersTableProps {
  users?: OrgUser[];
}

export default function OrgUsersTable({ users = mockUsers }: OrgUsersTableProps) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-text-primary">
          Users ({users.length})
        </h2>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-white hover:bg-primary-dark">
          <Mail size={14} />
          Invite User
        </button>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Name</th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Role</th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Status</th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Last Active</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
              <td className="px-6 py-4">
                <p className="text-base font-medium text-text-primary">{user.name}</p>
                <p className="text-sm text-text-muted">{user.email}</p>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${roleStyles[user.role]}`}>
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[user.status]}`}>
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 text-base text-text-muted">{user.lastActive}</td>
              <td className="relative px-6 py-4 text-right">
                <button
                  onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                  className="rounded-md p-1.5 text-text-muted hover:bg-primary-light hover:text-primary-dark"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenuId === user.id && (
                  <div className="absolute right-6 top-11 z-10 w-44 rounded-lg border border-border bg-white py-1 shadow-lg">
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-text-primary hover:bg-primary-light">
                      <Shield size={14} /> Change Role
                    </button>
                    <button className="flex w-full items-center gap-2 px-3 py-2 text-left text-base text-error hover:bg-primary-light">
                      <UserMinus size={14} /> Remove Access
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}