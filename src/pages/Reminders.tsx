import { useState } from "react";
import RemindersFilters from "../components/Reminders/RemindersFilters";
import RemindersList from "../components/Reminders/RemindersList";
import type { Reminder } from "../components/Reminders/RemindersList";

const initialReminders: Reminder[] = [
  { id: "1", type: "Renewal", title: "Subscription renewal due", subtitle: "Acme Corp — Enterprise plan", dueLabel: "Today", status: "Open" },
  { id: "2", type: "Trial", title: "Trial ending soon", subtitle: "Nimbus Retail — 3 days left", dueLabel: "Tomorrow", status: "Open" },
  { id: "3", type: "Approval", title: "New organization pending approval", subtitle: "Bluepeak Logistics", dueLabel: "2 days", status: "Open" },
  { id: "4", type: "Payment", title: "Payment failed", subtitle: "Orbit Solutions — retry required", dueLabel: "3 days", status: "Open" },
  { id: "5", type: "Renewal", title: "License renewal upcoming", subtitle: "Vertex Manufacturing — Enterprise plan", dueLabel: "1 week", status: "Snoozed" },
  { id: "6", type: "Trial", title: "Trial ended", subtitle: "Skyline Freight — converted to paid", dueLabel: "Aug 20, 2026", status: "Resolved" },
];

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  const handleResolve = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Resolved" } : r)));
  };

  const handleSnooze = (id: string) => {
    setReminders((prev) => prev.map((r) => (r.id === id ? { ...r, status: "Snoozed" } : r)));
  };

  const handleDismiss = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Reminders</h1>
      <p className="mt-1 text-sm text-text-muted">
        Stay on top of renewals, approvals, and account issues across the platform.
      </p>

      <div className="mt-6">
        <RemindersFilters />
        <RemindersList
          reminders={reminders}
          onResolve={handleResolve}
          onSnooze={handleSnooze}
          onDismiss={handleDismiss}
        />
      </div>
    </div>
  );
}