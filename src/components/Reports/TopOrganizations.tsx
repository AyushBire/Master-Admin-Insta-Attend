interface TopOrg {
  id: string;
  name: string;
  plan: string;
  revenue: string;
  growth: string;
}

const topOrgs: TopOrg[] = [
  { id: "1", name: "Vertex Manufacturing", plan: "Enterprise", revenue: "$18,400", growth: "+12.4%" },
  { id: "2", name: "Acme Corp", plan: "Enterprise", revenue: "$14,200", growth: "+8.1%" },
  { id: "3", name: "Orbit Solutions", plan: "Professional", revenue: "$6,800", growth: "+3.6%" },
  { id: "4", name: "Nimbus Retail", plan: "Professional", revenue: "$4,950", growth: "-1.2%" },
  { id: "5", name: "Bluepeak Logistics", plan: "Starter", revenue: "$1,200", growth: "+0.4%" },
];

export default function TopOrganizations() {
  return (
    <div className="rounded-2xl border border-border bg-white shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-text-primary">Top Organizations by Revenue</h2>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border bg-primary-light/40">
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Organization</th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Plan</th>
            <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-muted">Revenue</th>
            <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-text-muted">Growth</th>
          </tr>
        </thead>
        <tbody>
          {topOrgs.map((org) => (
            <tr key={org.id} className="border-b border-border last:border-0 hover:bg-primary-light/30">
              <td className="px-6 py-4 text-base font-medium text-text-primary">{org.name}</td>
              <td className="px-6 py-4 text-base text-text-muted">{org.plan}</td>
              <td className="px-6 py-4 text-base text-text-muted">{org.revenue}</td>
              <td className="px-6 py-4 text-right">
                <span className={`text-sm font-semibold ${org.growth.startsWith("-") ? "text-error" : "text-success"}`}>
                  {org.growth}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}