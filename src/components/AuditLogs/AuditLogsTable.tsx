// src/components/AuditLogs/AuditLogsTable.tsx
import {
  Building2,
  UserCog,
  CreditCard,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";
import { colors } from "../../styles/theme";

export interface AuditLogEntry {
  id: string;
  category: "Organization" | "User" | "License" | "Billing" | "Security";
  action: string;
  actor: string;
  target: string;
  timestamp: string;
  ipAddress: string;
}

const categoryConfig: Record<AuditLogEntry["category"], { icon: LucideIcon; color: string; bg: string }> = {
  Organization: { icon: Building2, color: colors.primary, bg: colors.primaryLight },
  User: { icon: UserCog, color: colors.info, bg: colors.infoBg },
  License: { icon: CreditCard, color: colors.warning, bg: colors.warningBg },
  Billing: { icon: CreditCard, color: colors.warning, bg: colors.warningBg },
  Security: { icon: ShieldAlert, color: colors.error, bg: colors.errorBg },
};

interface AuditLogsTableProps {
  logs: AuditLogEntry[];
}

export default function AuditLogsTable({ logs }: AuditLogsTableProps) {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="rounded-tl-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Action</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Actor</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Target</th>
            <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Timestamp</th>
            <th className="rounded-tr-2xl px-5 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">IP Address</th>
          </tr>
        </thead>

        <tbody>
          {logs.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-5 py-10 text-center text-base text-text-muted">
                No audit log entries found.
              </td>
            </tr>
          ) : (
            logs.map((log) => {
              const config = categoryConfig[log.category];
              const Icon = config.icon;
              return (
                <tr key={log.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: config.bg, color: config.color }}
                      >
                        <Icon size={15} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="text-base font-medium text-text-primary">{log.action}</p>
                        <p className="text-sm text-text-muted">{log.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-base text-text-muted">{log.actor}</td>
                  <td className="px-5 py-4 text-base text-text-muted">{log.target}</td>
                  <td className="px-5 py-4 text-base text-text-muted">{log.timestamp}</td>
                  <td className="px-5 py-4 text-sm text-text-muted">{log.ipAddress}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}