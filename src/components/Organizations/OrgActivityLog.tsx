import {
  UserPlus,
  UserMinus,
  CreditCard,
  Settings,
  ShieldAlert,
  LogIn,
  type LucideIcon,
} from "lucide-react";
import { colors } from "../../styles/theme";

interface ActivityEntry {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
}

const mockActivity: ActivityEntry[] = [
  {
    id: "a1",
    action: "Invited Tom Reilly as Member",
    actor: "Sarah Chen",
    timestamp: "Today, 2:14 PM",
    icon: UserPlus,
    iconColor: colors.primary,
    iconBackground: colors.primaryLight,
  },
  {
    id: "a2",
    action: "Updated payment method",
    actor: "James Patel",
    timestamp: "Yesterday, 11:02 AM",
    icon: CreditCard,
    iconColor: colors.info,
    iconBackground: colors.infoBg,
  },
  {
    id: "a3",
    action: "Changed organization plan to Enterprise",
    actor: "Master Admin",
    timestamp: "Aug 20, 2026, 9:45 AM",
    icon: Settings,
    iconColor: colors.primary,
    iconBackground: colors.primaryLight,
  },
  {
    id: "a4",
    action: "Suspended user Priya Nair",
    actor: "Sarah Chen",
    timestamp: "Aug 14, 2026, 4:30 PM",
    icon: ShieldAlert,
    iconColor: colors.error,
    iconBackground: colors.errorBg,
  },
  {
    id: "a5",
    action: "Removed access for a former employee",
    actor: "Sarah Chen",
    timestamp: "Aug 9, 2026, 10:12 AM",
    icon: UserMinus,
    iconColor: colors.error,
    iconBackground: colors.errorBg,
  },
  {
    id: "a6",
    action: "Signed in from a new device",
    actor: "James Patel",
    timestamp: "Aug 5, 2026, 8:03 AM",
    icon: LogIn,
    iconColor: colors.textMuted,
    iconBackground: colors.primaryLight,
  },
];

export default function OrgActivityLog() {
  return (
    <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-lg font-semibold text-text-primary">
        Activity Log
      </h2>

      <div className="relative space-y-6 pl-2">
        {/* Vertical timeline line */}
        <div className="absolute bottom-1 left-[19px] top-1 w-px bg-border" />

        {mockActivity.map((entry) => {
          const Icon = entry.icon;
          return (
            <div key={entry.id} className="relative flex items-start gap-4">
              <div
                className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white"
                style={{ backgroundColor: entry.iconBackground, color: entry.iconColor }}
              >
                <Icon size={16} strokeWidth={1.8} />
              </div>

              <div className="flex-1 pt-1">
                <p className="text-base font-medium text-text-primary">
                  {entry.action}
                </p>
                <p className="mt-0.5 text-sm text-text-muted">
                  {entry.actor} · {entry.timestamp}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}