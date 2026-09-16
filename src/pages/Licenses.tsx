// src/pages/Licenses.tsx
import { useMemo, useState } from "react";
import { ShieldCheck, AlertTriangle, ShieldOff, Ban } from "lucide-react";
import { useAppData } from "../context/AppDataContext";
import type { License } from "../context/AppDataContext";
import StatCard from "../components/Dashboard/StatCard";
import LicensesFilters from "../components/Licenses/LicensesFilters";
import LicensesTable from "../components/Licenses/LicensesTable";
import IssueLicenseModal from "../components/Licenses/IssueLicenseModal";
import RenewLicenseModal from "../components/Licenses/RenewLicenseModal";
import ModifyLicenseModal from "../components/Licenses/ModifyLicenseModal";
import ConfirmDialog from "../components/Users/ConfirmDialog";
import { getLicenseEffectiveStatus } from "../lib/licenseStatus";

export default function Licenses() {
  const { organizations, licenses, issueLicense, renewLicense, modifyLicense, toggleCancelLicense } = useAppData();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [renewTarget, setRenewTarget] = useState<License | null>(null);
  const [cancelTarget, setCancelTarget] = useState<License | null>(null);
  const [modifyTarget, setModifyTarget] = useState<License | null>(null);

  const unlicensedOrganizations = useMemo(
    () => organizations.filter((org) => !licenses.some((lic) => lic.organizationId === org.id)),
    [organizations, licenses]
  );

  const filteredLicenses = useMemo(() => {
    const query = search.trim().toLowerCase();
    return licenses.filter((lic) => {
      const matchesSearch = !query || lic.organizationName.toLowerCase().includes(query);
      const effectiveStatus = getLicenseEffectiveStatus(lic.expiresAt, lic.cancelled);
      const matchesStatus = !statusFilter || effectiveStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [licenses, search, statusFilter]);

  const stats = useMemo(() => {
    let active = 0, expiringSoon = 0, expired = 0, cancelled = 0;
    licenses.forEach((lic) => {
      const s = getLicenseEffectiveStatus(lic.expiresAt, lic.cancelled);
      if (s === "Active") active++;
      else if (s === "Expiring Soon") expiringSoon++;
      else if (s === "Expired") expired++;
      else cancelled++;
    });
    return { active, expiringSoon, expired, cancelled };
  }, [licenses]);

  const handleConfirmCancelToggle = () => {
    if (!cancelTarget) return;
    toggleCancelLicense(cancelTarget.id);
    setCancelTarget(null);
  };

  return (
    <div>
      <h1 className="page-title">License Management</h1>
      <p className="section-subtitle">
        View and manage every organization's license — plan, billing cycle, renewal, and status.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active" value={stats.active} icon={ShieldCheck} />
        <StatCard title="Expiring Soon" value={stats.expiringSoon} icon={AlertTriangle} iconColor="#F59E0B" iconBackground="#FEF3C7" />
        <StatCard title="Expired" value={stats.expired} icon={ShieldOff} iconColor="#DC2626" iconBackground="#FEE2E2" positive={false} />
        <StatCard title="Cancelled" value={stats.cancelled} icon={Ban} iconColor="#647589" iconBackground="#F1F5F9" positive={false} />
      </div>

      <div className="mt-6">
        <LicensesFilters
          organizationNames={organizations.map((o) => o.name)}
          search={search}
          onSearchChange={setSearch}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          onIssueClick={() => setIssueModalOpen(true)}
        />

        <LicensesTable
          licenses={filteredLicenses}
          onRenew={(lic) => setRenewTarget(lic)}
          onModify={(lic) => setModifyTarget(lic)}
          onToggleCancel={(lic) => setCancelTarget(lic)}
        />
      </div>

      {issueModalOpen && (
        <IssueLicenseModal
          unlicensedOrganizations={unlicensedOrganizations}
          onClose={() => setIssueModalOpen(false)}
          onIssue={issueLicense}
        />
      )}

      {renewTarget && (
        <RenewLicenseModal
          key={renewTarget.id}
          license={renewTarget}
          onClose={() => setRenewTarget(null)}
          onRenew={renewLicense}
        />
      )}

      {modifyTarget && (
        <ModifyLicenseModal
          key={modifyTarget.id}
          license={modifyTarget}
          onClose={() => setModifyTarget(null)}
          onSave={modifyLicense}
        />
      )}

      <ConfirmDialog
        open={!!cancelTarget}
        title={cancelTarget?.cancelled ? "Reactivate License" : "Cancel License"}
        message={
          cancelTarget?.cancelled
            ? `Reactivate ${cancelTarget?.organizationName}'s license?`
            : `${cancelTarget?.organizationName} will immediately lose access once cancelled. You can reactivate later.`
        }
        confirmLabel={cancelTarget?.cancelled ? "Reactivate" : "Cancel License"}
        danger={!cancelTarget?.cancelled}
        onCancel={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancelToggle}
      />
    </div>
  );
}