import { X } from "lucide-react";
import { useState } from "react";
import type { License } from "./LicensesTable";

interface EditLicenseModalProps {
  license: License | null;
  onClose: () => void;
  onSave: (id: string, updates: Pick<License, "organization" | "plan" | "seats">) => void;
}

export default function EditLicenseModal({ license, onClose, onSave }: EditLicenseModalProps) {
  if (!license) return null;

  return (
    <EditLicenseForm
      key={license.id}
      license={license}
      onClose={onClose}
      onSave={onSave}
    />
  );
}

function EditLicenseForm({ license, onClose, onSave }: EditLicenseModalProps & { license: License }) {
  const [organization, setOrganization] = useState(license.organization);
  const [plan, setPlan] = useState<License["plan"]>(license.plan);
  const [seats, setSeats] = useState(license.seats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(license.id, { organization, plan, seats });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Edit License</h2>
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
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-base font-medium text-text-primary">Plan</label>
              <select
                value={plan}
                onChange={(e) => setPlan(e.target.value as License["plan"])}
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
                value={seats}
                onChange={(e) => setSeats(Number(e.target.value))}
                className="h-10 w-full rounded-lg border border-border bg-white px-3 text-base text-text-primary outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-border px-4 py-2 text-base font-medium text-text-muted hover:bg-primary-light">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-base font-medium text-white hover:bg-primary-dark">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}