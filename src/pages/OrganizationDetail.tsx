import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Building2, Users, CreditCard, ClipboardList } from "lucide-react";
import OrgUsersTable from "../components/Organizations/OrgUsersTable";
import OrgBilling from "../components/Organizations/OrgBilling";
import OrgActivityLog from "../components/Organizations/OrgActivityLog";

// Mock lookup — replace with API call later
const mockOrgDetail = {
  id: "1",
  name: "Acme Corp",
  plan: "Enterprise" as const,
  status: "Active" as const,
  adminEmail: "admin@acmecorp.com",
  users: 84,
  renewalDate: "Sep 12, 2026",
  createdDate: "Jan 8, 2024",
  industry: "Manufacturing",
  billingCycle: "Annual",
};

const statusStyles: Record<string, string> = {
  Active: "bg-primary-light text-primary-dark",
  Trial: "bg-warning-bg text-warning",
  "Pending Renewal": "bg-info-bg text-info",
  Suspended: "bg-error-bg text-error",
};

type TabId = "overview" | "users" | "billing" | "activity";

const tabs: { id: TabId; label: string; icon: typeof Building2 }[] = [
  { id: "overview", label: "Overview", icon: Building2 },
  { id: "users", label: "Users", icon: Users },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "activity", label: "Activity Log", icon: ClipboardList },
];

export default function OrganizationDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const org = mockOrgDetail;

  return (
    <div>
      {/* Back link */}
      <Link
        to="/organizations"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-primary-dark"
      >
        <ArrowLeft size={15} />
        Back to Organizations
      </Link>

      {/* Header */}
      <div className="mb-6 flex items-start justify-between rounded-2xl border border-border bg-white p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-white">
            <Building2 size={26} strokeWidth={1.8} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">{org.name}</h1>
            <p className="mt-1 text-sm text-text-muted">
              {org.plan} Plan · Org ID: {id}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${statusStyles[org.status]}`}
        >
          {org.status}
        </span>
      </div>

      {/* Top tab bar */}
      <div className="mb-6 border-b border-border">
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-base font-medium transition-colors ${
                  active
                    ? "text-primary-dark"
                    : "text-text-muted hover:text-primary-dark"
                }`}
              >
                <Icon size={17} strokeWidth={1.8} />
                {tab.label}

                {active && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-t-full bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div>
        {activeTab === "overview" && (
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-text-primary">
              Organization Details
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <DetailField label="Admin Email" value={org.adminEmail} />
              <DetailField label="Industry" value={org.industry} />
              <DetailField label="Active Users" value={String(org.users)} />
              <DetailField label="Billing Cycle" value={org.billingCycle} />
              <DetailField label="Renewal Date" value={org.renewalDate} />
              <DetailField label="Customer Since" value={org.createdDate} />
            </div>
          </div>
        )}

        {activeTab === "users" && <OrgUsersTable />}
        {activeTab === "billing" && <OrgBilling />}
        {activeTab === "activity" && <OrgActivityLog />}
      </div>
    </div>
  );
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <p className="mt-1 text-base font-medium text-text-primary">{value}</p>
    </div>
  );
}