import { useState } from "react";
import { X, ArrowLeft, RefreshCw } from "lucide-react";
import type { License } from "../../context/AppDataContext";
import { addBillingCycle, formatDisplayDate, type BillingCycle } from "../../lib/billingCycle";

interface RenewLicenseModalProps {
  license: License;
  onClose: () => void;
  onRenew: (id: string, billingCycle: BillingCycle) => void;
}

type Step = "configure" | "confirm";

export default function RenewLicenseModal({ license, onClose, onRenew }: RenewLicenseModalProps) {
  const [step, setStep] = useState<Step>("configure");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(license.billingCycle);

  const now = new Date();
  const currentExpiry = new Date(license.expiresAt);
  const isLapsed = license.cancelled || currentExpiry.getTime() < now.getTime();
  const baseDate = isLapsed ? now : currentExpiry;
  const previewExpiry = formatDisplayDate(addBillingCycle(baseDate, billingCycle));

  const handleConfirm = () => {
    onRenew(license.id, billingCycle);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Renew License</h2>
            <p className="text-sm text-text-muted">{license.organizationName}</p>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-text-muted hover:bg-primary-light hover:text-primary-dark">
            <X size={18} />
          </button>
        </div>

        {step === "configure" && (
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-text-primary">Plan</label>
                <select value="Evolution" disabled className="h-10 w-full rounded-lg border border-border bg-primary-light px-3 text-sm text-text-primary outline-none">
                  <option value="Evolution">Evolution</option>
                </select>
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
              {isLapsed && (
                <p className="text-xs text-warning">
                  This license had {license.cancelled ? "been cancelled" : "expired"} — renewing will reactivate it starting today.
                </p>
              )}
            </div>

            <div className="mt-6 flex items-center justify-end">
              <button
                onClick={() => setStep("confirm")}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === "confirm" && (
          <div className="p-6">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-primary-light/40 p-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                <RefreshCw size={16} strokeWidth={1.8} />
              </div>
              <div className="text-sm text-text-primary">
                Renew <strong>{license.organizationName}</strong>'s license, billed <strong>{billingCycle.toLowerCase()}</strong>.
              </div>
            </div>

            <div className="mt-4 divide-y divide-border overflow-hidden rounded-xl border border-border">
              <Row label="Plan" value="Evolution" />
              <Row label="Billing Cycle" value={billingCycle} />
              <Row label="New Expiry Date" value={previewExpiry} />
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
                Confirm & Renew
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