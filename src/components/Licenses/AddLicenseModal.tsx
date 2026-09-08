import { X } from "lucide-react";
import { useState } from "react";

interface AddLicenseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: NewLicenseFormData) => void;
}

export interface NewLicenseFormData {
  organization: string;
  plan: "Starter" | "Professional" | "Enterprise";
  seats: number;
  status: "Active" | "Trial";
}

export default function AddLicenseModal({ open, onClose, onSubmit }: AddLicenseModalProps) {
  const [formData, setFormData] = useState<NewLicenseFormData>({
    organization: "",
    plan: "Starter",
    seats: 5,
    status: "Trial",
  });

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ organization: "", plan: "Starter", seats: 5, status: "Trial" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Issue License</h2>
          <button onClick={onClose} className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Organization</label>
            <input
              type="text"
              required
              value={formData.organization}
              onChange={(e) => setFormData((p) => ({ ...p, organization: e.target.value }))}
              placeholder="e.g. Acme Corp"
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-base font-medium text-text-primary">Plan</label>
              <select
                value={formData.plan}
                onChange={(e) => setFormData((p) => ({ ...p, plan: e.target.value as NewLicenseFormData["plan"] }))}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
              >
                <option value="Starter">Starter</option>
                <option value="Professional">Professional</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-base font-medium text-text-primary">Seats</label>
              <input
                type="number"
                min={1}
                required
                value={formData.seats}
                onChange={(e) => setFormData((p) => ({ ...p, seats: Number(e.target.value) }))}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-base font-medium text-text-primary">Initial Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData((p) => ({ ...p, status: e.target.value as NewLicenseFormData["status"] }))}
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            >
              <option value="Trial">Trial</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-base font-medium text-text-muted hover:bg-primary-light">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-dark">
              Issue License
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}