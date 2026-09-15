interface TopOrg {
  id: string;
  name: string;
  plan: string;
  revenue: string;
  growth: string;
}

const topOrgs: TopOrg[] = [
  { id: "1", name: "Vertex Manufacturing", plan: "Yearly", revenue: "$18,400", growth: "+12.4%" },
  { id: "2", name: "Acme Corp", plan: "Yearly", revenue: "$14,200", growth: "+8.1%" },
  { id: "3", name: "Orbit Solutions", plan: "Quarterly", revenue: "$6,800", growth: "+3.6%" },
  { id: "4", name: "Nimbus Retail", plan: "Quarterly", revenue: "$4,950", growth: "-1.2%" },
  { id: "5", name: "Bluepeak Logistics", plan: "Monthly", revenue: "$1,200", growth: "+0.4%" },
];

export default function TopOrganizations() {
  return (
    <div className="surface-card-static overflow-hidden">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-text-primary">Top Organizations by Revenue</h2>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="table-head-row">
            <th className="table-head-cell">Organization</th>
            <th className="table-head-cell">Plan</th>
            <th className="table-head-cell">Revenue</th>
            <th className="table-head-cell text-right">Growth</th>
          </tr>
        </thead>
        <tbody>
          {topOrgs.map((org) => (
            <tr key={org.id} className="table-row">
              <td className="table-cell-primary">{org.name}</td>
              <td className="table-cell">{org.plan}</td>
              <td className="table-cell">{org.revenue}</td>
              <td className="px-5 py-4 text-right">
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