// src/pages/Reminders.tsx
import { useMemo, useState } from "react";
import RemindersFilters from "../components/Reminders/RemindersFilters";
import RemindersList from "../components/Reminders/RemindersList";
import type { Reminder } from "../components/Reminders/RemindersList";

const initialReminders: Reminder[] = [
  { id: "1", type: "Renewal", title: "Subscription renewal due", subtitle: "Acme Corp — Yearly plan", dueLabel: "Today", status: "Open" },
  { id: "2", type: "Trial", title: "Trial ending soon", subtitle: "Nimbus Retail — 3 days left", dueLabel: "Tomorrow", status: "Open" },
  { id: "3", type: "Approval", title: "New organization pending approval", subtitle: "Bluepeak Logistics", dueLabel: "2 days", status: "Open" },
  { id: "4", type: "Payment", title: "Payment failed", subtitle: "Orbit Solutions — retry required", dueLabel: "3 days", status: "Open" },
  { id: "5", type: "Renewal", title: "License renewal upcoming", subtitle: "Vertex Manufacturing — Yearly plan", dueLabel: "1 week", status: "Snoozed" },
  { id: "6", type: "Trial", title: "Trial ended", subtitle: "Skyline Freight — converted to paid", dueLabel: "Aug 20, 2026", status: "Resolved" },
];

export default function Reminders() {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredReminders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return reminders.filter((reminder) => {
      const matchesSearch =
        !query ||
        reminder.title.toLowerCase().includes(query) ||
        reminder.subtitle.toLowerCase().includes(query);
      const matchesType = !typeFilter || reminder.type === typeFilter;
      const matchesStatus = !statusFilter || reminder.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [reminders, search, typeFilter, statusFilter]);

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
      <h1 className="page-title">Reminders</h1>
      <p className="section-subtitle">
        Stay on top of renewals, approvals, and account issues across the platform.
      </p>

      <div className="mt-6">
        <RemindersFilters
          search={search}
          onSearchChange={setSearch}
          type={typeFilter}
          onTypeChange={setTypeFilter}
          status={statusFilter}
          onStatusChange={setStatusFilter}
        />
        <RemindersList
          reminders={filteredReminders}
          onResolve={handleResolve}
          onSnooze={handleSnooze}
          onDismiss={handleDismiss}
        />
      </div>
    </div>
  );
}