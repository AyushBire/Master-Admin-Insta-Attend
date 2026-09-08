import { Building2, Activity, CreditCard, Clock } from "lucide-react";
import StatCard from "../components/Dashboard/StatCard";
import PlatformOverview from "../components/Dashboard/PlatformOverview";
import PlatformStatus from "../components/Dashboard/PlatformStatus";
import WeeklyTrends from "../components/Dashboard/WeeklyTrends";
import CalendarWidget from "../components/Dashboard/CalendarWidget";
import ReminderPipeline from "../components/Dashboard/ReminderPipeline";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-text-primary">Dashboard</h1>
      <p className="mt-1 text-sm text-text-muted">
        Welcome to the Master Admin Control Center.
      </p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Organizations" value="248" change="+12.5%" icon={Building2} />
        <StatCard title="Active Organizations" value="219" change="+8.2%" icon={Activity} />
        <StatCard title="Active Memberships" value="203" change="+6.8%" icon={CreditCard} />
        <StatCard title="Pending Actions" value="17" change="-4.3%" icon={Clock} positive={false} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <PlatformOverview />
          <PlatformStatus />
          <WeeklyTrends />
        </div>
        <div className="space-y-4 lg:col-span-1">
          <CalendarWidget />
          <ReminderPipeline />
        </div>
      </div>
    </div>
  );
}