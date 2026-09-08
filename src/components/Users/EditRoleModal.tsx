import { X } from "lucide-react";
import { useState } from "react";
import type { AdminUser } from "./AdminUsersTable";

interface EditRoleModalProps {
  user: AdminUser | null;
  onClose: () => void;
  onSave: (userId: string, newRole: AdminUser["role"]) => void;
}

export default function EditRoleModal({ user, onClose, onSave }: EditRoleModalProps) {
  if (!user) return null;

  return (
    <EditRoleForm
      key={user.id}
      user={user}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function EditRoleForm({
  user,
  onClose,
  onSave,
}: {
  user: AdminUser;
  onClose: () => void;
  onSave: EditRoleModalProps["onSave"];
}) {
  const [role, setRole] = useState<AdminUser["role"]>(user.role);

  const handleSave = () => {
    onSave(user.id, role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Edit Role</h2>
          <button onClick={onClose} className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark">
            <X size={18} />
          </button>
        </div>

        <p className="mb-4 text-sm text-text-muted">
          Change access level for <span className="font-medium text-text-primary">{user.name}</span>
        </p>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as AdminUser["role"])}
          className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
        >
          <option value="Super Admin">Super Admin</option>
          <option value="Support">Support</option>
          <option value="Billing Admin">Billing Admin</option>
          <option value="Read Only">Read Only</option>
        </select>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-base font-medium text-text-muted hover:bg-primary-light">
            Cancel
          </button>
          <button onClick={handleSave} className="rounded-lg bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-dark">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}