import { X } from "lucide-react";
import { useState } from "react";

interface AddOrganizationModalProps {
  open: boolean; onClose: () => void; onSubmit: (data: NewOrgFormData) => void;
}
export interface NewOrgFormData {
  name: string;
  adminName: string;
  email: string;
  plan: "Monthly" | "Quarterly" | "Yearly";
  status: "Active" | "Trial";
}

export default function AddOrganizationModal({ open, onClose, onSubmit }: AddOrganizationModalProps) {
  const [formData, setFormData] = useState<NewOrgFormData>({
    name: "", adminName: "", email: "", plan: "Monthly", status: "Trial",
  });
  if (!open) return null;

  const handleChange = (field: keyof NewOrgFormData, value: string) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    // TODO (future): once the organization is created, trigger a mail to
    // formData.email inviting the org admin to set up their login
    // credentials for their organization's admin page.

    setFormData({ name: "", adminName: "", email: "", plan: "Monthly", status: "Trial" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Add Organization</h2>
          <button onClick={onClose} className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Organization Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Acme Corp"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Admin Name</label>
            <input
              type="text"
              required
              value={formData.adminName}
              onChange={(e) => handleChange("adminName", e.target.value)}
              placeholder="e.g. Sarah Chen"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Admin Email</label>
            <input type="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="admin@company.com" className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-base font-medium text-text-primary">Plan</label>
              <select value={formData.plan} onChange={(e) => handleChange("plan", e.target.value)} className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary">
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-base font-medium text-text-primary">Initial Status</label>
              <select value={formData.status} onChange={(e) => handleChange("status", e.target.value)} className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary">
                <option value="Trial">Trial</option>
                <option value="Active">Active</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-base font-medium text-text-muted hover:bg-primary-light">Cancel</button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-dark">Add Organization</button>
          </div>
        </form>
      </div>
    </div>
  );
}