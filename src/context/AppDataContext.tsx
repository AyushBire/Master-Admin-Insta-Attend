import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { NewOrgFormData } from "../components/Organizations/AddOrganizationModal";
import { addBillingCycle, formatDisplayDate, type BillingCycle } from "../lib/billingCycle";

export type { BillingCycle };
export type LicenseTier = "Evolution";

// Maps 1:1 to license_plan / license_started_at / license_expires_at that a
// real backend would return. An organization has NO License record until
// one is explicitly issued via "Issue New License".
export interface License {
  id: string;
  organizationId: string;
  organizationName: string;
  tier: LicenseTier;
  billingCycle: BillingCycle;
  startedAt: string;  // ISO
  expiresAt: string;  // ISO
  cancelled: boolean;
}

export type OrgAdminStatus = "Active" | "Invited" | "Suspended";

export interface OrgAdmin {
  id: string;
  organizationId: string;
  organizationName: string;
  name: string;
  email: string;
  status: OrgAdminStatus;
  lastActive: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  logoUrl: string;
  orgAddress: string;
  adminName: string;
  adminPhone: string;
  email: string;
  plan: BillingCycle;
  status: "Active" | "Trial" | "Suspended" | "Pending Renewal";
  timezone: string;
  maxUsers: number;
  workingDays: string[];
  workingHours: number;
  renewalDate: string;
}

interface AppDataContextValue {
  organizations: Organization[];
  licenses: License[];
  orgAdmins: OrgAdmin[];
  addOrganization: (data: NewOrgFormData) => void;
  toggleSuspendOrganization: (id: string) => void;
  deleteOrganization: (id: string) => void;
  issueLicense: (organizationId: string, billingCycle: BillingCycle) => void;
  renewLicense: (id: string, billingCycle: BillingCycle) => void;
  modifyLicense: (id: string, updates: { tier: LicenseTier; billingCycle: BillingCycle }) => void;
  toggleCancelLicense: (id: string) => void;
  toggleSuspendAdmin: (id: string) => void;
  removeAdmin: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

const initialOrganizations: Organization[] = [
  {
    id: "1", name: "Acme Corp", slug: "acme-corp", logoUrl: "",
    orgAddress: "Detroit, Michigan, USA",
    adminName: "Sarah Chen", adminPhone: "+1 313 555 0142", email: "admin@acmecorp.com",
    plan: "Yearly", status: "Active", timezone: "America/New_York",
    maxUsers: 500, workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], workingHours: 8,
    renewalDate: "Sep 12, 2026",
  },
  {
    id: "2", name: "Nimbus Retail", slug: "nimbus-retail", logoUrl: "",
    orgAddress: "Austin, Texas, USA",
    adminName: "Priya Nair", adminPhone: "+1 512 555 0198", email: "priya.nair@nimbusretail.com",
    plan: "Monthly", status: "Trial", timezone: "America/New_York",
    maxUsers: 200, workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], workingHours: 8,
    renewalDate: "Aug 29, 2026",
  },
  {
    id: "3", name: "Bluepeak Logistics", slug: "bluepeak-logistics", logoUrl: "",
    orgAddress: "Rotterdam, Netherlands",
    adminName: "Tom Reilly", adminPhone: "+31 6 5555 0123", email: "tom.reilly@bluepeaklogistics.com",
    plan: "Quarterly", status: "Pending Renewal", timezone: "Europe/London",
    maxUsers: 300, workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], workingHours: 9,
    renewalDate: "Aug 27, 2026",
  },
  {
    id: "4", name: "Orbit Solutions", slug: "orbit-solutions", logoUrl: "",
    orgAddress: "Singapore",
    adminName: "James Patel", adminPhone: "+65 9555 0187", email: "james.patel@orbitsolutions.com",
    plan: "Monthly", status: "Suspended", timezone: "Asia/Singapore",
    maxUsers: 150, workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], workingHours: 8,
    renewalDate: "Jul 15, 2026",
  },
  {
    id: "5", name: "Vertex Manufacturing", slug: "vertex-manufacturing", logoUrl: "",
    orgAddress: "Pune, Maharashtra, India",
    adminName: "Maria Gomez", adminPhone: "+91 98765 43210", email: "maria.gomez@vertexmfg.com",
    plan: "Yearly", status: "Active", timezone: "Asia/Kolkata",
    maxUsers: 1000, workingDays: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"], workingHours: 9,
    renewalDate: "Nov 3, 2026",
  },
];

// Seeded for the first 4 orgs — Vertex Manufacturing (id "5") is left
// deliberately unlicensed, so "Issue New License" has something to show
// out of the box, same as any freshly created organization would.
const initialLicenses: License[] = [
  {
    id: "lic-1", organizationId: "1", organizationName: "Acme Corp",
    tier: "Evolution", billingCycle: "Yearly",
    startedAt: "2025-09-12T00:00:00.000Z", expiresAt: "2026-09-12T23:59:59.000Z",
    cancelled: false,
  },
  {
    id: "lic-2", organizationId: "2", organizationName: "Nimbus Retail",
    tier: "Evolution", billingCycle: "Monthly",
    startedAt: "2026-07-29T00:00:00.000Z", expiresAt: "2026-08-29T23:59:59.000Z",
    cancelled: false,
  },
  {
    id: "lic-3", organizationId: "3", organizationName: "Bluepeak Logistics",
    tier: "Evolution", billingCycle: "Quarterly",
    startedAt: "2026-05-27T00:00:00.000Z", expiresAt: "2026-08-27T23:59:59.000Z",
    cancelled: false,
  },
  {
    id: "lic-4", organizationId: "4", organizationName: "Orbit Solutions",
    tier: "Evolution", billingCycle: "Monthly",
    startedAt: "2026-06-15T00:00:00.000Z", expiresAt: "2026-07-15T23:59:59.000Z",
    cancelled: true,
  },
];

