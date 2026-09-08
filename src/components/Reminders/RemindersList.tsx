import {
  CreditCard,
  AlertTriangle,
  UserPlus,
  Bell,
  Check,
  Clock,
  X,
  type LucideIcon,
} from "lucide-react";
import { colors } from "../../styles/theme";

export interface Reminder {
  id: string;
  type: "Renewal" | "Trial" | "Approval" | "Payment";
  title: string;
  subtitle: string;
  dueLabel: string;
  status: "Open" | "Snoozed" | "Resolved";
}

const typeConfig: Record<Reminder["type"], { icon: LucideIcon; color: string; bg: string }> = {
  Renewal: { icon: CreditCard, color: colors.primary, bg: colors.primaryLight },
  Trial: { icon: AlertTriangle, color: colors.warning, bg: colors.warningBg },
  Approval: { icon: UserPlus, color: colors.info, bg: colors.infoBg },
  Payment: { icon: Bell, color: colors.error, bg: colors.errorBg },
};

const statusStyles: Record<Reminder["status"], string> = {
  Open: "bg-primary-light text-primary-dark",
  Snoozed: "bg-warning-bg text-warning",
  Resolved: "bg-primary-light/60 text-text-muted",
};

interface RemindersListProps {
  reminders: Reminder[];
  onResolve: (id: string) => void;
  onSnooze: (id: string) => void;
  onDismiss: (id: string) => void;
}

export default function RemindersList({ reminders, onResolve, onSnooze, onDismiss }: RemindersListProps) {
  if (reminders.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-white p-10 text-center shadow-sm">
        <p className="text-base text-text-muted">No reminders found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {reminders.map((reminder) => {
        const config = typeConfig[reminder.type];
        const Icon = config.icon;
        const isResolved = reminder.status === "Resolved";

        return (
          <div
            key={reminder.id}
            className={`flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm ${
              isResolved ? "opacity-60" : ""
            }`}
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: config.bg, color: config.color }}
            >
              <Icon size={19} strokeWidth={1.8} />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-base font-medium text-text-primary">{reminder.title}</p>
              <p className="truncate text-sm text-text-muted">{reminder.subtitle}</p>
            </div>

            <span className="shrink-0 text-sm text-text-muted">{reminder.dueLabel}</span>

            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[reminder.status]}`}>
              {reminder.status}
            </span>

            {!isResolved && (
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => onResolve(reminder.id)}
                  title="Mark Resolved"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:bg-primary-light hover:text-primary-dark"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => onSnooze(reminder.id)}
                  title="Snooze"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:bg-primary-light hover:text-warning"
                >
                  <Clock size={16} />
                </button>
                <button
                  onClick={() => onDismiss(reminder.id)}
                  title="Dismiss"
                  className="flex h-8 w-8 items-center justify-center rounded-md text-text-muted hover:bg-primary-light hover:text-error"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}