// src/pages/UsersAdministrators.tsx
import { useMemo, useState } from "react";
import AdminUsersFilters from "../components/Users/AdminUsersFilters";
import AdminUsersTable from "../components/Users/AdminUsersTable";
import type { AdminUser } from "../components/Users/AdminUsersTable";
import AddAdminModal from "../components/Users/AddAdminModal";
import type { NewAdminFormData } from "../components/Users/AddAdminModal";
import EditRoleModal from "../components/Users/EditRoleModal";
import ConfirmDialog from "../components/Users/ConfirmDialog";

const initialAdmins: AdminUser[] = [
  { id: "1", name: "Master Admin", email: "admin@instaattend.com", role: "Super Admin", status: "Active", lastActive: "Just now" },
  { id: "2", name: "Riya Kapoor", email: "riya.kapoor@instaattend.com", role: "Support", status: "Active", lastActive: "1 hour ago" },
  { id: "3", name: "Devansh Rao", email: "devansh.rao@instaattend.com", role: "Billing Admin", status: "Active", lastActive: "5 hours ago" },
  { id: "4", name: "Anjali Mehta", email: "anjali.mehta@instaattend.com", role: "Read Only", status: "Invited", lastActive: "—" },
  { id: "5", name: "Karan Shah", email: "karan.shah@instaattend.com", role: "Support", status: "Suspended", lastActive: "3 weeks ago" },
];

export default function UsersAdministrators() {
  const [admins, setAdmins] = useState<AdminUser[]>(initialAdmins);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<AdminUser | null>(null);
  const [removeTarget, setRemoveTarget] = useState<AdminUser | null>(null);
  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredAdmins = useMemo(() => {
    const query = search.trim().toLowerCase();
    return admins.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesRole = !roleFilter || user.role === roleFilter;
      const matchesStatus = !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [admins, search, roleFilter, statusFilter]);

  const handleAddAdmin = (data: NewAdminFormData) => {
    const newAdmin: AdminUser = {
      id: String(Date.now()),
      name: data.name,
      email: data.email,
      role: data.role,
      status: "Invited",
      lastActive: "—",
    };
    setAdmins((prev) => [newAdmin, ...prev]);
  };

  const handleSaveRole = (userId: string, newRole: AdminUser["role"]) => {
    setAdmins((prev) => prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u)));
  };

  const handleConfirmSuspend = () => {
    if (!suspendTarget) return;
    setAdmins((prev) =>
      prev.map((u) =>
        u.id === suspendTarget.id
          ? { ...u, status: u.status === "Suspended" ? "Active" : "Suspended" }
          : u
      )
    );
    setSuspendTarget(null);
  };

  const handleConfirmRemove = () => {
    if (!removeTarget) return;
    setAdmins((prev) => prev.filter((u) => u.id !== removeTarget.id));
    setRemoveTarget(null);
  };

  const handleConfirmReset = () => {
    setResetTarget(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Users & Administrators</h1>
      <p className="mt-1 text-sm text-text-muted">
        Manage platform-level access for the Master Admin control center.
      </p>

      <div className="mt-6">
        <AdminUsersFilters
          onAddClick={() => setAddModalOpen(true)}
          search={search}
          onSearchChange={setSearch}
          role={roleFilter}
          onRoleChange={setRoleFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <AdminUsersTable
          users={filteredAdmins}
          onEditRole={(user) => setEditingUser(user)}
          onResetPassword={(user) => setResetTarget(user)}
          onToggleSuspend={(user) => setSuspendTarget(user)}
          onRemove={(user) => setRemoveTarget(user)}
        />
      </div>

      <AddAdminModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddAdmin}
      />

      <EditRoleModal
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSave={handleSaveRole}
      />

      <ConfirmDialog
        open={!!suspendTarget}
        title={suspendTarget?.status === "Suspended" ? "Activate Administrator" : "Suspend Administrator"}
        message={
          suspendTarget?.status === "Suspended"
            ? `Restore platform access for ${suspendTarget?.name}?`
            : `${suspendTarget?.name} will immediately lose access to the Master Admin panel. You can reactivate them later.`
        }
        confirmLabel={suspendTarget?.status === "Suspended" ? "Activate" : "Suspend"}
        danger={suspendTarget?.status !== "Suspended"}
        onCancel={() => setSuspendTarget(null)}
        onConfirm={handleConfirmSuspend}
      />

      <ConfirmDialog
        open={!!removeTarget}
        title="Remove Administrator"
        message={`This will permanently remove ${removeTarget?.name} from the platform. This action cannot be undone.`}
        confirmLabel="Remove"
        danger
        onCancel={() => setRemoveTarget(null)}
        onConfirm={handleConfirmRemove}
      />

      <ConfirmDialog
        open={!!resetTarget}
        title="Reset Password"
        message={`Send a password reset link to ${resetTarget?.name} (${resetTarget?.email})?`}
        confirmLabel="Send Reset Link"
        onCancel={() => setResetTarget(null)}
        onConfirm={handleConfirmReset}
      />
    </div>
  );
}