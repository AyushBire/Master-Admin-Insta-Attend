import { X } from "lucide-react";
import { useState } from "react";

interface AddAdminModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewAdminFormData) => void;
}

export interface NewAdminFormData {
  name: string;
  email: string;
  role: "Super Admin" | "Support" | "Billing Admin" | "Read Only";
}

export default function AddAdminModal({ open, onClose, onSubmit }: AddAdminModalProps) {
  const [formData, setFormData] = useState<NewAdminFormData>({
    name: "",
    email: "",
    role: "Support",
  });

  if (!open) return null;

  const handleChange = (field: keyof NewAdminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", email: "", role: "Support" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Add Administrator</h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Alex Morgan"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="alex.morgan@instaattend.com"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">
              Role
            </label>
            <select
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Support">Support</option>
              <option value="Billing Admin">Billing Admin</option>
              <option value="Read Only">Read Only</option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-2 text-base font-medium text-text-muted hover:bg-primary-light"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-dark"
            >
              Send Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}