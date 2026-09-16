import { useState } from "react";
import { X, Search, Building2, ArrowLeft, ShieldCheck } from "lucide-react";
import type { Organization } from "../../context/AppDataContext";
import { addBillingCycle, formatDisplayDate, type BillingCycle } from "../../lib/billingCycle";

interface IssueLicenseModalProps {
  unlicensedOrganizations: Organization[];
  onClose: () => void;
  onIssue: (organizationId: string, billingCycle: BillingCycle) => void;
}

type Step = "select" | "configure" | "confirm";

export default function IssueLicenseModal({ unlicensedOrganizations, onClose, onIssue }: IssueLicenseModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [search, setSearch] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("Monthly");

  const filteredOrgs = unlicensedOrganizations.filter((org) =>
    org.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  const previewExpiry = selectedOrg ? formatDisplayDate(addBillingCycle(new Date(), billingCycle)) : "";

  const handleSelectOrg = (org: Organization) => {
    setSelectedOrg(org);
    setStep("configure");
  };

  const handleConfirm = () => {
    if (!selectedOrg) return;
    onIssue(selectedOrg.id, billingCycle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Issue New License</h2>
            <p className="text-sm text-text-muted">
              {step === "select" && "Choose an organization without an active license."}
              {step === "configure" && selectedOrg?.name}
              {step === "confirm" && "Review before issuing."}
            </p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark">
            <X size={18} />
          </button>
        </div>

        {/* STEP 1 — select organization */}
        {step === "select" && (
          <div className="p-6">
            <div className="relative mb-4">
              <Search size={16} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search organizations..."
                className="h-10 w-full rounded-lg border border-border bg-white pl-9 pr-4 text-sm text-text-primary outline-none placeholder:text-text-muted focus:border-primary"
              />
            </div>

            <div className="max-h-72 space-y-1 overflow-y-auto">
              {filteredOrgs.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">
                  {unlicensedOrganizations.length === 0
                    ? "Every organization already has a license."
                    : "No matching organizations."}
                </p>
              ) : (
                filteredOrgs.map((org) => (
                  <button
                    key={org.id}
                    onClick={() => handleSelectOrg(org)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left hover:bg-primary-light"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary">
                      <Building2 size={16} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-text-primary">{org.name}</p>
                      <p className="truncate text-xs text-text-muted">{org.email || "No admin email on file"}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* STEP 2 — configure plan + billing cycle */}
        {step === "configure" && selectedOrg && (
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">Plan</label>
                <select value="Evolution" disabled className="h-10 w-full rounded-lg border border-border bg-primary-light px-3 text-sm text-text-primary outline-none">
                  <option value="Evolution">Evolution</option>
                </select>
                <p className="mt-1 text-xs text-text-muted">Evolution is currently the only available plan.</p>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">Billing Cycle</label>
                <select
                  value={billingCycle}
                  onChange={(e) => setBillingCycle(e.target.value as BillingCycle)}
                  className="h-10 w-full rounded-lg border border-border bg-white px-3 text-sm text-text-primary outline-none focus:border-primary"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep("select")}
                className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-primary-light"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={() => setStep("confirm")}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — confirm */}
        {step === "confirm" && selectedOrg && (
          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-primary-light/40 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <ShieldCheck size={16} strokeWidth={1.8} />
              </div>
              <div className="text-sm text-text-primary">
                You're about to issue an <strong>Evolution</strong> license for <strong>{selectedOrg.name}</strong>, billed <strong>{billingCycle.toLowerCase()}</strong>.
              </div>
            </div>

            <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
              <Row label="Organization" value={selectedOrg.name} />
              <Row label="Plan" value="Evolution" />
              <Row label="Billing Cycle" value={billingCycle} />
              <Row label="Starts" value={formatDisplayDate(new Date())} />
              <Row label="Expires" value={previewExpiry} />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setStep("configure")}
                className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted hover:bg-primary-light"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Confirm & Issue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-sm text-text-muted">{label}</span>
      <span className="text-sm font-medium text-text-primary">{value}</span>
    </div>
  );
}