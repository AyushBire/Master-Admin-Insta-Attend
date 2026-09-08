import type { LucideIcon } from "lucide-react";
import { colors } from "../../styles/theme";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBackground?: string;
  positive?: boolean;
}

export default function StatCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = colors.primary,
  iconBackground = colors.primaryLight,
  positive = true,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-text-muted">{title}</p>
          <h2 className="mt-2 text-3xl font-semibold leading-none text-text-primary">
            {value}
          </h2>
        </div>

        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBackground, color: iconColor }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          <span className={`font-semibold ${positive ? "text-success" : "text-error"}`}>
            {change}
          </span>
          <span className="text-text-muted">{changeLabel}</span>
        </div>
      )}
    </div>
  );
}