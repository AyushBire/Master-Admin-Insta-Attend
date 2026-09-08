import { useState } from "react";
import LicenseFilters from "../components/Licenses/LicenseFilters";
import LicensesTable from "../components/Licenses/LicensesTable";
import type { License } from "../components/Licenses/LicensesTable";
import AddLicenseModal from "../components/Licenses/AddLicenseModal";
import type { NewLicenseFormData } from "../components/Licenses/AddLicenseModal";
import EditLicenseModal from "../components/Licenses/EditLicenseModal";
import ConfirmDialog from "../components/Users/ConfirmDialog";

const initialLicenses: License[] = [
  { id: "1", organization: "Acme Corp", plan: "Enterprise", seats: 100, status: "Active", issuedDate: "Sep 12, 2024", expiryDate: "Sep 12, 2026" },
  { id: "2", organization: "Nimbus Retail", plan: "Professional", seats: 25, status: "Trial", issuedDate: "Aug 15, 2026", expiryDate: "Aug 29, 2026" },
  { id: "3", organization: "Bluepeak Logistics", plan: "Starter", seats: 10, status: "Expired", issuedDate: "Jul 1, 2025", expiryDate: "Jul 1, 2026" },
  { id: "4", organization: "Orbit Solutions", plan: "Professional", seats: 30, status: "Active", issuedDate: "Jan 10, 2025", expiryDate: "Jan 10, 2027" },
  { id: "5", organization: "Vertex Manufacturing", plan: "Enterprise", seats: 200, status: "Active", issuedDate: "Nov 3, 2024", expiryDate: "Nov 3, 2026" },
];

function addOneYear(dateStr: string): string {
  const base = dateStr === "—" ? new Date() : new Date(dateStr);
  const next = new Date(base);
  next.setFullYear(next.getFullYear() + 1);
  return next.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function Licenses() {
  const [licenses, setLicenses] = useState<License[]>(initialLicenses);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<License | null>(null);
  const [renewTarget, setRenewTarget] = useState<License | null>(null);
  const [revokeTarget, setRevokeTarget] = useState<License | null>(null);

  const handleAddLicense = (data: NewLicenseFormData) => {
    const newLicense: License = {
      id: String(Date.now()),
      organization: data.organization,
      plan: data.plan,
      seats: data.seats,
      status: data.status,
      issuedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      expiryDate: "—",
    };
    setLicenses((prev) => [newLicense, ...prev]);
  };

  const handleSaveEdit = (id: string, updates: Pick<License, "organization" | "plan" | "seats">) => {
    setLicenses((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  const handleConfirmRenew = () => {
    if (!renewTarget) return;
    setLicenses((prev) =>
      prev.map((l) =>
        l.id === renewTarget.id
          ? { ...l, status: "Active", expiryDate: addOneYear(l.expiryDate) }
          : l
      )
    );
    setRenewTarget(null);
  };

  const handleConfirmRevoke = () => {
    if (!revokeTarget) return;
    setLicenses((prev) =>
      prev.map((l) => (l.id === revokeTarget.id ? { ...l, status: "Expired" } : l))
    );
    setRevokeTarget(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">License</h1>
      <p className="mt-1 text-sm text-text-muted">
        Manage active licenses issued to client organizations.
      </p>

      <div className="mt-6">
        <LicenseFilters onAddClick={() => setAddModalOpen(true)} />
        <LicensesTable
          licenses={licenses}
          onEdit={(license) => setEditTarget(license)}
          onRenew={(license) => setRenewTarget(license)}
          onRevoke={(license) => setRevokeTarget(license)}
        />
      </div>

      <AddLicenseModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onSubmit={handleAddLicense} />

      <EditLicenseModal license={editTarget} onClose={() => setEditTarget(null)} onSave={handleSaveEdit} />

      <ConfirmDialog
        open={!!renewTarget}
        title="Renew License"
        message={`Renew the license for ${renewTarget?.organization} for another year? The new expiry date will be ${renewTarget ? addOneYear(renewTarget.expiryDate) : ""}.`}
        confirmLabel="Renew"
        onCancel={() => setRenewTarget(null)}
        onConfirm={handleConfirmRenew}
      />

      <ConfirmDialog
        open={!!revokeTarget}
        title="Revoke License"
        message={`This will immediately revoke access for ${revokeTarget?.organization}. Their license status will be set to Expired.`}
        confirmLabel="Revoke"
        danger
        onCancel={() => setRevokeTarget(null)}
        onConfirm={handleConfirmRevoke}
      />
    </div>
  );
}