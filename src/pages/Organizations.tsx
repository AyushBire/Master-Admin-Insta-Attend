// src/pages/Organizations.tsx
import { useMemo, useState } from "react";
import { useAppData } from "../context/AppDataContext";
import OrganizationFilters from "../components/Organizations/OrganizationFilters";
import OrganizationsTable from "../components/Organizations/OrganizationsTable";
import type { Organization } from "../components/Organizations/OrganizationsTable";
import AddOrganizationModal from "../components/Organizations/AddOrganizationModal";
import ConfirmDialog from "../components/Users/ConfirmDialog";

export default function Organizations() {
  const { organizations, addOrganization, toggleSuspendOrganization, deleteOrganization } = useAppData();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [suspendTarget, setSuspendTarget] = useState<Organization | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Organization | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");

  const filteredOrganizations = useMemo(() => {
    return organizations.filter((org) => {
      const matchesSearch = org.name.toLowerCase().includes(search.trim().toLowerCase());
      const matchesStatus = !statusFilter || org.status === statusFilter;
      const matchesPlan = !planFilter || org.plan === planFilter;
      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [organizations, search, statusFilter, planFilter]);

  const handleConfirmSuspend = () => {
    if (!suspendTarget) return;
    toggleSuspendOrganization(suspendTarget.id);
    setSuspendTarget(null);
  };

  const handleConfirmDelete = () => {
    if (!deleteTarget) return;
    deleteOrganization(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div>
      <h1 className="page-title">Organizations</h1>
      <p className="section-subtitle">Manage all client organizations on the platform.</p>

      <div className="mt-6">
        <OrganizationFilters
          onAddClick={() => setAddModalOpen(true)}
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          plan={planFilter}
          onPlanChange={setPlanFilter}
        />
        <OrganizationsTable
          organizations={filteredOrganizations}
          onToggleSuspend={(org) => setSuspendTarget(org)}
          onDelete={(org) => setDeleteTarget(org)}
        />
      </div>

      <AddOrganizationModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={addOrganization}
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