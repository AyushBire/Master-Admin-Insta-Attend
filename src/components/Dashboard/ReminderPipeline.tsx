import { Bell, CreditCard, AlertTriangle, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { colors } from "../../styles/theme";

interface Reminder {
  id: number; title: string; subtitle: string; time: string;
  icon: LucideIcon; iconColor: string; iconBackground: string;
}

const reminders: Reminder[] = [
  { id: 1, title: "Subscription renewal due", subtitle: "Acme Corp — Enterprise plan", time: "Today", icon: CreditCard, iconColor: colors.primary, iconBackground: colors.primaryLight },
  { id: 2, title: "Trial ending soon", subtitle: "Nimbus Retail — 3 days left", time: "Tomorrow", icon: AlertTriangle, iconColor: colors.warning, iconBackground: colors.warningBg },
  { id: 3, title: "New organization pending approval", subtitle: "Bluepeak Logistics", time: "2 days", icon: UserPlus, iconColor: colors.info, iconBackground: colors.infoBg },
  { id: 4, title: "Payment failed", subtitle: "Orbit Solutions — retry required", time: "3 days", icon: Bell, iconColor: colors.error, iconBackground: colors.errorBg },
];

export default function ReminderPipeline() {
  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Reminders</h2>
        <button className="text-sm font-medium text-primary hover:underline">View all</button>
      </div>

      <div className="space-y-4">
        {reminders.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg" style={{ backgroundColor: item.iconBackground, color: item.iconColor }}>
                <Icon size={16} strokeWidth={1.8} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-base font-medium text-text-primary">{item.title}</p>
                <p className="truncate text-sm text-text-muted">{item.subtitle}</p>
              </div>
              <span className="shrink-0 text-xs text-text-muted">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}