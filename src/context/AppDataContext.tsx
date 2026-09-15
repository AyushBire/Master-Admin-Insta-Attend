import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Organization } from "../components/Organizations/OrganizationsTable";
import type { NewOrgFormData } from "../components/Organizations/AddOrganizationModal";

export type LicenseRequestStatus = "Pending" | "Approved" | "Rejected";

export interface LicenseRequest {
  id: string;
  organizationId: string;
  organizationName: string;
  plan: "Monthly" | "Quarterly" | "Yearly";
  requestDate: string;
  status: LicenseRequestStatus;
  decisionDate?: string;
  expiryDate?: string;
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

interface AppDataContextValue {
  organizations: Organization[];
  licenseRequests: LicenseRequest[];
  orgAdmins: OrgAdmin[];
  addOrganization: (data: NewOrgFormData) => void;
  toggleSuspendOrganization: (id: string) => void;
  deleteOrganization: (id: string) => void;
  approveLicenseRequest: (id: string) => void;
  rejectLicenseRequest: (id: string) => void;
  toggleSuspendAdmin: (id: string) => void;
  removeAdmin: (id: string) => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

const initialOrganizations: Organization[] = [
  { id: "1", name: "Acme Corp", plan: "Yearly", status: "Active", renewalDate: "Sep 12, 2026" },
  { id: "2", name: "Nimbus Retail", plan: "Monthly", status: "Trial", renewalDate: "Aug 29, 2026" },
  { id: "3", name: "Bluepeak Logistics", plan: "Quarterly", status: "Pending Renewal", renewalDate: "Aug 27, 2026" },
  { id: "4", name: "Orbit Solutions", plan: "Monthly", status: "Suspended", renewalDate: "Jul 15, 2026" },
  { id: "5", name: "Vertex Manufacturing", plan: "Yearly", status: "Active", renewalDate: "Nov 3, 2026" },
];

const initialLicenseRequests: LicenseRequest[] = [
  { id: "lr1", organizationId: "1", organizationName: "Acme Corp", plan: "Yearly", requestDate: "Sep 1, 2025", status: "Approved", decisionDate: "Sep 3, 2025", expiryDate: "Sep 12, 2026" },
  { id: "lr2", organizationId: "2", organizationName: "Nimbus Retail", plan: "Monthly", requestDate: "Aug 20, 2026", status: "Pending" },
  { id: "lr3", organizationId: "4", organizationName: "Orbit Solutions", plan: "Monthly", requestDate: "Jun 10, 2026", status: "Rejected", decisionDate: "Jun 12, 2026" },
];

const initialOrgAdmins: OrgAdmin[] = [
  { id: "admin-1", organizationId: "1", organizationName: "Acme Corp", name: "Sarah Chen", email: "sarah.chen@acmecorp.com", status: "Active", lastActive: "2 hours ago" },
  { id: "admin-2", organizationId: "2", organizationName: "Nimbus Retail", name: "Priya Nair", email: "priya.nair@nimbusretail.com", status: "Invited", lastActive: "—" },
  { id: "admin-3", organizationId: "3", organizationName: "Bluepeak Logistics", name: "Tom Reilly", email: "tom.reilly@bluepeaklogistics.com", status: "Active", lastActive: "1 day ago" },
  { id: "admin-4", organizationId: "4", organizationName: "Orbit Solutions", name: "James Patel", email: "james.patel@orbitsolutions.com", status: "Suspended", lastActive: "3 weeks ago" },
  { id: "admin-5", organizationId: "5", organizationName: "Vertex Manufacturing", name: "Maria Gomez", email: "maria.gomez@vertexmfg.com", status: "Active", lastActive: "5 hours ago" },
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function addPlanDuration(date: Date, plan: LicenseRequest["plan"]): Date {
  const result = new Date(date);
  if (plan === "Monthly") result.setMonth(result.getMonth() + 1);
  else if (plan === "Quarterly") result.setMonth(result.getMonth() + 3);
  else result.setFullYear(result.getFullYear() + 1);
  return result;
}

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);
  const [licenseRequests, setLicenseRequests] = useState<LicenseRequest[]>(initialLicenseRequests);
  const [orgAdmins, setOrgAdmins] = useState<OrgAdmin[]>(initialOrgAdmins);

  const addOrganization = (data: NewOrgFormData) => {
    const id = String(Date.now());

    const newOrg: Organization = {
      id,
      name: data.name,
      plan: data.plan,
      status: data.status,
      renewalDate: "—",
    };
    setOrganizations((prev) => [newOrg, ...prev]);

    const newRequest: LicenseRequest = {
      id: `lr-${id}`,
      organizationId: id,
      organizationName: data.name,
      plan: data.plan,
      requestDate: formatDate(new Date()),
      status: "Pending",
    };
    setLicenseRequests((prev) => [newRequest, ...prev]);

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

  const toggleSuspendOrganization = (id: string) => {
    setOrganizations((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: o.status === "Suspended" ? "Active" : "Suspended" } : o))
    );
  };

  const deleteOrganization = (id: string) => {
    setOrganizations((prev) => prev.filter((o) => o.id !== id));
  };

  const approveLicenseRequest = (id: string) => {
    const request = licenseRequests.find((r) => r.id === id);
    if (!request) return;

    const now = new Date();
    const decisionDate = formatDate(now);
    const expiryDate = formatDate(addPlanDuration(now, request.plan));

    setLicenseRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Approved", decisionDate, expiryDate } : r))
    );
    setOrganizations((prev) =>
      prev.map((o) =>
        o.id === request.organizationId
          ? { ...o, status: "Active", plan: request.plan, renewalDate: expiryDate }
          : o
      )
    );
  };

  const rejectLicenseRequest = (id: string) => {
    const decisionDate = formatDate(new Date());
    setLicenseRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "Rejected", decisionDate } : r))
    );
  };

  const toggleSuspendAdmin = (id: string) => {
    setOrgAdmins((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: a.status === "Suspended" ? "Active" : "Suspended" } : a))
    );
  };

  const removeAdmin = (id: string) => {
    setOrgAdmins((prev) => prev.filter((a) => a.id !== id));
  };

  const value = useMemo(
    () => ({
      organizations,
      licenseRequests,
      orgAdmins,
      addOrganization,
      toggleSuspendOrganization,
      deleteOrganization,
      approveLicenseRequest,
      rejectLicenseRequest,
      toggleSuspendAdmin,
      removeAdmin,
    }),
    [organizations, licenseRequests, orgAdmins]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error("useAppData must be used within AppDataProvider");
  return ctx;
}