import { colors } from "../../styles/theme";

interface StatusItem {
  label: string;
  count: number;
  percentage: number;
  color: string;
}

const statusData: StatusItem[] = [
  { label: "Active", count: 219, percentage: 88, color: colors.primary },
  { label: "Trial", count: 18, percentage: 7, color: colors.warning },
  { label: "Pending Renewal", count: 8, percentage: 3, color: colors.info },
  { label: "Suspended", count: 3, percentage: 2, color: colors.error },
];

export default function PlatformStatus() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Platform Status</h2>
        <p className="mt-1 text-sm text-text-muted">
          Organization status breakdown across the platform
        </p>
      </div>

      <div className="space-y-5">
        {statusData.map((item) => (
          <div key={item.label}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="font-medium text-text-primary">{item.label}</span>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <span>{item.count} orgs</span>
                <span className="font-semibold text-text-primary">{item.percentage}%</span>
              </div>
            </div>

            <div className="h-2 w-full overflow-hidden rounded-full bg-primary-light">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}