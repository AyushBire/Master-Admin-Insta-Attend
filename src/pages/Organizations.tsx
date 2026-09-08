import { useState } from "react";
import OrganizationFilters from "../components/Organizations/OrganizationFilters";
import OrganizationsTable from "../components/Organizations/OrganizationsTable";
import type { Organization } from "../components/Organizations/OrganizationsTable";
import AddOrganizationModal from "../components/Organizations/AddOrganizationModal";
import type { NewOrgFormData } from "../components/Organizations/AddOrganizationModal";
import EditOrganizationModal from "../components/Organizations/EditOrganizationModal";
import ConfirmDialog from "../components/Users/ConfirmDialog";

const initialOrganizations: Organization[] = [
  { id: "1", name: "Acme Corp", plan: "Enterprise", status: "Active", users: 84, renewalDate: "Sep 12, 2026" },
  { id: "2", name: "Nimbus Retail", plan: "Professional", status: "Trial", users: 12, renewalDate: "Aug 29, 2026" },
  { id: "3", name: "Bluepeak Logistics", plan: "Starter", status: "Pending Renewal", users: 6, renewalDate: "Aug 27, 2026" },
  { id: "4", name: "Orbit Solutions", plan: "Professional", status: "Suspended", users: 21, renewalDate: "Jul 15, 2026" },
  { id: "5", name: "Vertex Manufacturing", plan: "Enterprise", status: "Active", users: 156, renewalDate: "Nov 3, 2026" },
];

export default function Organizations() {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Organization | null>(null);
  const [suspendTarget, setSuspendTarget] = useState<Organization | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Organization | null>(null);

  const handleAddOrganization = (data: NewOrgFormData) => {
    const newOrg: Organization = {
      id: String(Date.now()),
      name: data.name,
      plan: data.plan,
      status: data.status,
      users: 1,
      renewalDate: "—",
    };
    setOrganizations((prev) => [newOrg, ...prev]);
  };

  const handleSaveEdit = (id: string, updates: Pick<Organization, "name" | "plan">) => {
    setOrganizations((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
  };

  const handleConfirmSuspend = () => {
    if (!suspendTarget) return;
    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === suspendTarget.id
          ? { ...o, status: o.status === "Suspended" ? "Active" : "Suspended" }
          : o
      )
    );
    setSuspendTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    setOrganizations((prev) => prev.filter((o) => o.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Organizations</h1>
      <p className="mt-1 text-sm text-text-muted">
        Manage all client organizations on the platform.
      </p>

      <div className="mt-6">
        <OrganizationFilters onAddClick={() => setAddModalOpen(true)} />
        <OrganizationsTable
          organizations={organizations}
          onEdit={(org) => setEditTarget(org)}
          onToggleSuspend={(org) => setSuspendTarget(org)}
          onDelete={(org) => setDeleteTarget(org)}
        />
      </div>

      <AddOrganizationModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddOrganization}
      />

      <EditOrganizationModal
        key={editTarget?.id ?? "none"}
        organization={editTarget}
        onClose={() => setEditTarget(null)}
        onSave={handleSaveEdit}
      />

      <ConfirmDialog
        open={!!suspendTarget}
        title={suspendTarget?.status === "Suspended" ? "Activate Organization" : "Suspend Organization"}
        message={
          suspendTarget?.status === "Suspended"
            ? `Restore platform access for ${suspendTarget?.name}?`
            : `${suspendTarget?.name} and all its users will immediately lose access. You can reactivate later.`
        }
        confirmLabel={suspendTarget?.status === "Suspended" ? "Activate" : "Suspend"}
        danger={suspendTarget?.status !== "Suspended"}
        onCancel={() => setSuspendTarget(null)}
        onConfirm={handleConfirmSuspend}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Organization"
        message={`This will permanently delete ${deleteTarget?.name} and all associated data. This action cannot be undone.`}
        confirmLabel="Delete"
        danger
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}