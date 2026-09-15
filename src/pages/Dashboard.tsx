import { Building2, Activity, CreditCard, Users } from "lucide-react";
import StatCard from "../components/Dashboard/StatCard";
import PlatformOverview from "../components/Dashboard/PlatformOverview";
import PlatformStatus from "../components/Dashboard/PlatformStatus";
import WeeklyTrends from "../components/Dashboard/WeeklyTrends";
import CalendarWidget from "../components/Dashboard/CalendarWidget";
import ReminderPipeline from "../components/Dashboard/ReminderPipeline";
import { colors } from "../styles/theme";

// Organization-wise breakdown — mirrors the 5 orgs in AppDataContext
const totalOrgsBreakdown = [
  { label: "Acme Corp", count: 1, color: colors.primary },
  { label: "Nimbus Retail", count: 1, color: colors.info },
  { label: "Bluepeak Logistics", count: 1, color: colors.warning },
  { label: "Orbit Solutions", count: 1, color: colors.purple },
  { label: "Vertex Manufacturing", count: 1, color: colors.error },
];

// Active orgs: excludes Orbit Solutions (Suspended)
const activeOrgsBreakdown = [
  { label: "Acme Corp", count: 1, color: colors.primary },
  { label: "Nimbus Retail", count: 1, color: colors.info },
  { label: "Bluepeak Logistics", count: 1, color: colors.warning },
  { label: "Vertex Manufacturing", count: 1, color: colors.purple },
];

// Active memberships — orgs with active/trial/pending licenses
const activeMembershipsBreakdown = [
  { label: "Acme Corp", count: 1, color: colors.primary },
  { label: "Nimbus Retail", count: 1, color: colors.info },
  { label: "Bluepeak Logistics", count: 1, color: colors.warning },
  { label: "Vertex Manufacturing", count: 1, color: colors.purple },
];

// Active users per org — Acme Corp: 84 from OrganizationDetail mock; others estimated
const activeUsersBreakdown = [
  { label: "Acme Corp", count: 84, color: colors.primary },
  { label: "Nimbus Retail", count: 37, color: colors.info },
  { label: "Bluepeak Logistics", count: 52, color: colors.warning },
  { label: "Vertex Manufacturing", count: 96, color: colors.purple },
  { label: "Orbit Solutions", count: 0, color: colors.error },
];

const TOTAL_ACTIVE_USERS = activeUsersBreakdown.reduce((s, i) => s + i.count, 0);

export default function Dashboard() {
  return (
    <div>
      <h1 className="page-title">Dashboard</h1>
      <p className="section-subtitle">Welcome to the Master Admin Control Center.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Organizations"
          value="248"
          change="+12.5%"
          icon={Building2}
          industryBreakdown={totalOrgsBreakdown}
        />
        <StatCard
          title="Active Organizations"
          value="219"
          change="+8.2%"
          icon={Activity}
          industryBreakdown={activeOrgsBreakdown}
        />
        <StatCard
          title="Active Memberships"
          value="203"
          change="+6.8%"
          icon={CreditCard}
          industryBreakdown={activeMembershipsBreakdown}
        />
        <StatCard
          title="Total Active Users"
          value={TOTAL_ACTIVE_USERS.toLocaleString()}
          change="+9.4%"
          icon={Users}
          iconColor={colors.info}
          iconBackground={colors.infoBg}
          positive={true}
          industryBreakdown={activeUsersBreakdown}
        />
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