import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  BarChart3,
  Bell,
  Users,
  ClipboardList,
  Settings,
  CircleHelp,
  LogOut,
  Building,
  ChevronLeft,
} from "lucide-react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { label: "Organizations", icon: Building2, path: "/organizations" },
  { label: "License", icon: CreditCard, path: "/licenses" },
  { label: "Reports", icon: BarChart3, path: "/reports" },
  { label: "Reminders", icon: Bell, path: "/reminders" },
  { label: "Users & Administrators", icon: Users, path: "/users" },
  { label: "Audit Logs", icon: ClipboardList, path: "/audit-logs" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-border bg-white transition-[width] duration-300 ease-in-out ${collapsed ? "w-[76px]" : "w-[250px]"}`}
    >
      <div className="flex items-center justify-between px-4 pb-6 pt-6">
        <div className="flex flex-1 flex-col items-center">
          <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
            <Building size={24} strokeWidth={2} />
          </div>
          {!collapsed && (
            <>
              <h1 className="whitespace-nowrap text-lg font-semibold text-text-primary">
                Master Admin
              </h1>
              <p className="mt-1 whitespace-nowrap text-2xs font-medium tracking-[0.12em] text-text-muted">
                CONTROL CENTER
              </p>
            </>
          )}
        </div>
      </div>

      <button
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-8 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-white text-text-muted shadow-sm hover:text-primary"
      >
        <ChevronLeft
          size={14}
          className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
        />
      </button>

      <nav className="min-h-0 flex-1 overflow-y-auto px-3">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                title={collapsed ? item.label : undefined}
                className={`relative flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-medium transition-colors ${collapsed ? "justify-center px-0" : ""} ${active ? "bg-primary-light text-primary-dark" : "text-text-muted hover:bg-primary-light hover:text-primary-dark"}`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-7 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />
                )}
                <Icon size={18} strokeWidth={1.8} className="shrink-0" />
                {!collapsed && (
                  <span className="whitespace-nowrap">{item.label}</span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="shrink-0 border-t border-border px-3 py-4">
        <button
          title={collapsed ? "Support" : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-medium text-text-muted hover:bg-primary-light hover:text-primary-dark ${collapsed ? "justify-center px-0" : ""}`}
        >
          <CircleHelp size={18} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && <span>Support</span>}
        </button>
        <button
          title={collapsed ? "Logout" : undefined}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-base font-medium text-error ${collapsed ? "justify-center px-0" : ""}`}
        >
          <LogOut size={18} strokeWidth={1.8} className="shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
