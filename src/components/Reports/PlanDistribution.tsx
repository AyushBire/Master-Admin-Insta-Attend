import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { colors } from "../../styles/theme";

const data = [
  { name: "Enterprise", value: 68, color: colors.primary },
  { name: "Professional", value: 112, color: colors.info },
  { name: "Starter", value: 68, color: colors.warning },
];

export default function PlanDistribution() {
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Plan Distribution</h2>
        <p className="mt-1 text-sm text-text-muted">Organizations by subscription tier</p>
      </div>

      {/* Donut centered on top */}
      <div className="mx-auto h-[180px] w-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value ?? 0} orgs`, ""]}
              contentStyle={{
                borderRadius: "10px",
                border: `1px solid ${colors.border}`,
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend full-width below */}
      <div className="mt-5 space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate text-base text-text-primary">{item.name}</span>
            </div>
            <span className="shrink-0 text-sm font-medium text-text-muted">
              {Math.round((item.value / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}