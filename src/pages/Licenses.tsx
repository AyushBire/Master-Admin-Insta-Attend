// src/pages/Licenses.tsx
import { useMemo, useState } from "react";
import { useAppData } from "../context/AppDataContext";
import type { LicenseRequestStatus } from "../context/AppDataContext";
import LicenseRequestFilters from "../components/Licenses/LicenseRequestFilters";
import LicenseRequestsList from "../components/Licenses/LicenseRequestsList";

const tabs: { id: LicenseRequestStatus; label: string }[] = [
  { id: "Pending", label: "Pending" },
  { id: "Approved", label: "Approved" },
  { id: "Rejected", label: "Rejected" },
];

export default function Licenses() {
  const { organizations, licenseRequests, approveLicenseRequest, rejectLicenseRequest } = useAppData();
  const [activeTab, setActiveTab] = useState<LicenseRequestStatus>("Pending");
  const [organizationFilter, setOrganizationFilter] = useState("");
  const [planFilter, setPlanFilter] = useState("");

  const filteredRequests = useMemo(() => {
    return licenseRequests.filter((req) => {
      const matchesTab = req.status === activeTab;
      const matchesOrg = !organizationFilter || req.organizationName === organizationFilter;
      const matchesPlan = !planFilter || req.plan === planFilter;
      return matchesTab && matchesOrg && matchesPlan;
    });
  }, [licenseRequests, activeTab, organizationFilter, planFilter]);

  const tabCounts = useMemo(() => {
    return tabs.reduce<Record<LicenseRequestStatus, number>>((acc, tab) => {
      acc[tab.id] = licenseRequests.filter((r) => r.status === tab.id).length;
      return acc;
    }, {} as Record<LicenseRequestStatus, number>);
  }, [licenseRequests]);

  return (
    <div>
      <h1 className="page-title">License Requests</h1>
      <p className="section-subtitle">Review and manage license requests submitted by client organizations.</p>

      <div className="mt-6">
        <LicenseRequestFilters
          organizationNames={organizations.map((o) => o.name)}
          organization={organizationFilter}
          onOrganizationChange={setOrganizationFilter}
          plan={planFilter}
          onPlanChange={setPlanFilter}
        />

        <div className="mb-4 flex items-center gap-1 border-b border-border">
          {tabs.map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-base transition-colors ${
                  active ? "font-semibold text-primary-dark" : "font-medium text-text-muted hover:text-primary-dark"
                }`}
              >
                {tab.label}
                <span className="status-badge status-badge--success">{tabCounts[tab.id]}</span>
                {active && <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-primary" />}
              </button>
            );
          })}
        </div>

        <LicenseRequestsList
          requests={filteredRequests}
          status={activeTab}
          onApprove={approveLicenseRequest}
          onReject={rejectLicenseRequest}
        />
      </div>
    </div>
  );
}