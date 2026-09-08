import AuditLogsFilters from "../components/AuditLogs/AuditLogsFilters";
import AuditLogsTable from "../components/AuditLogs/AuditLogsTable";

export default function AuditLogs() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Audit Logs</h1>
      <p className="mt-1 text-sm text-text-muted">
        Track all administrative actions across the platform.
      </p>

      <div className="mt-6">
        <AuditLogsFilters />
        <AuditLogsTable />
      </div>
    </div>
  );
}