const initialOrgAdmins: OrgAdmin[] = [
  { id: "admin-1", organizationId: "1", organizationName: "Acme Corp", name: "Sarah Chen", email: "admin@acmecorp.com", status: "Active", lastActive: "2 hours ago" },
  { id: "admin-2", organizationId: "2", organizationName: "Nimbus Retail", name: "Priya Nair", email: "priya.nair@nimbusretail.com", status: "Invited", lastActive: "—" },
  { id: "admin-3", organizationId: "3", organizationName: "Bluepeak Logistics", name: "Tom Reilly", email: "tom.reilly@bluepeaklogistics.com", status: "Active", lastActive: "1 day ago" },
  { id: "admin-4", organizationId: "4", organizationName: "Orbit Solutions", name: "James Patel", email: "james.patel@orbitsolutions.com", status: "Suspended", lastActive: "3 weeks ago" },
  { id: "admin-5", organizationId: "5", organizationName: "Vertex Manufacturing", name: "Maria Gomez", email: "maria.gomez@vertexmfg.com", status: "Active", lastActive: "5 hours ago" },
];

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [licenses, setLicenses] = useState<License[]>(initialLicenses);
  const [orgAdmins, setOrgAdmins] = useState<OrgAdmin[]>(initialOrgAdmins);

  // Creating an organization no longer issues a license automatically —
  // it appears in Organizations, and shows up as an "unlicensed" option in
  // the License page's "Issue New License" flow until one is issued.
  const addOrganization = (data: NewOrgFormData) => {
    const id = String(Date.now());

    const newOrg: Organization = {
      id,
      name: data.name,
      slug: data.slug,
      logoUrl: data.logoUrl,
      orgAddress: data.orgAddress,
      adminName: data.adminName,
      adminPhone: data.adminPhone,
      email: data.email,
      plan: data.plan,
      status: data.status,
      timezone: data.timezone,
      maxUsers: data.maxUsers,
      workingDays: data.workingDays,
      workingHours: data.workingHours,
      renewalDate: "—",
    };
    setOrganizations((prev) => [newOrg, ...prev]);

    const newAdmin: OrgAdmin = {
      id: `admin-${id}`,
      organizationId: id,
      organizationName: data.name,
      name: data.adminName,
      email: data.email,
      status: "Invited",
      lastActive: "—",
    };
    setOrgAdmins((prev) => [newAdmin, ...prev]);

    // TODO (future): trigger invite email to data.email once backend exists.
  };

  const toggleSuspendOrganization = (id: string) =>
    setOrganizations((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: o.status === "Suspended" ? "Active" : "Suspended" } : o)
    );

  const deleteOrganization = (id: string) =>
    setOrganizations((prev) => prev.filter((o) => o.id !== id));

  // Explicit action from the "Issue New License" flow.
  const issueLicense = (organizationId: string, billingCycle: BillingCycle) => {
    const org = organizations.find((o) => o.id === organizationId);
    if (!org) return;

    const now = new Date();
    const expires = addBillingCycle(now, billingCycle);
    const expiryDisplay = formatDisplayDate(expires);

    const newLicense: License = {
      id: `lic-${organizationId}`,
      organizationId,
      organizationName: org.name,
      tier: "Evolution",
      billingCycle,
      startedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      cancelled: false,
    };
    setLicenses((prev) => [newLicense, ...prev]);

    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === organizationId ? { ...o, status: "Active", plan: billingCycle, renewalDate: expiryDisplay } : o
      )
    );
  };

  // Extends expiry by one billing-cycle term from the chosen cycle (which
  // may differ from the license's current cycle). If lapsed, the new term
  // starts fresh from today.
  const renewLicense = (id: string, billingCycle: BillingCycle) => {
    setLicenses((prev) =>
      prev.map((lic) => {
        if (lic.id !== id) return lic;
        const now = new Date();
        const currentExpiry = new Date(lic.expiresAt);
        const isLapsed = lic.cancelled || currentExpiry.getTime() < now.getTime();
        const baseDate = isLapsed ? now : currentExpiry;
        const newExpiry = addBillingCycle(baseDate, billingCycle);
        return {
          ...lic,
          billingCycle,
          cancelled: false,
          startedAt: isLapsed ? now.toISOString() : lic.startedAt,
          expiresAt: newExpiry.toISOString(),
        };
      })
    );
  };

  const modifyLicense = (id: string, updates: { tier: LicenseTier; billingCycle: BillingCycle }) => {
    setLicenses((prev) => prev.map((lic) => (lic.id === id ? { ...lic, ...updates } : lic)));
  };

  const toggleCancelLicense = (id: string) => {
    setLicenses((prev) => prev.map((lic) => (lic.id === id ? { ...lic, cancelled: !lic.cancelled } : lic)));
  };

  const toggleSuspendAdmin = (id: string) =>
    setOrgAdmins((prev) =>
      prev.map((a) => a.id === id ? { ...a, status: a.status === "Suspended" ? "Active" : "Suspended" } : a)
    );

  const removeAdmin = (id: string) =>
    setOrgAdmins((prev) => prev.filter((a) => a.id !== id));

  const value = useMemo(
    () => ({
      organizations, licenses, orgAdmins,
      addOrganization, toggleSuspendOrganization, deleteOrganization,
      issueLicense, renewLicense, modifyLicense, toggleCancelLicense,
      toggleSuspendAdmin, removeAdmin,
    }),
    [organizations, licenses, orgAdmins]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}