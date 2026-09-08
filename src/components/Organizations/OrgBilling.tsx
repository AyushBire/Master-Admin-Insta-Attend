import { CreditCard, Download, CheckCircle2 } from "lucide-react";
import { colors } from "../../styles/theme";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const mockInvoices: Invoice[] = [
  { id: "INV-2026-0847", date: "Aug 12, 2026", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2025-0812", date: "Aug 12, 2025", amount: "$4,800.00", status: "Paid" },
  { id: "INV-2024-0798", date: "Aug 12, 2024", amount: "$3,600.00", status: "Paid" },
];

const invoiceStatusStyles: Record<Invoice["status"], string> = {
  Paid: "bg-primary-light text-primary-dark",
  Pending: "bg-warning-bg text-warning",
  Failed: "bg-error-bg text-error",
};

export default function OrgBilling() {
  return (
    <div className="space-y-6">
      {/* Current plan + payment method */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">
            Current Subscription
          </h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Plan</span>
              <span className="text-base font-semibold text-text-primary">Enterprise</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Billing Cycle</span>
              <span className="text-base font-medium text-text-primary">Annual</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Amount</span>
              <span className="text-base font-medium text-text-primary">$4,800.00 / year</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-muted">Next Renewal</span>
              <span className="text-base font-medium text-text-primary">Sep 12, 2026</span>
            </div>
          </div>

          <button className="mt-5 w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-primary hover:bg-primary-light">
            Change Plan
          </button>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-text-primary">
            Payment Method
          </h2>

          <div className="flex items-center gap-4 rounded-xl border border-border p-4">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
            >
              <CreditCard size={20} strokeWidth={1.8} />
            </div>
            <div className="flex-1">
              <p className="text-base font-medium text-text-primary">Visa •••• 4242</p>
              <p className="text-sm text-text-muted">Expires 08/2028</p>
            </div>
            <CheckCircle2 size={18} className="text-success" />
          </div>

          <button className="mt-5 w-full rounded-lg border border-border py-2.5 text-sm font-medium text-text-primary hover:bg-primary-light">
            Update Payment Method
          </button>
        </div>
      </div>

      {/* Invoice history */}
      <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">Invoice History</h2>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-border bg-primary-light/40">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Invoice</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Date</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Amount</th>
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Status</th>
              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">Receipt</th>
            </tr>
          </thead>
          <tbody>
            {mockInvoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
                <td className="px-6 py-4 text-base font-medium text-text-primary">{invoice.id}</td>
                <td className="px-6 py-4 text-base text-text-muted">{invoice.date}</td>
                <td className="px-6 py-4 text-base text-text-muted">{invoice.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${invoiceStatusStyles[invoice.status]}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                    <Download size={14} />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}